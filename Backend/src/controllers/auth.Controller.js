const express = require('express')
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')

const useSecureCookies =
  process.env.NODE_ENV === "production" ||
  process.env.FRONTEND_URL?.startsWith("https://");

const cookieOptions = {
  httpOnly: true,
  secure: useSecureCookies,
  sameSite: useSecureCookies ? "none" : "lax",
  maxAge: 3 * 24 * 60 * 60 * 1000,
};

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

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        return res
            .status(201)
            .cookie('accessToken', accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                message: "User registered successfully",
                user:{
                    id: user._id,
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

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        return res
            .status(200)
            .cookie('accessToken', accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .json({
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    emai: user.email
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

async function generateNewAccessToken(req, res) {
    const refreshToken = req.cookies?.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await UserModel.findById(decoded.userId)

    if(!user){
        return res.status(401).json({
            message: "Invalid or revoked refresh token"
        })
    }

    const newAccessToken = generateAccessToken(user._id)

    return res.
        status(200)
        .cookie('accessToken', newAccessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000
        })
        .json({
            message: "Access Token generated successfully"
        })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    generateNewAccessToken
}