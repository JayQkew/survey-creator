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
    console.log(survey)

    db.query(
        'UPDATE surveys SET title = ?, description = ? WHERE id = ?',
        [survey.title, survey.description, survey.id],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'Survey not found' });
            } 

            res.json({
                message: 'Survey Updated Successfully'
            })
        }
    )
})

//depricate
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

//depricate
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

//depricate
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

//depricate
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

//depricate
app.post('/api/add-to-list', (req, res) => {
    const { id, value } = req.body;
    if (!id || !value) return res.status(400).json({ error: 'Missing id or value' });
    
    db.query(
        'SELECT * FROM questions WHERE id = ?',
        [id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!result || result.length === 0) return res.status(404).json({ error: 'Question not found' });

            let typeDetail;
            try {
                typeDetail = JSON.parse(result[0].type_detail);
            } catch (parseError) {
                return res.status(500).json({ error: 'Invalid type_detail format' });
            }
            const options = typeDetail.options || [];
            options.push(value);
            typeDetail.options = options;
            
            db.query(
                'UPDATE questions SET type_detail = ? WHERE id = ?',
                [JSON.stringify(typeDetail), id], // Convert back to JSON string
                (error, updateResult) => {
                    if (error) {
                        return res.status(500).json({ error: error.message });
                    }
                    
                    console.log('Value added successfully');
                    res.status(200).json({ 
                        message: 'Value added successfully',
                        options: options
                    });
                }
            );
        }
    );
});

//depricate
app.post('/api/delete-from-list', (req, res) => {
    const { qId, id } = req.body;
    
    if (!id || !qId) {
        return res.status(400).json({ error: 'Missing qId or id' });
    }

    db.query(
        'SELECT * FROM questions WHERE id = ?',
        [qId],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'Question not found' });
            }
            
            let type_detail;
            try {
                type_detail = JSON.parse(results[0].type_detail); // Fixed: results instead of result, type_detail instead of typeDetail
            } catch (parseError) {
                return res.status(500).json({ error: 'Invalid type_detail format' });
            }

            const options = type_detail.options || [];
            
            // Find the index of the option with the matching id
            const optionIndex = options.findIndex(option => option.id === id);
            
            if (optionIndex === -1) {
                return res.status(404).json({ error: 'Option not found' });
            }
            
            // Remove the option from the array
            options.splice(optionIndex, 1);
            
            // Update the type_detail object
            type_detail.options = options;
            
            // Update the database
            db.query(
                'UPDATE questions SET type_detail = ? WHERE id = ?',
                [JSON.stringify(type_detail), qId],
                (updateErr, updateResult) => {
                    if (updateErr) {
                        return res.status(500).json({ error: updateErr.message });
                    }
                    
                    console.log('Option deleted successfully');
                    res.status(200).json({ 
                        message: 'Option deleted successfully',
                        options: options
                    });
                }
            );
        }
    );
});

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

//depricate
app.post('/api/update-survey-title', (req, res) => {
    const { id, newTitle } = req.body;
    if (!id || !newTitle) {
        return res.status(400).json({ error: 'Missing id or newTitle' });
    }
    db.query(
        'UPDATE surveys SET title = ? WHERE id = ?',
        [newTitle, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Survey title updated successfully' });
        }
    );
});

//depricate
app.post('/api/update-survey-desc', (req, res) => {
    const { id, newDesc } = req.body;
    if (!id || !newDesc){
        return res.status(400).json({ error: 'Missing id or newDesc'})
    }
    db.query(
        'UPDATE surveys SET description = ? WHERE id = ?',
        [newDesc, id],
        (err, result) => {
            if (err) res.status(500).json({ error: err.message })
            res.status(200).json({ message: 'Survey description updated successfully'})
        }
    )
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