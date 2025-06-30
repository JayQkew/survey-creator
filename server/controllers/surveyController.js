const Survey = require('../models/Survey')
const Question = require('../models/Question')

const getUserSurveys = async (req, res) => {
    const user = req.body.user

    Survey.findByUserId(user.id, async (err, surveys) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(surveys)
    })

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
        // Update survey basic info (title, description)
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
            // Get existing questions
            const existingQuestions = await new Promise((resolve, reject) => {
                Question.findBySurveyId(survey.id, (err, questions) => {
                    if (err) return reject(err)
                    resolve(questions || [])
                })
            })

            // Process each question in the survey
            for (const question of survey.questions) {
                if (isNumericId(question.id)) {
                    // Existing question - update it
                    await new Promise((resolve, reject) => {
                        Question.update(question, (err, result) => {
                            if (err) return reject(err)
                            resolve(result)
                        })
                    })
                    finalQuestions.push(question)
                } else {
                    // New question - create it
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

            // Delete questions that are no longer in the survey
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
            // No questions in survey - delete all existing questions
            await new Promise((resolve, reject) => {
                Question.deleteBySurveyId(survey.id, (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                })
            })
        }

        // Return updated survey with questions
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

// Helper function to check if ID is numeric (existing question) vs string (new question)
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