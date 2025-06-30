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
                    resolve(survey)                })
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

const formatDateTime = (sqlDateTime) => {
    if (!sqlDateTime) return null
    
    if (sqlDateTime instanceof Date) {
        return sqlDateTime.toISOString()
    }
    
    try {
        const date = new Date(sqlDateTime)
        return date.toISOString()
    } catch (error) {
        console.error('Error formatting datetime:', error)
        return sqlDateTime
    }
}

const getSurvey = (req, res) => {
    const surveyId = req.body.id

    Survey.findById(surveyId, (err, results) => {
        if(err) return res.status(500).json({ error: err.message })
        if (!results || results.length === 0 ) {
            return res.status(404).json({error: 'Survey not found'})
        }

        const survey = results[0]

        Question.findBySurveyId(surveyId, (err, questions) => {
            if (err) return res.status(500).json({ error: err.message })
            survey.questions = questions
            res.json(survey)
        })
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

        // Handle questions if they exist
        let finalQuestions = []
        if (survey.questions && survey.questions.length > 0) {
            const existingQuestions = await new Promise((resolve, reject) => {
                Question.findBySurveyId(survey.id, (err, questions) => {
                    if (err) return reject(err)
                    resolve(questions || [])
                })
            })

            for (const question of survey.questions) {
                if (isNumericId(question.id)) {
                    await new Promise((resolve, reject) => {
                        Question.update(question, (err, result) => {
                            if (err) return reject(err)
                            resolve(result)
                        })
                    })
                    finalQuestions.push(question)
                } else {
                    const newQuestion = await new Promise((resolve, reject) => {
                        Question.create({
                            surveyId: survey.id,
                            type: question.type,
                            typeDetail: question.type_detail,
                            quesitonText: question.question_text // Note: using the typo from Question.js
                        }, (err, result) => {
                            if (err) return reject(err)
                            resolve({
                                ...question,
                                id: result.insertId
                            })
                        })
                    })
                    finalQuestions.push(newQuestion)
                }
            }

            const currentQuestionIds = finalQuestions.map(q => q.id).filter(id => isNumericId(id))
            const questionsToDelete = existingQuestions.filter(q => !currentQuestionIds.includes(q.id))
            
            for (const questionToDelete of questionsToDelete) {
                await new Promise((resolve, reject) => {
                    Question.delete(questionToDelete.id, (err, result) => {
                        if (err) return reject(err)
                        resolve(result)
                    })
                })
            }
        } else {
            await new Promise((resolve, reject) => {
                Question.deleteBySurveyId(survey.id, (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                })
            })
        }

        res.status(200).json({
            ...survey,
            questions: finalQuestions
        })
    } catch (error) {
        console.error('Error updating survey:', error)
        if (error.message === 'Survey not found') {
            return res.status(404).json({ error: 'Survey not found' })
        }
        res.status(500).json({ error: error.message })
    }
}

const isNumericId = (id) => {
    return typeof id === 'number' || (typeof id === 'string' && !isNaN(id) && !isNaN(parseInt(id)))
}

const deleteSurvey = (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ error: 'Survey Id is required'})
    }

    Question.deleteBySurveyId(id, (err, question) => {
        if (err) {
            console.error('Error deleting questions:', err)
            return res.status(500).json({ error: err.message })
        }
    
        Survey.delete(id, (err, survey) => {
            if (err) {
                console.error('Error deleting survey:', err)
                return res.status(500).json({ error: err.message })
            }
            
            res.status(200).json({ 
                message: 'Survey deleted successfully'
            })
        })        
    })
}

const createSurvey = (req, res) => {
    const { surveyorId, date } = req.body

    if (!surveyorId || !date) {
        return res.status(400).json({ error: 'Surveyor Id and date is required'})
    }

    Survey.create({ surveyorId, date }, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        Survey.findById(results.insertId, (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            
            const survey = results[0]
            survey.questions = []

            res.status(201).json({
                message: 'Survey added successfully',
                surveyId: surveyId,
                survey: survey
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