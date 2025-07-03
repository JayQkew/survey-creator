const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const surveyRoutes = require('./routes/surveys')
const questionRoutes = require('./routes/question')
const answerRoutes = require('./routes/answer')
const responseRoutes = require('./routes/response')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', surveyRoutes)
app.use('/api', questionRoutes)
app.use('/api', answerRoutes)
app.use('/api', responseRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})