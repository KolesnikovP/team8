const {
  Game, UserCreatePost, Statistic, User,
} = require('../models/models');

class PostController {
  async getPostsList(req, res, next) {
    try {
      const postsList = await UserCreatePost.findAll({ raw: true });
      const response = [];
      const promise = postsList.map(async (post) => {
        const user = await User.findOne({
          where: {
            id: post.userId,
          },
        });
        const author = user.steamNickname;
        const game = await Game.findOne({
          where: {
            id: post.gameId,
          },
        });
        const gameName = game.gameSteamName;
        const obj = {
          id: post.id,
          gameName,
          author,
          authorId: user.steamId,
          gameAppId: game.gameSteamId,
          userHours: post.userHours,
          description: post.description,
          userSteamAvatar: post.userSteamAvatar,
          createdAt: post.createdAt,
        };
        response.push(obj);
      });
      Promise.all(promise).then(() => res.json(response));
    } catch (error) {
      console.error('Message: ', error);
    }
  }

  async addPost(req, res, next) {
    try {
      const {
        description, gameSteamId, steamId, userId, userSteamAvatar,
      } = req.body;
      // console.log(req.body)
      // console.log(req.body);
      const statistic = await Statistic.findOne({
        where: {
          gameSteamId,
          steamId,
          // steamId: userId,
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
        userHours: statistic.userGameHours,
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

  async delPost(req, res, next) {
    if (req.params.id) {
      await UserCreatePost.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ id: req.params.id });
    } else res.status(404).send('error');
  }
}

module.exports = new PostController();
