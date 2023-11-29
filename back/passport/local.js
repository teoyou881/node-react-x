const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            // passport does not have a way to send a message to the client
            // passport just check if there is an error or not
            // so we have to send it manually
            // done(server error, success, client error)
            return done(null, false, { reason: 'No user exists' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // If login success, passport will send user object to the client
            return done(null, user);
          }
          return done(null, false, { reason: 'Wrong password' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
