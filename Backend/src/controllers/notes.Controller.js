const NotesModel = require('../models/Notes.model')

async function createNotes(req, res) {
    const { title, content } = req.body

    if (!title || !content) {
        return res.status(404).json({
            message: "All fields are required"
        })
    }

    const note = await NotesModel.create({
        title,
        content,
        author: req.user._id
    })

    return res.status(200).json({
        message: "Note create successfully",
        note
    })
}

async function getNotes(req, res) {
    const notes = await NotesModel.find({ author: req.user._id })

    return res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
}

async function deleteNotes(req, res) {
    const id = req.params.id

    const note = await NotesModel.findByIdAndDelete({ _id: id, author: req.user._id })

    if (!note) {
        return res.status(401).json({
            message: "Unanthorized or Note not found"
        })
    }

    return res.status(200).json({
        message: "Note deleted successfully"
    })
}

async function updateNotes(req, res) {
    const id = req.params.id
    const { title, content } = req.body

    const note = await NotesModel.findByIdAndUpdate({ _id: id, author: req.user._id }, { title, content }, { new: true })

    if (!note) {
        return res.status(401).json({
            message: "Unauthorized or Note not found"
        })
    }

    return res.status(200).json({
        message: "Note updated successfully",
        note
    })
}

module.exports = {
    createNotes,
    getNotes,
    deleteNotes,
    updateNotes
}