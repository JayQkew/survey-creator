const db = require('../config/database')

class Answer{
    static create(answerData, callback){
        const { survey_id, value, created_by, question_id } = answerData
        db.query(
            'INSERT INTO answer (survey_id, value, created_by, updated_by, question_id) VALUES (?, ?, ?, ?, ?)',
            [survey_id, value, created_by, created_by, question_id],
            callback
        )
    }

    static update(answerData, callback){
        const { user_id, value, updated_by } = answerData
        db.query(
            'UPDATE answer SET value = ?, updated_by = ? WHERE id = ?',
            [value, updated_by, user_id],
            callback
        )
    }

    static delete(answer_id, callback){
        db.query(
            'DELETE FROM answer WHERE id = ?',
            [answer_id],
            callback
        )
    }

    static deleteByQuestion(question_id, callback){
        db.query(
            'DELETE FROM answer WHERE question_id = ?',
            [question_id],
            callback
        )
    }

    static deleteBySurvey(survey_id, callback){
        db.query(
            'DELETE FROM answer WHERE survey_id = ?',
            [survey_id],
            callback
        )
    }
}

module.exports = Answer