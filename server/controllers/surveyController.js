const Survey = require('../models/Survey')
const Question = require('../models/Question')
const Admin = require('../models/Admin')

const getUserSurveys = async (req, res) => {
    const user = req.body.user

    try {
        // First, get the survey IDs for the user
        const userSurveys = await new Promise((resolve, reject) => {
            Admin.getSurveys(user.id, (err, result) => {
                if (err) return reject(err)
                resolve(result)
            })
        })

        // Then, fetch each survey by ID
        const surveyPromises = userSurveys.map(s => {
            return new Promise((resolve, reject) => {
                Survey.findById(s.survey_id, (err, results) => {
                    if (err) return reject(err)
                    const survey = results && results.length > 0 ? results[0] : null
                    resolve(survey)
                })
            })
        })

        // Wait for all surveys to be fetched
        const surveys = await Promise.all(surveyPromises)
        
        // Filter out any null results (surveys that weren't found)
        const validSurveys = surveys.filter(survey => survey !== null)

        res.json(validSurveys)
    } catch (error) {
        console.error('Error fetching user surveys:', error)
        res.status(500).json({ error: error.message })
    }
}

const getSurvey = (req, res) => {
    const {survey_id} = req.body

    Survey.findById(survey_id, (err, results) => {
        if(err) return res.status(500).json({ error: err.message })
        if (!results || results.length === 0 ) {
            return res.status(404).json({error: 'Survey not found'})
        }

        const survey = results[0]
        res.status(200).json({...survey, questions:[]})
    })
}

const updateSurvey = async (req, res) => {
    const { survey } = req.body

    if (!survey) {
        return res.status(400).json({ error: 'Survey data is required' })
    }

    try {
        await new Promise((resolve, reject) => {
            Survey.update(survey, (err, results) => {
                if (err) return reject(err)
                if (!results || results.affectedRows === 0) {
                    return reject(new Error('Survey not found'))
                }
                resolve(results)
            })
        })

        res.status(200).json({...survey})
    } catch (error) {
        console.error('Error updating survey:', error)
        if (error.message === 'Survey not found') {
            return res.status(404).json({ error: 'Survey not found' })
        }
        res.status(500).json({ error: error.message })
    }
}

const deleteSurvey = (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ error: 'Survey Id is required'})
    }

    Admin.deleteWithSurvey(id, (err, admin) => {
        if (err) return res.status(500).json({ error: err.message })
    
        Question.deleteBySurveyId(id, (err, question) => {
            if (err) return res.status(500).json({ error: err.message })
        
            Survey.delete(id, (err, survey) => {
                if (err) return res.status(500).json({ error: err.message })
                
                res.status(200).json({ 
                    message: 'Survey deleted successfully'
                })
            })        
        })
    })
}

const createSurvey = (req, res) => {
    const { surveyorId, date } = req.body

    if (!surveyorId || !date) {
        return res.status(400).json({ error: 'Surveyor Id and date is required'})
    }

    Survey.create((err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        
        const surveyId = results.insertId
            
        Admin.create({ userId: surveyorId, surveyId: surveyId, roleId: 1}, (err, adminResults) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            
            Survey.findById(surveyId, (err, surveyResults) => {
                if (err) return res.status(500).json({ error: err.message })
                
                if (!surveyResults || surveyResults.length === 0) {
                    return res.status(404).json({ error: 'Created survey not found' })
                }
                
                const survey = surveyResults[0]
                survey.questions = []
        
                res.status(201).json({
                    message: 'Survey added successfully',
                    survey: survey
                })
            })
        })
    })
}

module.exports = {
    getUserSurveys, 
    getSurvey,
    updateSurvey,
    deleteSurvey,
    createSurvey
}