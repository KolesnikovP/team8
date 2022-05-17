const {
  Chat, ChatMessage,
} = require('../db/models');

class ChatController {
  async getChatHistory(req, res, next) {
    try {
      const chat = await Chat.findOne({
        where: {
          chatLink: req.body.id,
        },
      });
      const chatHistory = await ChatMessage.findAll({
        where: {
          idChat: chat.id,
        },
      });
      res.json(chatHistory);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new ChatController();
