const Router = require('express').Router();
const SteamGamesController = require('../controllers/steamGames-controller');
const userController = require('../controllers/user-controller');


Router.get("/addPost", SteamGamesController.getListGames);
Router.post("/validateProfile", userController.validateProfile)

module.exports = Router;
