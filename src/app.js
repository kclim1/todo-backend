// src/app.js
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const CRUDRouter = require('./routes/CRUDRouter');
const connectToMongoDB = require('./config/connectToMongoDB');
const User = require('./schema/User');
const passport = require('passport');
require('./auth/googleAuth');

// Establish connection to MongoDB
connectToMongoDB();

// Initialize Passport Middleware
app.use(passport.initialize());

// Middleware for JSON parsing
app.use(express.json());

// Mount the CRUD Router (API Routes)
app.use('/api/v1', CRUDRouter);

// Google Login Route
app.get("/auth/google", 
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Callback Route - Displaying the Profile Object
app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    console.log("✅ Google Profile Object:", req.user);
    res.json(req.user); // Send the Google profile object as a JSON response
  }
);
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 App running on http://localhost:${PORT}`);
});