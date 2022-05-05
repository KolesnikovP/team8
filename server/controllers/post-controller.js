const {
  Game, UserCreatePost, Statistic, User,
} = require('../models/models');

class PostController {
  async getPostsList(req, res, next) {
    try {
      const postsList = await UserCreatePost.findAll({ raw: true });
      const response = []
      const promise = postsList.map(async(post)=>{
        const user = await User.findOne({ where:{
          id: post.userId
        }})
        const author = user.steamNickname
        const game = await Game.findOne({ where:{
          id: post.gameId
        }})
        const gameName = game.gameSteamName
        const obj = {
          id : post.id,
          gameName,
          author,
          gameAppId: game.gameSteamId,
          userHours: post.userHours,
          description: post.description,
          userSteamAvatar: post.userSteamAvatar,
          createdAt: post.createdAt
        }
        response.push(obj)
      })
      Promise.all(promise).then(()=> res.json(response))
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
}

module.exports = new PostController();
