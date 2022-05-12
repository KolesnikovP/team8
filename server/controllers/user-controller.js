/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
const fetch = require('cross-fetch');
const e = require('express');
const {
  Game, Statistic, User, UserCreatePost, UserChat, Chat, BgVideo, Rating,
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
      const bg = await BgVideo.findOne({
        where: {
          id: userDto.bgVideoId,
        },
      });
      userDto.bgVideoId = bg.link;
      res.status(200).json({
        success: true,
        message: 'successfull',
        user: userDto,
        //   cookies: req.cookies
      });
    }
  }

  async authFailed(req, res, next) {
    res.status(401).json({
      success: false,
      message: 'failure',
    });
  }

  async authLogout(req, res, next) {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  }

  async getInfo(req, res, next) {
    const { id } = req.body;
    try {
      const response = [];
      const userInfo = await User.findOne({
        where: {
          steamId: id,
        },
      });
      // console.log(userInfo)
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
      const userPosts = await UserCreatePost.findAll({
        where: {
          userId: userInfo.id,
        },
      });
      response.push(userInfo, userStats, userPosts);
      res.status(200).json({ response });
    } catch (e) {
      console.log(e);
    }
  }

  async validateProfile(req, res, next) {
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

  async userGames(req, res, next) {
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

  async updateDescribe(req, res, next) {
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

  async updateBg(req, res, next) {
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

  async getUsersList(req, res, next) {
    try {
      const users = await User.findAll({ raw: true });
      res.json(users);
    } catch (error) {
      console.error('Message: ', error);
    }
  }

  async updateUserStats(req, res, next) {
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
    const usersFromBD = await User.findAll({ raw: true });
    // console.log(usersFromBD);
    if (user !== {} && user.id !== undefined) {
      const usersChats = await UserChat.findAll({ raw: true });

      const chats = usersChats.filter((el) => el.user_id === userIdToCompare);

      const allUsers = usersFromBD.filter((el) => el.id !== Number(userIdToCompare));

      const steamBdIds = allUsers.map((el) => el.steamId);
      console.log(allUsers);

      const chatLinks = [];
      const steamIdArrTogether = [];
      const steamIdArr = [];

      const prom = await chats.map(async (el) => {
        const link = await Chat.findOne({
          where: {
            id: el.chat_id,
          },
        });
        chatLinks.push(link.chatLink);
        steamIdArrTogether.push(link.chatLink.slice(27, link.chatLink.length));
        const allLinks = steamIdArrTogether.map((el) => {
          steamIdArr.push(el.split('-'));
        });
      });

      // [
      //   [ '76561198098108764', '76561198862129364' ],
      //   [ '76561198098108764', '76561198862129364' ],
      //   [ '76561198862129364', '76561198862129399' ]
      // ]

      const userIdChats = [];

      await Promise.all(prom);
      steamIdArr.map((el1) => {
        const curr = el1;
        steamBdIds.map((el2) => curr.map((el) => {
          if (el2 === el) {
            userIdChats.push(el2);
          }
        }));
      });

      const resultArrLinks = [];
      const testArr = [];
      testArr.push(chatLinks);

      const allLinksResult = testArr.map((el1) => el1);
      const linksArr = allLinksResult.flat();

      userIdChats.map((el1) => {
        linksArr.map((el2) => {
          if (el2.includes(el1)) {
            resultArrLinks.push(el2);
          }
        });
      });

      const linksArr1 = [];

      resultArrLinks.map((el, i) => {
        if (resultArrLinks[i] !== resultArrLinks[i + 1]) {
          linksArr1.push(resultArrLinks[i]);
        }
      });

      function deleteDouble(linksArr1) {
        for (var q = 1, i = 1; q < linksArr1.length; ++q) {
          if (linksArr1[q] !== linksArr1[q - 1]) {
            linksArr1[i++] = linksArr1[q];
          }
        }
        linksArr1.length = i;
        return linksArr1;
      }

      const sendToClientUsers = [];

      allUsers.map((el) => {
        userIdChats.map((el1) => {
          if (el.steamId === el1) {
            sendToClientUsers.push(el);
          }
        });
      });

      const sendToClientLinks = deleteDouble(linksArr1);
      console.log('===>', allUsers);

      Promise.all(prom).then(() => res.status(200).json({ sendToClientUsers, sendToClientLinks }));
    }
  }

  async userRating(req, res, next) {
    const { user, user1, value } = req.body;
    try {
      const alreadyRecieved = await Rating.findOne({ where: { userGivingRatingId: user.id, userRecievingRatingId: user1.id } });
      if (alreadyRecieved === null) {
        const createRating = await Rating.create({ userGivingRatingId: user.id, userRecievingRatingId: user1.id, rating: value });
        const thisUserRate = await Rating.findAll({ where: { userRecievingRatingId: user1.id }, raw: true });
        const ratings = [];
        thisUserRate.map((el) => {
          ratings.push(el.rating);
        });
        res.json({ ratings, userGaveRate });
      } else {
        const thisUserRate = await Rating.findAll({ where: { userRecievingRatingId: user1.id }, raw: true });
        const ratings = [];
        thisUserRate.map((el) => {
          ratings.push(el.rating);
        });
        function arraySum(ratings) {
          let sum = 0;
          for (let i = 0; i < ratings.length; i++) {
            sum += ratings[i];
          }
          return (sum);
        }
        const summ = arraySum(ratings);
        const userRating = Math.ceil(summ / 2);
        let userCantGiveRate;
        res.json({ userRating, userCantGiveRate });
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
