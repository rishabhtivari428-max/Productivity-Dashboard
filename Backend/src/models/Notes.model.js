const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const NotesModel = mongoose.model("notes", NotesSchema)

module.exports = NotesModel