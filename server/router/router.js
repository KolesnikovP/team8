const Router = require('express').Router();
const postController = require('../controllers/post-controller');
const SteamGamesController = require('../controllers/steamGames-controller');
const userController = require('../controllers/user-controller');

Router.get('/initGames', SteamGamesController.getListGames);
Router.post('/validateProfile', userController.validateProfile);
Router.get('/initPosts', postController.getPostsList);
Router.post('/addPost', postController.addPost);
Router.post('/userGames', userController.userGames);

module.exports = Router;
