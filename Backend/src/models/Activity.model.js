const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const ActivityModel = mongoose.model("activity", ActivitySchema)

module.exports = ActivityModel