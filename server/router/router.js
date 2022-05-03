const Router = require('express').Router();
const addPostController = require('../controllers/addPost-controller');
const SteamGamesController = require('../controllers/steamGames-controller');
const userController = require('../controllers/user-controller');

Router.get("/addPost", SteamGamesController.getListGames);
Router.post("/validateProfile", userController.validateProfile)
Router.post('/addPost', addPostController.addPost);
Router.post('/userGames', userController.userGames);
Router.put('/updateDescribe', userController.updateDescribe);

module.exports = Router;
