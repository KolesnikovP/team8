/* eslint-disable class-methods-use-this */
const fetch = require('cross-fetch');
const e = require('express');
const {
  Game, Statistic, User, UserCreatePost, UserChat, Chat, BgVideo,
} = require('../models/models');
const sequelize = require('../db');

class UserController {
  async authSuccess(req, res) {
    if (req.user) {
      const userDto = await User.findOne({
        where: {
          steamId: req.user.id,
        },
      });
      if (userDto) {
        const bg = await BgVideo.findOne({
          where: {
            id: userDto.bgVideoId,
          },
        });
        userDto.bgVideoId = bg.link;
      }
      res.status(200).json({
        success: true,
        message: 'successfull',
        user: userDto,
        //   cookies: req.cookies
      });
    }
  }

  async authFailed(req, res) {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  }

  async authLogout(req, res) {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  }

  async getInfo(req, res) {
    const { id } = req.body;
    try {
      const response = [];
      const userInfo = await User.findOne({
        where: {
          steamId: id,
        },
      });
      const bg = await BgVideo.findOne({
        where: {
          id: userInfo.bgVideoId,
        },
      });
      userInfo.bgVideoId = bg.link;
      const userStats = await Statistic.findAll({
        where: {
          steamId: id,
        },
      });
      // const userPosts = await UserCreatePost.findAll({
      //   where: {
      //     userId: userInfo.id,
      //   },
      // });
      // const promise = await userPosts.map(async (post, index) => {
      //   const gameName = await Game.findOne({
      //     where: {
      //       id: post.gameId,
      //     },
      //     raw: true,
      //   });
      //   userPosts[index].dataValues.gameName = gameName.gameSteamName;
      //   userPosts[index].dataValues.gameAppId = gameName.gameSteamId;
      //   userPosts[index].dataValues.authorId = userInfo.steamId;
      // });
      // await Promise.all(promise);
      const userPost1 = await UserCreatePost.findAll({
        where: {
          userId: userInfo.id,
        },
        raw: true,
      });
      const userPosts = [];
      const promise = userPost1.map(async (post) => {
        const author = userInfo.steamNickname;
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
          authorId: userInfo.steamId,
          gameAppId: game.gameSteamId,
          userHours: post.userHours,
          description: post.description,
          userSteamAvatar: post.userSteamAvatar,
          createdAt: post.createdAt,
        };
        userPosts.push(obj);
      });
      await Promise.all(promise);
      response.push(userInfo, userStats, userPosts);
      res.status(200).json({ response });
    } catch (e) {
      console.log(e);
    }
  }

  async validateProfile(req, res) {
    if (req.body.id) {
      const validate = await Statistic.findAll({
        where: {
          steamId: req.body.id,
        },
      });
      if (validate.length) {
        res.status(201).json(validate);
      }
      if (validate.length === 0) {
        const response = await fetch(
          `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DA22CF06CD504ADB087C83908040E3C6&steamid=${req.body.id}&format=json`,
        );
        const userGames = await response.json();
        const gamesFromDb = await Game.findAll();
        const resArray = [];
        gamesFromDb.map((el) => {
          userGames.response.games.map((game) => {
            if (el.gameSteamId === game.appid) {
              const statUser = new Statistic({
                userGameHours: Math.ceil(game.playtime_forever / 60),
                userRank: 0,
                steamId: req.body.id,
                gameSteamId: game.appid,
                gameName: el.gameSteamName,
              });
              statUser.save();
              resArray.push(statUser);
            }
          });
        });
        if (resArray.length === 0) {
          res.status(404).json({ message: 'Games not found' });
        } else {
          res.status(200).json(resArray);
        }
      }
    }
  }

  async userGames(req, res) {
    if (req.body.id) {
      try {
        const games = await Statistic.findAll({
          where: {
            steamId: req.body.id,
          },
        });
        res.json(games);
      } catch {
        console.log('Games for user not found');
      }
    }
  }

  async updateDescribe(req, res) {
    const { steamId, description } = req.body;
    try {
      const user = await User.findOne({
        where: {
          steamId,
        },
      });
      await user.update({ description });
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  }

  async updateBg(req, res) {
    const { id, bgVideoId } = req.body;
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      await user.update({ bgVideoId });
      res.json(user);
    } catch (e) {
      console.log(e);
    }
  }

  async getUsersList(req, res) {
    try {
      const users = await User.findAll({ raw: true });
      res.json(users);
    } catch (error) {
      console.error('Message: ', error);
    }
  }

  async updateUserStats(req, res) {
    if (req.body.id) {
      const response = await fetch(
        `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=DA22CF06CD504ADB087C83908040E3C6&steamid=${req.body.id}&format=json`,
      );
      const userGames = await response.json();
      const gamesFromDb = await Game.findAll({ raw: true });
      const resArray = [];
      const promis1 = await gamesFromDb.map(async (el) => {
        const promis = await userGames.response.games.map(async (game) => {
          if (el.gameSteamId === game.appid) {
            try {
              let userGamesFromStatDb = await Statistic.findOne({
                where: {
                  gameSteamId: game.appid.toString(),
                  steamId: req.body.id,
                },
                raw: true,
              });
              if (userGamesFromStatDb) {
                await Statistic.update(
                  { userGameHours: Math.ceil(game.playtime_forever / 60) },
                  {
                    where: {
                      gameSteamId: game.appid.toString(),
                      steamId: req.body.id,
                    },
                  },
                );
                userGamesFromStatDb = await Statistic.findOne({
                  where: {
                    gameSteamId: game.appid.toString(),
                    steamId: req.body.id,
                  },
                  raw: true,
                });
                resArray.push(userGamesFromStatDb);
              } else {
                const statUser = new Statistic({
                  userGameHours: Math.ceil(game.playtime_forever / 60),
                  userRank: 0,
                  steamId: req.body.id,
                  gameSteamId: game.appid,
                  gameName: el.gameSteamName,
                });
                statUser.save();
                resArray.push(statUser);
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
        await Promise.all(promis);
      });
      await Promise.all(promis1);
      res.json(resArray);
    }
  }

  async getUserChats(req, res) {
    const { user } = await (req.body);
    // console.log(user.id, user);
    const userIdToCompare = String(user.id);
    const allChatsWithLinks = await Chat.findAll();
    const usersFromBD = await User.findAll({ raw: true });
    // console.log(usersFromBD);
    if (user !== {} && user.id !== undefined) {
      const usersChats = await UserChat.findAll({ raw: true });

      const chats = usersChats.filter((el) => el.user_id === userIdToCompare);

      const allUsers = usersFromBD.filter((el) => el.id !== Number(userIdToCompare));

      const chatLinks = [];
      const prom = await chats.map(async (el) => {
        const link = await Chat.findOne({
          where: {
            id: el.chat_id,
          },
        });
        // Promise.all(link)
        chatLinks.push(link.chatLink);
      });

      Promise.all(prom).then(() => res.status(200).json({ allUsers, chatLinks }));
    }
  }
}

module.exports = new UserController();
