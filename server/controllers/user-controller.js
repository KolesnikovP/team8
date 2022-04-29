const SteamAuth = require("node-steam-openid");
const {User} = require('../models/models')
const session = require("express-session");
// const jwt = require('jsonwebtoken')
const steam = new SteamAuth({
  realm: "http://localhost:4000", // Site name displayed to users on logon
  returnUrl: "http://localhost:4000/api/auth/steam/authenticate", // Your return route
  apiKey: "DA22CF06CD504ADB087C83908040E3C6" // Steam API key
});

class UserController {

  async authSteam (req, res, next) {
    const redirectUrl = await steam.getRedirectUrl();
    return res.redirect(redirectUrl);
  }

  async auntificate (req, res, next) {
    try {
      const userData = await steam.authenticate(req);
      const serachUser = await User.findOne({where: {
        steamId: userData.steamid,
      }})
      if(serachUser){
        req.session.user = serachUser;
        res.redirect('http://localhost:3000')

      } else {
        const user = await new User({
          steamId: userData.steamid,
          steamNickname: userData.username,
          steamProfileLink: userData.profile,
          steamAvatar: userData.avatar.medium,
        })
        user.save()
        // const token = jwt.sign(user, 'secretOrPrivateKey', {expiresIn: '30m'})
        req.session.user = user;
        res.redirect('http://localhost:3000')
      }
    } catch (error) {
      console.error('Message: ', error);
    }
  }
}

module.exports = new UserController();
