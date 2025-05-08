const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT 

app.get('/', (req, res) => {
    res.send('Hello from Dockerized Node App!');
  });

app.listen(PORT,()=>{
    console.log(`app running on ${PORT}`)
})