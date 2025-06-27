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

    if (!survey || !survey.id) {
        return res.status(400).json({ error: 'Survey data and ID are required' })
    }

    try {
        await new Promise((resolve, reject) => {
            Survey.update(survey.id, {
                title: survey.title,
                description: survey.description
            }, (err, results) => {
                if (err) return reject(err)
                if (!results || results.affectedRows === 0) {
                    return reject(new Error('Survey not found'))
                }
                resolve(results)
            })
        })

        // Update questions if they exist
        let finalQuestions = []
        if (survey.questions && survey.questions.length > 0) {
            finalQuestions = await Question.updateBatch(survey.id, survey.questions)
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
                message: 'Survey deleted successfully',
                deletedQuestions: questionsResult.affectedRows,
                deletedSurveys: surveyResult.affectedRows
            })
        })        
    })
}

const createSurvey = (req, res) => {
    const { surveyorId, date } = req.body

    if (!surveyorId || !date) {
        return res.status(400).json({ error: 'Surveyor Id and date is required'})
    }

    Survey.create({ surveyorId, date }, (err, survey) => {
        if (err) return res.status(500).json({ error: err.message })
        Survey.findById(survey.insertId, (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            
            const survey = surveys[0]
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