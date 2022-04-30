class UserController {

  async authSuccess (req, res, next) {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  }
  async authFailed (req,res, next) {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  }

  async authLogout (req,res, next) {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  }
  async authFailed (req,res, next) {

  }
}

module.exports = new UserController();
