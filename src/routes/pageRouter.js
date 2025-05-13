const express = require('express')
const router = express.Router()
const pageRouter = require('../controllers/pageController')

//can be used for pages like contacts , faq , about , etc. serves as placeholder for now

router.get('/dashboard', pageRouter.getDashboard);




module.exports = router