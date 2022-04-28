const userService = require('../service/user-service');

class UserController {
   async login(req, res, next) {
     res.send('login')
  //   try {
  //    res.send('login')
  //   } catch (e) {
  //     console.log(e)
  //   }
  }
}

module.exports = new UserController();
