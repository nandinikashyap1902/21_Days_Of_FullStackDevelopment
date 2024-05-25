const express = require('express')
const {UserSignUp,UserLogin} = require('../Controllers/user')
const router = express.Router()
router.post('/',UserSignUp)
router.post('/login',UserLogin)
module.exports = router;