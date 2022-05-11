require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
require('./services/passport');

const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');
const authRoute = require('./router/auth');
const WSServer = require('express-ws')(app);
const sequelize = require('./db');
const ws = require('ws');

const aWss = WSServer.getWss();
const {
  Chat, User, UserChat, ChatMessage,
} = require('./models/models');

app.use(
  cookieSession({ name: 'session', keys: ['lama'], maxAge: 24 * 60 * 60 * 1000 }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

app.use('/api', Router);
app.use('/auth', authRoute);

app.ws('/', (ws, req) => {
  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.event) {
      case 'message':
        broadcastConnection(ws, message);
        break;
      case 'connection':
        connectionHandler(ws, message);
        break;
      case 'close':
        closeHandler(ws, message);
        break;
    }
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    app.listen(PORT, () => console.log(`Server start at ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

const connectionHandler = async (ws, message) => {
  console.log(message);
  ws.chatId = message.chatId;
  try {
    const findChat = await Chat.findAll({ where: { chatLink: message.chatId } });
    if (findChat.length === 0) {
      const createChat = await Chat.create({ chatLink: `${process.env.CLIENT_URL}/chat/${message.chatId}` });
      const sendUser = await User.findOne({ where: { steamId: message.userSend } });
      const recievedUser = await User.findOne({ where: { steamId: message.userRecieved } });
      await UserChat.create({ user_id: sendUser.id, chat_id: createChat.id });
      await UserChat.create({ user_id: recievedUser.id, chat_id: createChat.id });
    }
  } catch (error) {
    console.log('CHAT SOSDAN!');
  }
  broadcastConnection(ws, message);
};

const broadcastConnection = (ws, message) => {
  aWss.clients.forEach((client) => {
    if (client.chatId === message.chatId) {
      // console.log(message)
      client.send(JSON.stringify(message));
    }
  });
};

const closeHandler = (ws, message) => {
  message.data.map(async (sms) => {
    // console.log(sms)
    try {
      const findMsg = await ChatMessage.findOne({
        where: {
          idSms: sms.id,
        },
      });
      if (!findMsg) {
        const chatId = await Chat.findOne({ where: { chatLink: `${process.env.CLIENT_URL}/chat/${sms.chatId}` } });
        const userId = await User.findOne({ where: { steamId: sms.userId } });
        await ChatMessage.create({
          idSms: sms.id,
          idChat: chatId.id,
          idUser: userId.id,
          userName: userId.steamNickname,
          messageText: sms.message,
          createdAt: sms.created,
        });
      }
    } catch (e) {
      console.log('er');
    }
  });
};
