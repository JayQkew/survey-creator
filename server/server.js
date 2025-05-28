const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const surveyData = require('./survey-data.json')
const { request } = require('http')

const app = express()
const PORT = 3000
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mojo_surveys'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err)
        return
    }
    console.log('Connected to the database: ' + db.config.database)
})

app.use(cors())
app.use(express.json())

app.get('/', () =>{
    console.log('Hello, World!')
})

app.post('/api/user-surverys', (req, res) => {
    const user = req.body.user;
    db.query(
        'SELECT * FROM surveys WHERE surveyor_id = ?',
        [user.id],
        async (err, surveys) => {
            if (err) return res.status(500).json({ error: err.message });

            try {
                const surveysWithQuestions = await Promise.all(
                    surveys.map(survey =>
                        new Promise((resolve, reject) => {
                            db.query(
                                'SELECT * FROM questions WHERE survey_id = ?',
                                [survey.id],
                                (err, questions) => {
                                    if (err) return reject(err);
                                    survey.questions = questions;
                                    resolve(survey);
                                }
                            );
                        })
                    )
                );
                res.json(surveysWithQuestions);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    );
});

app.post('/api/get-survey', (req, res) => {
    const surveyId = req.body.id;
    db.query('SELECT * FROM surveys WHERE id = ?', [surveyId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Survey not found' });
        }
        const survey = results[0];

        db.query('SELECT * FROM questions WHERE survey_id = ?', [surveyId], (err, questions) => {
            if (err) return res.status(500).json({ error: err.message });

            survey.questions = questions; // add questions array to the survey object
            res.json(survey);
        });
    });
})

app.post('/api/update-survey', (req, res) => {
    const requestData = req.body;
    console.log(requestData)

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