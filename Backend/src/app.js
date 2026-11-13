const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')
const NotesRouter = require('../src/routes/notes.routes')
const ActivityRouter = require('../src/routes/activity.routes')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "https://productivity-dashboard-4.onrender.com", "http://localhost:8080"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}))

app.use(express.static(path.join(__dirname, '../client/build')));

app.options(/.*/, cors());

app.use(express.static(path.join(__dirname, '../client/dist')))

app.use("/api/auth", authRouter)
app.use("/api/notes", NotesRouter)
app.use('/api/activity', ActivityRouter)

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

module.exports = app