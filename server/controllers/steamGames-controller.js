const fetch = require('cross-fetch');
const { Game } = require('../models/models');

class SteamGamesController {
  async getListGames(req, res, next) {
    try {
      const gamesList = await Game.findAll({ raw: true });
      res.json(gamesList);
    } catch (error) {
      console.error('Message: ', error);
    }
  }

  async getNewsGames(req, res, next) {
    if (req.body.id) {
      const { id } = req.body;
      const rnd = Math.floor(Math.random() * 10);
      fetch(
        `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?key=DA22CF06CD504ADB087C83908040E3C6&appid=${id}&count=10`,
      )
        .then((response) => response.json())
        .then((data) => res.json(data.appnews.newsitems[rnd].contents));
    }
  }
}

module.exports = new SteamGamesController();
