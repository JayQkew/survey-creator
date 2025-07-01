const express = require('express')
const { updateQuestions, getQuestions } = require('../controllers/questionController')
const router = express.Router()

router.post('/update-questions', updateQuestions)
router.post('/get-questions', getQuestions)

module.exports = router