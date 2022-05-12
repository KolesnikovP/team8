const {
  Chat, User, UserChat, ChatMessage,
} = require('../models/models');

class ChatController {
  async getChatHistory(req, res, next) {
    try {
      // const gamesList = await BgVideo.findAll({ raw: true });
      const chat = await Chat.findOne({
        where: {
          chatLink: req.body.id,
        },
      });
      const chatHistory = await ChatMessage.findAll({
        where: {
          idChat: chat.id,
        },
        // order: [
        //   ['createdAt', 'ASC'],
        // ],
      });
      res.json(chatHistory);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new ChatController();
