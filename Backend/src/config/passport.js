const UserModel = require('../models/User.model')
const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const googleEmail = profile.emails?.[0]
        const email = googleEmail?.value
        const isVerified = googleEmail?.verified === true || profile._json?.email_verified === true

        if (!email || !isVerified) {
            return done(new Error('Google account must provide a verified email address'), null)
        }

        let user = await UserModel.findOne({ googleId: profile.id })

        if(!user){
            user = await UserModel.findOne({ email })

            if(user){
                user.googleId = profile.id
                user.authProvider = 'google'
                await user.save()
                console.log('Google linked to existing account: ', user.email)
            }
            else{
                user = await UserModel.create({
                    googleId: profile.id,
                    username: profile.displayName || email.split('@')[0],
                    email,
                    authProvider: 'google'
                })
                console.log('New user registered via Google: ', user.email)
            }
        } else{
            console.log('Existing user logged in via Google: ', user.email)
        }
        return done(null, user)
    } catch (error) {
        console.log('Error in Google Strategy: ', error)
        return done(error, null)
    }
}))

module.exports = passport