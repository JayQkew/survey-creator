const Answer = require('../models/Answer')

const getAnswers = async (req, res) => {
    const { question_id } = req.body
    if (!question_id) res.status(400).json({ error: 'no question id'})
    
    Answer.findByQuestion(question_id, (err, answers) => {
        if(err) return res.status(400).json({ error: err.message })
        console.log(answers)
        res.status(200).json(answers)
    })
}

module.exports = {
    getAnswers
}