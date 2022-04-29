const {User} = require('../models/models')

class UserController {

  // async authSteam (req, res, next) {
  //   const redirectUrl = await steam.getRedirectUrl();
  //   return res.redirect(redirectUrl);
  // }

  // async auntificate (req, res, next) {
  //   try {
  //     const userData = await steam.authenticate(req);
  //     const serachUser = await User.findOne({where: {
  //       steamId: userData.steamid,
  //     }})
  //     if(serachUser){
  //       req.session.user = serachUser;
  //       res.redirect('http://localhost:3000')

  //     } else {
  //       const user = await new User({
  //         steamId: userData.steamid,
  //         steamNickname: userData.username,
  //         steamProfileLink: userData.profile,
  //         steamAvatar: userData.avatar.medium,
  //       })
  //       user.save()
  //       // const token = jwt.sign(user, 'secretOrPrivateKey', {expiresIn: '30m'})
  //       req.session.user = user;
  //       res.redirect('http://localhost:3000')
  //     }
  //   } catch (error) {
  //     console.error('Message: ', error);
  //   }
  // }
}

module.exports = new UserController();
