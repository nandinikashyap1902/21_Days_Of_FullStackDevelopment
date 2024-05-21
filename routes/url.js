const express = require('express')
const {handleNewShortUrl,GetAnalytics} = require('../Controllers/url')
const router = express.Router();
router.post('/',handleNewShortUrl)
router.get('/analytics/:shortId',GetAnalytics)
module.exports = router;