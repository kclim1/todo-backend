const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('root route hit')
    res.send('Hello from router');
  });



module.exports = router