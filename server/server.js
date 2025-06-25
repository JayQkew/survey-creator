const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

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

app.post('/api/log-in', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }

    db.query(
        'SELECT * FROM users WHERE username = ? AND password_hash = ?',
        [username, password],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid email or password' })
            }
            //return the userID
            // use the userID to find thier surveys
            res.json(results[0])
        }
    )
})

app.post('/api/sign-up', (req, res) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({ error: 'username, email, and password are required' })
    }

    db.query(
        'SELECT email FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            
            if (results.length > 0) {
                return res.status(409).json({ error: 'Email already exists' })
            }
            
            db.query(
                'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                [username, email, password],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message })
                    console.log(result)
                    res.status(201).json({ 
                        message: 'User created successfully',
                        id: result.insertId 
                    })
                }
            )
        }
    )
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
    const { survey } = req.body;

    db.query(
        'UPDATE surveys SET title = ?, description = ? WHERE id = ?',
        [survey.title, survey.description, survey.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'Survey not found' });
            } 

            const insertPromises = survey.questions.map(q => {
                return new Promise((resolve, reject) => {
                    if (typeof q.id === 'number'){
                        db.query(
                            'UPDATE questions SET question_text = ?, type = ?, type_detail = ? WHERE id = ?',
                            [q.question_text, q.type, q.type_detail, q.id],
                            (err, res) => {
                                if(err) return reject(err);
                                resolve(res)
                            }
                        )
                    } else{
                        db.query(
                            'INSERT INTO questions (survey_id, type, type_detail, question_text) VALUES (?, ?, ?, ?)',
                            [survey.id, q.type, q.type_detail, q.question_text],
                            (err, res) => {
                                if (err) return reject(err);
                                resolve(res)
                        })
                    }
                });
            });

            Promise.all(insertPromises)
                .then(() => {
                    db.query('SELECT * FROM questions WHERE survey_id = ?', [survey.id], (err, questions) => {
                        if (err) return res.status(500).json({ error: err.message });

                        const filter = questions.filter(q => !survey.questions.some(sq => q.id === sq.id));
                        const deleteQuestions = filter.map(q => {
                            return new Promise((resolve, reject) => {
                                db.query(
                                    'DELETE FROM questions WHERE id = ?',
                                    [q.id],
                                    (err, res) => {
                                        if (err) return reject(err);
                                        resolve(res)
                                    }
                                )
                            })
                        })
                        
                        Promise.all(deleteQuestions)
                            .then(() => {
                                console.log('Quesitons Deleted')
                            })
                            .catch(err => [
                                console.log('Delete error: '+ err)
                            ])
                    });
                    res.status(201).json({ message: "All responses submitted successfully" });
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        }
    )
})

app.post('/api/delete-survey', (req, res) => {
    const { id } = req.body
    
    db.query(
        'DELETE FROM surveys WHERE id = ?',
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(200).json({ message: 'Survey Deleted'})
        }        
    )
})

app.post('/api/add-survey', (req, res) => {
    const { surveyorId, date } = req.body

    db.query(
        'INSERT INTO surveys (surveyor_id, date, description) VALUES (?, ?, ?)',
        [surveyorId, date, ""],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message })

            const surveyId = result.insertId
            console.log(surveyId)

            db.query(
                'SELECT * FROM surveys WHERE id = ?',
                [surveyId],
                (err, surveys) => {
                    if (err) return res.status(500).json({ error: err.message })
                    
                    const survey = surveys[0]
                    survey.questions = []

                    res.status(201).json({
                        message: 'Survey added successfully',
                        surveyId: surveyId,
                        survey: survey
                    })
                }
            )
    })
})

app.post('/api/submit-response', (req, res) => {
    const responses = req.body;

    if (!Array.isArray(responses.data) || responses.data.length === 0) {
        return res.status(400).json({ error: 'No responses provided' });
    }

    // Create an array of promises for all inserts
    const insertPromises = responses.data.map(r => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO responses (question_id, answer) VALUES (?, ?)',
                [r.qId, JSON.stringify(r.answer)],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    });

    Promise.all(insertPromises)
        .then(() => {
            res.status(201).json({ message: "All responses submitted successfully" });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})