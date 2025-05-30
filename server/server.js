const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const surveyData = require('./survey-data.json')

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

app.post('/api/add-question', (req, res) => {
    const { id } = req.body

    db.query(
        'INSERT INTO questions (survey_id, type, type_detail) VALUES (?, ?, ?)',
        [id, 'single', JSON.stringify({options: []})],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({message: 'Question added with id'})
    })
})

app.post('/api/update-question-name', (req, res) => {
    const { id, question_text } = req.body;
    if (!id || !question_text) {
        return res.status(400).json({ error: 'Missing id or question_text' });
    }
    db.query(
        'UPDATE questions SET question_text = ? WHERE id = ?',
        [question_text, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Question name updated successfully' });
        }
    );
});

app.post('/api/update-question-type', (req, res) => {
    const { id, question_type } = req.body
    
    if(!id || !question_type){
        return res.status(400).json({ error: 'Missing id or quesiton_type' })
    }
    db.query(
        'UPDATE questions SET type = ? WHERE id = ?',
        [question_type, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(200).json({ message: 'Question type updated successfully'})
        }
    )
})

app.post('/api/delete-question', (req, res) => {
    const { id } = req.body
    db.query(
        'DELETE FROM questions WHERE id = ?',
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(200).json({ message: 'Question Deleted'})
        }
    )
})

app.post('/api/add-to-list', (req, res) => {
    const { id, value } = req.body
    let options;
    // where id , add value and new id 
    db.query(
        'SELECT * FROM questions WHERE id = ?',
        [id],
        (err, result) => {
            if(err) res.status(500).json({error: err.message})
            console.log(result)
            //GET THE ARRAY
        }
    )

    db.query(
        'UPDATE questions SET type_detail = ? WHERE id = ?',
        [],
        (err, result) => {
            //UPDATE THE ARRAY
        }
    )
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