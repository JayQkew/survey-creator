const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', () =>{
    console.log('Hello, World!')
})

app.get('/api/get', (req, res) => {
    const filePath = path.join(__dirname, 'survey-data.json')

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) return res.status(500).json({ error: 'Could not read file' })
        
        const survey = JSON.parse(data)
        res.json(survey)
    })
})

app.post('/api/update-survey', (req, res) => {
    const requestData = req.body;

    const filePath = path.join(__dirname, 'survey-data.json')
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) return res.status(500).json({ error: 'Could not read file' })
        console.log(data)
    })
    res.status(201).json({message: 'data received successfully', data: requestData})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})