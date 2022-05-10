require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passportSetup = require("./services/passport");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
const app = express();
const Router = require('./router/router');
const authRoute = require("./router/auth");
const sequelize = require('./db');
const ws = require('ws')
const { v4: uuidv4 } = require('uuid');


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

const wss = new ws.Server({
    port: 9999,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
  // ws.id = 12
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message, message.id)
                break;
        }
    })
})

function broadcastMessage(message, id) {
  console.log(message.idUser);
    wss.clients.forEach(client => {
      // if(id === client.id)
        client.send(JSON.stringify(message))
    })
}

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
