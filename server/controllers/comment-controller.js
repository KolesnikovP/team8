const {
  Comment, User,
} = require('../models/models');

class CommentController {
  async getComment(req, res) {
    try {
      const comment = await Comment.findAll();
      res.json(comment);
    } catch (e) {
      console.log(e);
    }
  }

  async addComment(req, res) {
    try {
      const { com, steamId } = req.params;
      const user = await User.findOne({
        where: {
          steamId,
        },
        raw: true,
      });
      const comment = await new Comment({
        userName: user.steamNickname,
        userId: user.id,
        userAvatar: user.steamAvatar,
        messageText: com,
      });
      comment.save();
      res.json(comment);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new CommentController();
