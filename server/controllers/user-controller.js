const SteamAuth = require("node-steam-openid");
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
      console.log(userData)
      const user = await 
      res.redirect('http://localhost:3000')
      //...do something with the data
    } catch (error) {
      console.error('xer', error);
    }
  }
}

module.exports = new UserController();
