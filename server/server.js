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

app.post('/api/update-survey', async (req, res) => {
    const requestData = req.body;
    const surveyId = requestData.id;

    try {
        // Get existing questions from database
        const existingQuestions = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM questions WHERE survey_id = ?', [surveyId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        // Process each question in the request
        for (const question of requestData.questions) {
            if (question.id && typeof question.id === 'number' && question.id < 1000000000000) {
                // Existing question - update it
                const updateQuestionQuery = `
                    UPDATE questions 
                    SET question_text = ?, type = ?, type_detail = ?, public_responses = ?
                    WHERE id = ? AND survey_id = ?
                `;
                
                // Handle the different property naming conventions
                const questionText = question.question_text || question.question;
                const typeDetail = question.type_detail || JSON.stringify(question.typeDetail || {});
                const publicResponses = question.public_responses !== undefined ? 
                    question.public_responses : (question.publicResponses ? 1 : 0);

                await new Promise((resolve, reject) => {
                    db.query(updateQuestionQuery, [
                        questionText,
                        question.type,
                        typeDetail,
                        publicResponses,
                        question.id,
                        surveyId
                    ], (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
            } else {
                // New question - insert it
                const insertQuestionQuery = `
                    INSERT INTO questions (survey_id, question_text, type, type_detail, public_responses)
                    VALUES (?, ?, ?, ?, ?)
                `;
                
                const questionText = question.question_text || question.question;
                const typeDetail = question.type_detail || JSON.stringify(question.typeDetail || {});
                const publicResponses = question.public_responses !== undefined ? 
                    question.public_responses : (question.publicResponses ? 1 : 0);

                await new Promise((resolve, reject) => {
                    db.query(insertQuestionQuery, [
                        surveyId,
                        questionText,
                        question.type,
                        typeDetail,
                        publicResponses
                    ], (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
            }
        }

        // Find questions that were deleted (exist in DB but not in request)
        const requestQuestionIds = requestData.questions
            .filter(q => q.id && typeof q.id === 'number' && q.id < 1000000000000)
            .map(q => q.id);
        
        const questionsToDelete = existingQuestions.filter(
            dbQuestion => !requestQuestionIds.includes(dbQuestion.id)
        );

        // Delete removed questions
        for (const questionToDelete of questionsToDelete) {
            await new Promise((resolve, reject) => {
                db.query('DELETE FROM questions WHERE id = ? AND survey_id = ?', 
                    [questionToDelete.id, surveyId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        }

        // Update the JSON file (if you still need this)
        const i = surveyData.findIndex(x => x.id === requestData.id);
        if (i !== -1) {
            surveyData[i] = requestData;
            fs.writeFileSync('./survey-data.json', JSON.stringify(surveyData, null, 2));
        }

        console.log('Survey successfully updated id: ' + surveyId);
        res.status(200).json({ message: 'Survey updated successfully', data: requestData });

    } catch (error) {
        console.error('Error updating survey:', error);
        res.status(500).json({ error: 'Failed to update survey: ' + error.message });
    }
});

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