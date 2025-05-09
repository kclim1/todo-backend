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
        let googleUser = await User.findOne({ googleId: profile.id });
        if(!googleUser){
            googleUser = await User.create({
                googleId:profile.id,
                userName:profile.displayName,
                email:profile.emails[0].value
            })
        }
        
        let user = {
          googleId: profile.id,
          email: profile.emails[0].value,
          userName: profile.displayName
        };

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3h" });
        console.log('new token generated')
        user.token = token;

        done(null, user);

      } catch (error) {
        console.error("Error logging in with Google:", error);
        done(error, null); 
      }
    }
  )
);

module.exports = googleStrategy;
