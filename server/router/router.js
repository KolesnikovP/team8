const Router = require('express').Router();
const SteamGamesController = require('../controllers/steamGames-controller');


Router.get("/addPost", SteamGamesController.getListGames);

module.exports = Router;
