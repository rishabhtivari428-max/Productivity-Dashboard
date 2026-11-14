const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'local'
        }
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    refreshToken:{
        type: String
    }
}, { timestamps: true })

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel