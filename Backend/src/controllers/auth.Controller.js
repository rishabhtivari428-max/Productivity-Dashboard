const express = require('express')
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(409).json({
                message: "All fields are required"
            })
        }

        const isAlreadyExists = await UserModel.findOne({ email })

        if (isAlreadyExists) {
            return res.status(403).json({
                message: "User already exists with same E-Mail or Username"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
        })

        res.status(200).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while Registering the User",
            error: error.message
        })
    }


}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "User Logged in successfully",
            user: {
                username: user.username,
                email: user.email
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error while Logging User In",
            error: error.message
        })
    }
}

async function getMe(req, res) {
    try {
        const userId = req.user.id

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}