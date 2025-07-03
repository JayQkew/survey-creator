const Response = require('../models/Response')

const submitResponse = async (req, res) => {
    const { responses } = req.body

    console.log(responses)
}

module.exports = {
    submitResponse
}