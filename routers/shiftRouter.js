const express = require('express')
const shiftRouter = express.Router()

const shiftController = require('../controllers/shiftController')

shiftRouter.post('/', shiftController.startShift)
shiftRouter.get('/', shiftController.currentShift)
shiftRouter.get('/shuttles', shiftController.allShuttles)
shiftRouter.get('/started', shiftController.started)
shiftRouter.put('/end', shiftController.endShift)

module.exports = shiftRouter