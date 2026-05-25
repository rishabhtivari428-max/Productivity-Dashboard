const express = require('express')
const ActivityRouter = express.Router()
const { createActivity, getActivity, deleteActivity } = require('../controllers/activity.controller')
const identifyUser = require('../middlewares/auth.middleware')

ActivityRouter.post('/create', identifyUser, createActivity)

ActivityRouter.get('/get', identifyUser, getActivity)

ActivityRouter.delete('/delete/:id', identifyUser, deleteActivity)

module.exports = ActivityRouter

