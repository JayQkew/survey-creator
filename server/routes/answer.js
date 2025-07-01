const express = require('express')
const { getAnswers } = require('../controllers/answerController')
const router = express.Router()

router.post('/get-answers', getAnswers)

module.exports = router