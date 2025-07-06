const express = require('express')
const { updateQuestions, getQuestions, getQuestion } = require('../controllers/questionController')
const router = express.Router()

router.post('/update-questions', updateQuestions)
router.post('/get-questions', getQuestions)
router.post('/get-question', getQuestion)

module.exports = router