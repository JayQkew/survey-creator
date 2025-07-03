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

module.exports = {
    submitResponses
}