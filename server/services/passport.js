const SteamStrategy = require('passport-steam').Strategy;
const passport = require('passport');
const { User, BgVideo } = require('../models/models');

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.SERVER_URL_CALLBACK,
      realm: process.env.SERVER_URL,
      apiKey: process.env.STEAM_API_KEY,
    },
    (async (identifier, profile, done) => {
      const serachUser = await User.findOne({
        where: {
          steamId: profile._json.steamid,
        },
      });
      if (serachUser) {
        return done(null, profile);
      }
      const user = await new User({
        steamId: profile._json.steamid,
        steamNickname: profile._json.personaname,
        steamProfileLink: profile._json.profileurl,
        steamAvatar: profile._json.avatarfull,
        bgVideoId: 1,
      });
      user.save();
      // const bg = await BgVideo.findOne({
      //   where: {
      //     id: user.bgVideoId,
      //   },
      // });
      // user.bgVideoId = bg.link;
      return done(null, profile);
    }),
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
