const db = require('../config/database')

class Answer{
    static create(answerData, callback){
        const { user_id, question_id, survey_id } = answerData
        db.query(
            'INSERT INTO answer '
        )
    }
}

module.exports = Answer