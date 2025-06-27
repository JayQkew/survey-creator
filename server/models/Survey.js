const db = require('../config/database')

class Survey{
    static create(surveyData, callback){
        const { surveyorId, date, description = ""} = surveyData
        db.query(
            'INSERT INTO surveys (surveyor_id, date, description) VALUES (?, ?, ?)',
            [surveyorId, date, description],
            callback
        )
    }

    static update(surveyData, callback){
        const { surveyId, title, description } = surveyData
        db.query(
            'UPDATE surveys SET title = ?, description = ? WHERE id = ?',
            [title, description, surveyId],
            callback
        )
    }

    static delete(surveyId, callback){
        db.query(
            'DELETE FROM surveys WHERE id = ?',
            [surveyId],
            callback
        )
    }

    static findByUserId(userId, callback){
        db.query(
            'SELECT * FROM surveys WHERE surveyor_id = ?',
            [userId],
            callback
        )
    }

    static findById(surveyId, callback){
        db.query(
            'SELECT * FROM surveys WHERE id = ?',
            [surveyId],
            callback
        )
    }

    static async findWithQuestions(userId) {
        return new Promise((resolve, reject) => {
            this.findByUserId(userId, async (err, surveys) => {
                if (err) return reject(err)

                try {
                    const surveysWithQuestions = await Promise.all(
                        surveys.map(survey => this.attachQuestions(survey))
                    )
                    resolve(surveysWithQuestions)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }

    static attachQuestions(survey) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM questions WHERE survey_id = ?',
                [survey.id],
                (err, questions) => {
                    if (err) return reject(err)
                    survey.questions = questions
                    resolve(survey)
                }
            )
        })
    }
}