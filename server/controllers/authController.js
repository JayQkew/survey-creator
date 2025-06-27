const User = require('../models/User')

const login = (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({error: 'Email and password are required'})
    }

    User.findByCredentials(username, password, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password'})
        }
        res.json(results[0])
    })
}

const signup = (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password){
        return res.status(400).json({ error: 'username, email, and password are required'})
    }

    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length > 0){
            return res.status(409).json({ error: 'Email already exists'})
        }

        User.create({username, email, password}, (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({
                message: 'User create successfully',
                id: result.insertId
            })
        })
    })
}

module.exports = { 
    login, 
    signup 
}