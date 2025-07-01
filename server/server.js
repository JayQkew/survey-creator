const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const surveyRoutes = require('./routes/surveys')
const questionRoutes = require('./routes/question')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', surveyRoutes)
app.use('/api', questionRoutes)

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

app.post('/api/get-responses', (req, res) => {
    const { id } = req.body

    //look for all questions that are involved
    db.query(
        'SELECT * FROM questions WHERE survey_id = ?', 
        [id], 
        (err, questions) => {
            if (err) return res.status(500).json({ error: err.message });
            const questionIds = questions.map(q => {
                return q.id
            })

            // const responses = 
    });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})