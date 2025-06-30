const db = require('../config/database')

class Admin{
    static create(adminData, callback){
        const { userId, surveyId, roleId } = adminData
        db.query(
            'INSERT INTO admin (user_id, survey_id, role_id) VALUESV(?, ?, ?)',
            [userId, surveyId, roleId],
            callback
        )
    }

    static delete(adminId, callback){
        db.query(
            'DELETE FROM admin WHERE id = ?',
            [adminId],
            callback
        )
    }

    static deleteWithSurvey(surveyId, callback){
        db.query(
            'DELETE FROM admin WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }

    static update(adminData, callback){
        const { id, role_id } = adminData
        db.query(
            'UPDATE admin SET role_id = ?, WHERE id = ?',
            [role_id, id],
            callback
        )
    }

    static getUsers(surveyId, callback){
        db.query(
            'SELECT * FROM admin WHERE survey_id = ?',
            [surveyId],
            callback
        )
    }

    static getSurveys(userId, callback){
        db.query(
            'SELECT * FROM admin WHERE user_id = ?',
            [userId],
            callback
        )
    }
}

module.exports = Admin