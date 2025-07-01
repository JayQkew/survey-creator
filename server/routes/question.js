const express = require('express')
const { updateQuestions } = require('../controllers/questionController')
const router = express.Router()

router.post('/update-questions', updateQuestions)

module.exports = router