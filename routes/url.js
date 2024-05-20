const express = require('express')
const {handleNewShortUrl} = require('../Controllers/url')
const router = express.Router();
router.post('/',handleNewShortUrl)
module.exports = router;