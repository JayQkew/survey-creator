const express = require('express')
const { getAnswers, updateAnswers } = require('../controllers/answerController')
const router = express.Router()

router.post('/get-answers', getAnswers)
router.post('/update-answers', updateAnswers)

module.exports = router