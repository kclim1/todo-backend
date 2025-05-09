const express = require('express')
const router = express.Router()

router.get('/dashboard', (req, res) => {
    console.log('root route hit')
    res.json({sample:"todo"});
  });





module.exports = router