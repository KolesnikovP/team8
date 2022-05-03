const router = require("express").Router();
const passport = require("passport");
const UserController = require('../controllers/user-controller');

router.get("/login/success", UserController.authSuccess);
router.get("/login/failed", UserController.authFailed);
router.get("/logout", UserController.authLogout);
router.get("/steam", passport.authenticate("steam", { scope: ["profile"] }));
router.get("/steam/callback",passport.authenticate("steam", {
    successRedirect: 'http://localhost:3000/accessForm',
    failureRedirect: "/login/failed",
  })
);

module.exports = router