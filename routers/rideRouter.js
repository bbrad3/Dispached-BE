const express = require('express')
const rideRouter = express.Router()

const rideController = require('../controllers/rideController')

rideRouter.post('/', rideController.new)
rideRouter.get('/', rideController.getAll)
rideRouter.put('/:rideId', rideController.assignRide)

module.exports = rideRouter