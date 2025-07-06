const db = require('../config/database')

class Question{
    static create(questionData, callback){
        const { survey_id, type, text } = questionData
        db.query(
            'INSERT INTO question (survey_id, type, text) VALUES (?, ?, ?)',
            [survey_id, type, text],
            callback
        )
    }

    static update(questionData, callback){
        const {id, text, type } = questionData
        db.query(
            'UPDATE question SET text = ?, type = ? WHERE id = ?',
            [text, type, id],
            callback
        )
    }

    static delete(questionId, callback){
        db.query(
            'DELETE FROM question WHERE id = ?',
            [questionId],
            callback
        )
    }
    
    static deleteBySurveyId(surveyId, callback){
        db.query(
            'DELETE FROM question WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }

    static findBySurveyId(surveyId, callback){
        db.query(
            'SELECT * FROM question WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }

    static findById(questionId, callback){
        db.query(
            'SELECT * FROM question WHERE id = ?',
            [questionId],
            callback
        )
    }
}

module.exports = Question