const express = require('express')
const { submitResponses } = require('../controllers/responseController')
const router = express.Router()

router.post('/sumbit-responses', submitResponses)

module.exports = router