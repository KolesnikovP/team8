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
}

module.exports = new SteamGamesController();
