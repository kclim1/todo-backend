const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../auth/googleAuth')




// Google Login Route
router.get("/google", 
    passport.authenticate("google", { scope: ["profile", "email"],session: false })
  );
  
  // Google Callback Route - Displaying the Profile Object
router.get("/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/google/failure",
      session: false
    }),
    (req, res) => {
        res.json({"user" : req.user })
        console.log(" User Object:", req.user);
        //maybe redirect to dashboard where you get to see all todos 
    }
  );


router.get("/google/failure", (req, res) => {
    res.status(401).json({ message: "Google login failed. Please try again :( "});
  });

  module.exports = router