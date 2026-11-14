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

        if (!user.password) {
            return res.status(400).json({
                message: "This account uses Google sign-in. Continue with Google."
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

async function generateNewAccessToken(req, res) {
    const refreshToken = req.cookies?.refreshToken

    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh token not found"
        })
    }

    let decoded
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        })
    }

    const user = await UserModel.findById(decoded.userId)

    if(!user || user.refreshToken !== refreshToken){
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

async function logoutUser(req, res) {
    const refreshToken = req.cookies?.refreshToken

    try {
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const user = await UserModel.findById(decoded.userId)

                if (user?.refreshToken === refreshToken) {
                    user.refreshToken = undefined
                    await user.save()
                }
            } catch (error) {
                if (!(error instanceof jwt.JsonWebTokenError)) {
                    throw error
                }
            }
        }

        return res
            .clearCookie('accessToken', cookieOptions)
            .clearCookie('refreshToken', cookieOptions)
            .status(204)
            .end()
    } catch (error) {
        console.error("Error logging user out:", error)
        return res.status(500).json({
            message: "Error while logging out"
        })
    }
}

async function googleAuthCallback(req, res) {
  const frontendURL = (
    process.env.FRONTEND_URL || "http://localhost:5173"
  ).replace(/\/+$/, "");

  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `${frontendURL}/login?error=GoogleAuthFailed`
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .redirect(`${frontendURL}/dashboard`);

  } catch (error) {
    console.error("Error in Google OAuth callback:", error);

    return res.redirect(
      `${frontendURL}/login?error=ServerError`
    );
  }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    generateNewAccessToken,
    logoutUser,
    googleAuthCallback
}