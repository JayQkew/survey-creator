const Response = require('../models/Response')

const submitResponses = async (req, res) => {
    const { responses } = req.body
    if(!responses) return res.status(400).json({error: 'no responses to process'})
    
    try{
        for (const r of responses) {
            await new Promise((resolve, reject) => {
                Response.create(r, (err, results) => {
                    if (err) return reject(err)
                    resolve(results)
                })
            })
        }
        return res.status(200).json({message: 'Respons successfully submitted'})
    } catch (err) {
        console.error('Error submiting response: ', err)
        return res.status(500).json({ error: error.message })
    }
}

const getResponses = (req, res) => {
    const { survey_id } = req.body
    if (!survey_id) return res.status(400).json({error: 'no survey id'})
    
    Response.findBySurvey(survey_id, (err, results) => {
        if (err) return res.status(400).json({err: err.message})
        return res.status(200).json(results)
    })
}

module.exports = {
    submitResponses,
    getResponses
}