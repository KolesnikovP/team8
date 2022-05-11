const aWss = WSServer.getWss();

export const connectionHandler = async (ws, message) => {
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

export const broadcastConnection = (ws, message) => {
  aWss.clients.forEach((client) => {
    if (client.chatId === message.chatId) {
      // console.log(message)
      client.send(JSON.stringify(message));
    }
  });
};

export const closeHandler = (ws, message) => {
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
