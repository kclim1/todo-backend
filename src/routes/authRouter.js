const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth/googleAuth')




// Google Login Route
router.get("/google", 
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // Google Callback Route - Displaying the Profile Object
router.get("/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
    }),
    (req, res) => {
        console.log("✅ Google Profile Object:", req.user);
    }
  );


router.get("/google/failure", (req, res) => {
    res.status(401).json({ message: "Google login failed. Please try again :( "});
  });

  module.exports = router