const Router = require('express').Router();
const addPostController = require('../controllers/addPost-controller');
const SteamGamesController = require('../controllers/steamGames-controller');

Router.get('/addPost', SteamGamesController.getListGames);
Router.post('/addPost', addPostController.addPost);

module.exports = Router;
