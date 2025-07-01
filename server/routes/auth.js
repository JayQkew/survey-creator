const express = require('express')
const { login, signup } = require('../controllers/authController')
const router = express.Router()

router.post('/log-in', login)
router.post('/sign-up', signup)

module.exports = router