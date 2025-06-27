const db = require('../config/database')

class User {
    static findByCredentials(username, password, callback){
        db.query(
            'SELECT * FROM users WHERE username = ? AND password_hash = ?',
            [username, password],
            callback
        )
    }

    static findByEmail(email, callback){
        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            callback
        )
    }

    static create(userData, callback){
        const { username, email, password } = userData
        db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, password],
            callback
        )
    }
}