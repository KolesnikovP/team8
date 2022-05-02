const { Game, UserCreatePost, Statistic, User } = require('../models/models');

class PostController {
  async addPost(req, res, next) {
    try {
      const { description, userRank, userSteamAvatar, user_id, game_id } = req.body;
      const newUserPost = await UserCreatePost({
        description,
        userRank,
        userSteamAvatar,
        status: false,
        userId: user_id,
        gameId: game_id,
      });
      newUserPost.save();
      res.json(newUserPost);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new PostController();
