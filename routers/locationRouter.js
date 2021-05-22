const express = require('express')
const locationRouter = express.Router()

const locationController = require('../controllers/locationController')

locationRouter.post('/', locationController.new)
locationRouter.get('/', locationController.getAll)
locationRouter.get('/:locationId', locationController.getOne)
locationRouter.put('/:locationId', locationController.update)
locationRouter.delete('/:locationId', locationController.delete)

module.exports = locationRouter