const ActivityModel = require('../models/Activity.model')

async function createActivity(req, res) {

    const { title } = req.body

    if (!title) {
        return res.status(404).json({
            message: "Title is required"
        })
    }

    const activity = await ActivityModel.create({
        title,
        author: req.user._id
    })

    return res.status(200).json({
        message: "Activity created successfully",
        activity
    })
}

async function getActivity(req, res) {

    const activity = await ActivityModel.find({
        author: req.user._id
    })

    return res.status(200).json({
        message: "Activities fetched successfully",
        activity
    })
}

async function deleteActivity(req, res) {

    const id = req.params.id

    const activity = await ActivityModel.findOneAndDelete({
        _id: id,
        author: req.user._id
    })

    if (!activity) {
        return res.status(401).json({
            message: "Unauthorized or activity not found"
        })
    }

    return res.status(200).json({
        message: "Activity deleted successfully"
    })
}

module.exports = {
    createActivity,
    getActivity,
    deleteActivity
}