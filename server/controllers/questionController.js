const Question = require('../models/Question')

const updateQuestions = async (req, res) => {
    const { updatedQuestions, survey_id } = req.body

    if(!updatedQuestions) return res.status(400).json({ error: 'no updated questions'})
    
    let finalQuestions = []
    try {
        if (updatedQuestions.length > 0){
            const existing = await new Promise((resolve, reject) => {
                Question.findBySurveyId(survey_id, (err, questions) => {
                    if (err) return reject(err)
                    resolve(questions || [])
                })
            })

            for (const q of updatedQuestions){
                if(isNumericId(q.id)){
                    await new Promise((resolve, reject) => {
                        Question.update(q, (err, result) => {
                            if (err) return reject(err)
                            resolve(result)
                        })
                    })
                    finalQuestions.push(q)
                } else {
                    const newQuestion = await new Promise((resolve, reject) => {
                        Question.create({
                            survey_id: survey_id,
                            type: q.type,
                            type_detail: q.type_detail,
                            text: q.text
                        }, (err, result) => {
                            if (err) return reject(err)
                            resolve({
                                ...q,
                                id: result.insertId
                            })
                        })
                    })
                    finalQuestions.push(newQuestion)
                }
            }

            const currentQuestionIds = finalQuestions.map(q => q.id).filter(id => isNumericId(id))
            const questionsToDelete = existing.filter(q => !currentQuestionIds.includes(q.id))
            
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
                Question.deleteBySurveyId(survey_id, (err, result) => {
                    if (err) return reject(err)
                    resolve(result)
                })
            })
        }
    } catch (err) {
        console.error('Error updating quesitons: ', err)
        res.status(500).json({ error: error.message })
    }

    res.status(200).json(finalQuestions)
}

const getQuestions = (req, res) => {
    const { survey_id } = req.body
    if (!survey_id) res.status(400).json({ error: 'no updated questions'})

    Question.findBySurveyId(survey_id, (err, questions) => {
        if (err) return res.status(500).json({ error: err.message })
        res.status(200).json(questions)
    })
}

const isNumericId = (id) => {
    return typeof id === 'number' || (typeof id === 'string' && !isNaN(id) && !isNaN(parseInt(id)))
}

module.exports = {
    updateQuestions,
    getQuestions
}