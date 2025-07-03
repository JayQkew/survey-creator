const Response = require('../models/Response')

const submitResponses = async (req, res) => {
    const { responses } = req.body
    if(!responses) res.status(400).json({error: 'no responses to process'})
    res.status(200).json({data: responses})
}

module.exports = {
    submitResponses
}