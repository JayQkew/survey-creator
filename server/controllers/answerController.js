const Answer = require('../models/Answer')

const getAnswers = async (req, res) => {
    const { question_id } = req.body
    if (!question_id) res.status(400).json({ error: 'no question id'})
    
    Answer.findByQuestion(question_id, (err, answers) => {
        if(err) return res.status(400).json({ error: err.message })
        res.status(200).json(answers)
    })
}

const updateAnswers = async (req, res) => {
    const { user_id, survey_id, question_id, new_answers } = req.body
    if (!question_id) return res.status(400).json({ error: 'no question id'})
    if (!question_id) return res.status(400).json({ error: 'no question id'})
    if (!user_id) return res.status(400).json({ error: 'no user id'})
    if (!survey_id) return res.status(400).json({ error: 'no survey id'})
    if (!Array.isArray(new_answers)) return res.status(400).json({ error: 'no new_answers array'})

    const existing = await new Promise((resolve, reject) => {
        Answer.findByQuestion(question_id, (err, answers) => {
            if(err) return reject(err)
            resolve(answers || [])
        })
    })

    console.log(existing)
    let finalAnswers = []
    try{
        for (const a of new_answers){
            if(!isNumericId(a.id)){
                await new Promise((resolve, reject) => {
                    Answer.create({
                        survey_id: survey_id,
                        value: a.value,
                        created_by: user_id,
                        question_id: question_id
                    }, (err, answer) => {
                        if(err) return reject(err)
                        finalAnswers.push(answer)
                        console.log(answer)
                        resolve(answer)
                    })
                })
            } else {
                finalAnswers.push(a)
                console.log(a)
            }
        }
    
        const currentAnswerIds = finalAnswers.map(a => a.id).filter(id => isNumericId(id))
        const answersToDelete = existing.filter(q => !currentAnswerIds.includes(q.id))
    
        for (const answerToDelete of answersToDelete){
            Answer.delete(answerToDelete.id, (err, result) => {
                if (err) res.status(400).json({ error: err.message })
            })
        }
    } catch (err) {
        console.error('Error updating answers: ', err)
        return res.status(500).json({ error: err.message })
    }

    return res.status(200).json(finalAnswers)
}

const isNumericId = (id) => {
    return typeof id === 'number' || (typeof id === 'string' && !isNaN(id) && !isNaN(parseInt(id)))
}

module.exports = {
    getAnswers,
    updateAnswers
}