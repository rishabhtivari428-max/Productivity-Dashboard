const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')
const NotesRouter = require('../src/routes/notes.routes')
const ActivityRouter = require('../src/routes/activity.routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "https://productivitydashboardslash.netlify.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.options(/.*/, cors());

app.use("/api/auth", authRouter)
app.use("/api/notes", NotesRouter)
app.use('/api/activity', ActivityRouter)

module.exports = app