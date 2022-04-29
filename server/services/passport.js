const SteamStrategy = require("passport-steam").Strategy;
const passport = require("passport");
const {User} = require('../models/models')

passport.use(
  new SteamStrategy(
    {
      returnURL: process.env.SERVER_URL_CALLBACK,
      realm: process.env.SERVER_URL,
      apiKey: process.env.STEAM_API_KEY,
    },
    async function(identifier, profile, done) {
        const serachUser = await User.findOne({where: {
          steamId: profile._json.steamid,
        }})
        if(serachUser){
          return done(null, profile);
        } else {
          const user = await new User({
            steamId: profile._json.steamid,
            steamNickname: profile._json.personaname,
            steamProfileLink: profile._json.profileurl,
            steamAvatar: profile._json.avatar,
          })
          user.save()
          return done(null, profile);
        }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
