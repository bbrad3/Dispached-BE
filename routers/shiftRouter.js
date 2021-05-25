const express = require('express')
const shiftRouter = express.Router()

const shiftController = require('../controllers/shiftController')

shiftRouter.post('/', shiftController.startShift)
shiftRouter.get('/', shiftController.currentShift)

module.exports = shiftRouter