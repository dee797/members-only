const db = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.getUserByUsername(username);
  
        if (!user) {
          return done(null, false, { message: "Incorrect username or password" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect username or password" });
        }

        return done(null, user);

      } catch(err) {
        return done(err);
      }
    })
  );


passport.serializeUser((user, done) => {
    done(null, user.userid);
});
  

passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserByID(id);
      done(null, user);
    } catch(err) {
      done(err);
    }
});
  

  