require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schema/User');
const jwt = require('jsonwebtoken');

const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

        user.token = token;

        done(null, user);
      } catch (error) {
        console.error("Error logging in with Google:", error);
        done(error, null); // Ensure the error is passed to Passport
      }
    }
  )
);

module.exports = googleStrategy;
