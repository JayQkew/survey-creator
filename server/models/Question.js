const db = require('../config/database')

class Question{
    static create(questionData, callback){
        const { surveyId, type, typeDetail, questionText } = questionData
        db.query(
            'INSERT INTO questions (survey_id, type, type_detail, question_text) VALUES (?, ?, ?, ?)',
            [surveyId, type, typeDetail, questionText],
            callback
        )
    }

    static update(questionData, callback){
        const {id, question_text, type, type_detail } = questionData
        db.query(
            'UPDATE questions SET question_text = ?, type = ?, type_detail = ? WHERE id = ?',
            [question_text, type, type_detail, id],
            callback
        )
    }

    static delete(questionId, callback){
        db.query(
            'DELETE FROM questions WHERE id = ?',
            [questionId],
            callback
        )
    }
    
    static deleteBySurveyId(surveyId, callback){
        db.query(
            'DELETE FROM questions WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }

    static findBySurveyId(surveyId, callback){
        db.query(
            'SELECT * FROM questions WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }
}

module.exports = Question