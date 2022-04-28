const userService = require('../service/user-service');

class UserController {
  //  async login(req, res, next) {
  //   try {
  //    res.send('login')
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  async registration(req, res, next) {
    try {
     res.send('login')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new UserController();
