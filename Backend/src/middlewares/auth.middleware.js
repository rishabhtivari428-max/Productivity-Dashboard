const UserModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next){
    try {
        const token = req.cookies.accessToken

        if(!token){
            return res.status(401).json({
                message: "Unauthorized access, no access token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await UserModel.findById(decoded.userId)

        if(!user){
            return res.status(401).json({
                message: "Unauthorized access, user not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}

module.exports = identifyUser