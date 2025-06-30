const db = require('../config/database')

class Survey{
    static create(surveyData, callback){
        const { surveyorId, date } = surveyData
        db.query(
            'INSERT INTO survey (surveyor_id, date, description) VALUES (?, ?, ?)',
            [surveyorId, date, ""],
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

    static findByUserId(userId, callback){
        db.query(
            'SELECT * FROM survey WHERE surveyor_id = ?',
            [userId],
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

    static async updateBatch(surveyId, questions) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedQuestions = []

                // Process each question (update existing or create new)
                const processPromises = questions.map((q, i) => {
                    return new Promise((resolve, reject) => {
                        if (typeof q.id === 'number') {
                            // Update existing question
                            this.update(q.id, {
                                questionText: q.question_text,
                                type: q.type,
                                typeDetail: q.type_detail
                            }, (err, result) => {
                                if (err) return reject(err)
                                updatedQuestions[i] = { ...q, id: q.id }
                                resolve(result)
                            })
                        } else {
                            // Create new question
                            this.create({
                                surveyId: surveyId,
                                type: q.type,
                                typeDetail: q.type_detail,
                                questionText: q.question_text
                            }, (err, result) => {
                                if (err) return reject(err)
                                updatedQuestions[i] = { ...q, id: result.insertId }
                                resolve(result)
                            })
                        }
                    })
                })

                await Promise.all(processPromises)

                // Get all current questions to find ones to delete
                this.findBySurveyId(surveyId, async (err, allQuestions) => {
                    if (err) return reject(err)

                    const currentIds = updatedQuestions.map(q => q.id)
                    const questionsToDelete = allQuestions.filter(q => !currentIds.includes(q.id))

                    // Delete removed questions
                    const deletePromises = questionsToDelete.map(q => {
                        return new Promise((resolve, reject) => {
                            this.delete(q.id, (err, result) => {
                                if (err) return reject(err)
                                resolve(result)
                            })
                        })
                    })

                    await Promise.all(deletePromises)

                    // Return final questions
                    this.findBySurveyId(surveyId, (err, finalQuestions) => {
                        if (err) return reject(err)
                        resolve(finalQuestions)
                    })
                })

            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = Survey