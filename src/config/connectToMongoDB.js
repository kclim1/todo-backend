const mongoose = require('mongoose')


async  function connectToMongoDB(){
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('connection to mongodb succesful')
    }catch(error){
      console.error('cannot connect to mongodb')
    }
  }

module.exports = connectToMongoDB