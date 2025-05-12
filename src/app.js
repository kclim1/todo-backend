// src/app.js
const express = require('express');
const app = express();
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});const PORT = process.env.PORT 
const connectToMongoDB = require('./config/connectToMongoDB');
const CRUDRouter = require('./routes/CRUDRouter');
const authRouter = require('./routes/authRouter')
const pageRouter = require('./routes/pageRouter')
const passport = require('passport');
require('./auth/googleAuth');
const verifyJWT = require('./middleware/verifyJWT')

// Establish connection to MongoDB and start server if not in test mode  
if (process.env.NODE_ENV !== 'test') {
  connectToMongoDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 App running on ${PORT}`);
  });
}

//use to check which env file is loaded
console.log(
  process.env.NODE_ENV === 'test' 
    ? ".env.test loaded" 
    : ".env loaded"
);

// Initialize Passport Middleware
app.use(passport.initialize());

// Middleware for JSON parsing
app.use(express.json());

//Can add github auth or local auth in the future
app.use("/auth", authRouter);

//maybe protect these ones too
app.use('/',pageRouter)

// Mount the CRUD Router. all CRUD operations protected
app.use('/api/v1',verifyJWT ,CRUDRouter);



module.exports = app;