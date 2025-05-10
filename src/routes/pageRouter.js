const express = require('express')
const router = express.Router()

//can be used for pages like contacts , faq , about , etc. serves as placeholder for now

router.get('/dashboard', (req, res) => {
    console.log('root route hit')
    res.json({sample:"todo"});
  });

module.exports = router