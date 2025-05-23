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

    // const filePath = path.join(__dirname, 'survey-data.json')
    // fs.readFile(filePath, 'utf-8', (err, data) => {
    //     if(err) return res.status(500).json({ error: 'Could not read file' })
    //     console.log(data)
    // })

    surveyData.find(x => x.id === requestData.id) = requestData
    fs.writeFileSync('./survey-data.json', JSON.stringify(surveyData, null, 2))
    res.status(201).json({message: 'data received successfully', data: requestData})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})