const express = require('express')
const NotesRouter = express.Router()
const { createNotes, getNotes, updateNotes, deleteNotes } = require('../controllers/notes.Controller')
const identifyUser = require('../middlewares/auth.middleware')

NotesRouter.post("/create", identifyUser, createNotes)

NotesRouter.get("/get", identifyUser, getNotes)

NotesRouter.patch("/update/:id", identifyUser, updateNotes)

NotesRouter.delete("/delete/:id", identifyUser, deleteNotes)

module.exports = NotesRouter