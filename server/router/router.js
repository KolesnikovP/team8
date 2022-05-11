const Router = require('express').Router();
const postController = require('../controllers/post-controller');
const SteamGamesController = require('../controllers/steamGames-controller');
const userController = require('../controllers/user-controller');
const bgVideoController = require('../controllers/bg-controller');
const chatController = require('../controllers/chat-controller');

Router.get('/initPosts', postController.getPostsList);
Router.post('/addPost', postController.addPost);

Router.get('/initUsers', userController.getUsersList);
Router.post('/validateProfile', userController.validateProfile);
Router.post('/getInfo', userController.getInfo);
Router.post('/validateProfile', userController.validateProfile);
Router.post('/userGames', userController.userGames);
Router.post('/updateUserStats', userController.updateUserStats);
Router.put('/updateDescribe', userController.updateDescribe);
Router.put('/updateBg', userController.updateBg);

Router.get('/initGames', SteamGamesController.getListGames);
Router.post('/getNewsGames', SteamGamesController.getNewsGames);

Router.get('/initBgs', bgVideoController.getListBg);
Router.post('/getHistory', chatController.getChatHistory)

module.exports = Router;
