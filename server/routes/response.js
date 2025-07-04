const express = require('express')
const { submitResponses, getResponses } = require('../controllers/responseController')
const router = express.Router()

router.post('/sumbit-responses', submitResponses)
router.post('/get-responses', getResponses)

module.exports = router