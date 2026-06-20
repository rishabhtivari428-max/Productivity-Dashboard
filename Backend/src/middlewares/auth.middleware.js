const UserModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next) {
    let token = req.cookies.token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } 
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access - No token provided"
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const user = await UserModel.findOne({ _id: decoded.id })
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access - User not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = identifyUser