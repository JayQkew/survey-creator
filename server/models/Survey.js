const db = require('../config/database')

class Survey{
    static create(callback){
        db.query(
            'INSERT INTO survey VALUES ()',
            callback
        )
    }

    static update(surveyData, callback){
        const { id, title, description } = surveyData
        db.query(
            'UPDATE survey SET title = ?, description = ? WHERE id = ?',
            [title, description, id],
            callback
        )
    }

    static delete(surveyId, callback){
        db.query(
            'DELETE FROM survey WHERE id = ?',
            [surveyId],
            callback
        )
    }

    static findById(surveyId, callback){
        db.query(
            'SELECT * FROM survey WHERE id = ?',
            [surveyId],
            callback
        )
    }
}

module.exports = Survey