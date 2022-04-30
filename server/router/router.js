const Router = require('express').Router();
const UserController = require('../controllers/user-controller');
const SteamGamesController = require('../controllers/steamGames-controller');

// Router.get("/auth/steam", UserController.authSteam);
// Router.get("/auth/steam/authenticate", UserController.auntificate);
Router.get("/auth/steam", UserController.authSteam);

Router.get("/addPost", SteamGamesController.getListGames);

module.exports = Router;
