const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT 
const CRUDRouter = require('./routes/CRUDRouter')

app.use('/api/v1',CRUDRouter)

app.listen(PORT,()=>{
    console.log(`app running on ${PORT}`)
})