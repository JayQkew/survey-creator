const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const surveyData = require('./survey-data.json')

const app = express()
const PORT = 3000
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mojo_surveys'
})

database.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err)
        return
    }
    console.log('Connected to the database: ' + database.config.database)
})

app.use(cors())
app.use(express.json())

app.get('/', () =>{
    console.log('Hello, World!')
})

app.post('/api/user-surverys', (req, res) => {
    const user = req.body.user
    let allSurveys;
    database.query(`SELECT * FROM surveys  WHERE surveyor_id = ${user.id}`, function(err, result, fields){
        if (err) throw err
        allSurveys = result
        console.log(result)
        console.log(user)
        res.json(result)
    })
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