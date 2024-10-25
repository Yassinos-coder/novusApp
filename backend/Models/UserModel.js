const db = require('mongoose')


const UserSchema = db.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = db.model('users', UserSchema)
module.exports = UserModel