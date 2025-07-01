const db = require('../config/database')

class Response{
    static create(responseData , callback){
        const { user_id, question_id, survey_id } = responseData
        db.query(
            'INSERT INTO response (question_id, user_id, survey_id) VALUES (?, ?, ?)',
            [question_id, user_id, survey_id],
            callback
        )
    }

    static findByUser(user_id, callback){
        db.query(
            'SELECT * FROM response WHERE user_id = ?',
            [user_id],
            callback
        )
    }

    static findByQuestion(question_id, callback){
        db.query(
            'SELECT * FROM response WHERE question_id = ?',
            [question_id],
            callback
        )
    }

    static findBySurvey(survey_id, callback){
        db.query(
            'SELECT * FROM response WHERE survey_id = ?',
            [survey_id],
            callback
        )
    }
}

module.exports = Response