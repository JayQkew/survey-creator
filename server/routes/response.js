const express = require('express')
const { submitResponse } = require('../controllers/responseController')
const router = express.Router()

router.post('/sumbit-responses', submitResponse)

module.exports = router