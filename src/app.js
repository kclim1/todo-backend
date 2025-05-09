// src/app.js
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT 
const connectToMongoDB = require('./config/connectToMongoDB');
const CRUDRouter = require('./routes/CRUDRouter');
const authRouter = require('./routes/authRouter')
const pageRoutes = require('./routes/pageRoutes')
const passport = require('passport');
require('./auth/googleAuth');

// Establish connection to MongoDB
connectToMongoDB();

// Initialize Passport Middleware
app.use(passport.initialize());

// Middleware for JSON parsing
app.use(express.json());

//Can add github auth or local auth in the future
app.use("/auth", authRouter);

app.use('/',pageRoutes)

// Mount the CRUD Router (API Routes)
app.use('/api/v1', CRUDRouter);


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 App running on http://localhost:${PORT}`);
});