const Router = require('express').Router();
const UserController = require('../controllers/user-controller');

Router.post('/login', UserController.login);


module.exports = Router;
