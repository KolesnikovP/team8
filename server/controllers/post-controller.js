const {
  Game, UserCreatePost, Statistic, User,
} = require('../models/models');

class PostController {
  async getPostsList(req, res, next) {
    try {
      const postsList = await UserCreatePost.findAll({ raw: true });
      res.json(postsList);
    } catch (error) {
      console.error('Message: ', error);
    }
  }

  async addPost(req, res, next) {
    try {
      const {
        description, gameSteamId, userId, userSteamAvatar,
      } = req.body;
      const statistic = await Statistic.findOne({
        where: {
          gameSteamId,
        },
        raw: true,
      });
      const game = await Game.findOne({
        where: {
          gameSteamId: Number(gameSteamId),
        },
        raw: true,
      });
      const newUserPost = await new UserCreatePost({
        description,
        userRank: statistic.userRank,
        userSteamAvatar,
        status: false,
        userId,
        gameId: game.id,
      });
      newUserPost.save();
      res.json(newUserPost);
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new PostController();
