const Router = require('express').Router();
const UserController = require('../controllers/user-controller');

// Router.get("/auth/steam", UserController.authSteam);
// Router.get("/auth/steam/authenticate", UserController.auntificate);
Router.get("/auth/steam", UserController.authSteam);

module.exports = Router;
