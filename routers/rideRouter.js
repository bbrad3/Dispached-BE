const express = require('express')
const rideRouter = express.Router()

const rideController = require('../controllers/rideController')

rideRouter.post('/', rideController.new)
// rideRouter.put('/:rideId', rideController.update)

module.exports = rideRouter