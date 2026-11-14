const express = require('express')
const authRouter = express.Router()
const { registerUser, loginUser, getMe, generateNewAccessToken, logoutUser, googleAuthCallback } = require('../controllers/auth.Controller')
const identifyUser = require('../middlewares/auth.middleware')
const passport = require('../config/passport')
const crypto = require('crypto')

authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)

authRouter.get('/getme', identifyUser, getMe)

authRouter.post('/refresh-token', generateNewAccessToken)

authRouter.post('/logout', logoutUser)

authRouter.get('/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=GoogleAuthFailed`
    }),
    googleAuthCallback
);

module.exports = authRouter