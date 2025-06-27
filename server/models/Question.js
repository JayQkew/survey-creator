const db = require('../config/database')

class Question{
    static create(quesitonData, callback){
        const { surveyId, type, typeDetail, quesitonText } = quesitonData
        db.query(
            'INSERT INTO questions (survey_id, type, type_detail, question_text) VALUES (?, ?, ?, ?)',
            [surveyId, type, typeDetail, quesitonText],
            callback
        )
    }

    static update(questionData, callback){
        const {questionId, questionText, type, typeDetail } = questionData
        db.query(
            'UPDATE questions SET question_text = ?, type = ?, type_detail = ? WHERE id = ?',
            [questionText, type, typeDetail, questionId],
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