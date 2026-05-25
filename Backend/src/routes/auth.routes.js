const express = require('express')
const authRouter = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/auth.Controller')
const authMiddleware = require('../middlewares/auth.middleware')
const identifyUser = require('../middlewares/auth.middleware')

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.get('/getme', identifyUser, getMe)

module.exports = authRouter