const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const surveyData = require('./survey-data.json')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', () =>{
    console.log('Hello, World!')
})

app.get('/api/get', (req, res) => {
    res.json(surveyData)
})

app.post('/api/update-survey', (req, res) => {
    const requestData = req.body;

    const i = surveyData.findIndex(x => x.id === requestData.id)
    if (i !== -1) {
        surveyData[i] = requestData
        fs.writeFileSync('./survey-data.json', JSON.stringify(surveyData, null, 2))
        res.status(201).json({message: 'data received successfully', data: requestData})
        console.log(surveyData[i])
    } else{
        return res.status(404).json({ error: 'Survey not found' })
    }
})

app.post('/api/delete-survey', (req, res) => {
    const survey = req.body
    const i = surveyData.findIndex(s => s.id === survey.id)

    if (i === -1){
        return res.status(404).json({ error: 'Survey not found'})
    }

    surveyData.splice(i, 1)
        try {
        fs.writeFileSync(path.join('./survey-data.json'), JSON.stringify(surveyData, null, 2))
        res.status(200).json({ message: 'Survey deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to write to file' })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})