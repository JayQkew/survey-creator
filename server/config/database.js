const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mojo_surveys'
})

db.connect((err) => {
    if(err) {
        console.error('Error connecting to database: ', err)
        return
    }
    console.log('Connected to database: ' + db.config.database)
})

module.exports = db