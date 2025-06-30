const db = require('../config/database')

class Question{
    static create(questionData, callback){
        const { surveyId, type, typeDetail, questionText } = questionData
        db.query(
            'INSERT INTO question (survey_id, type, type_detail, text) VALUES (?, ?, ?, ?)',
            [surveyId, type, typeDetail, questionText],
            callback
        )
    }

    static update(questionData, callback){
        const {id, question_text, type, type_detail } = questionData
        db.query(
            'UPDATE question SET text = ?, type = ?, type_detail = ? WHERE id = ?',
            [question_text, type, type_detail, id],
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
}

module.exports = Question