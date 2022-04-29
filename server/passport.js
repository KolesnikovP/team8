const SteamStrategy = require("passport-steam").Strategy;
const passport = require("passport");

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:4000/auth/steam/callback',
      realm: 'http://localhost:4000/',
      apiKey: 'DA22CF06CD504ADB087C83908040E3C6',
    },
    function(identifier, profile, done) {
      // User.findByOpenID({ openId: identifier }, function (err, user) {
        return done(null, profile);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
