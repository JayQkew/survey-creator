const express = require('express')
const {
    getUserSurveys, 
    getSurvey,
    updateSurvey,
    deleteSurvey,
    createSurvey
} = require('../controllers/surveyController')
const router = express.Router()

router.post('/user-surveys', getUserSurveys)
router.post('/get-survey', getSurvey)
router.post('/update-survey', updateSurvey)
router.post('/delete-survey', deleteSurvey)
router.post('/add-survey', createSurvey)

module.exports = router