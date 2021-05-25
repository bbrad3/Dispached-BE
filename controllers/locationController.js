const models = require('../models')
const { location } = models

const locationController = {}

locationController.new = async (req, res) => {
    try {
        const [newLocation, created] = await location.findOrCreate({
            where: {
                name: req.body.name,
            },
            defaults: {
                address: req.body.address,
                type: req.body.type
            }
        })

        res.status(200).json({
            message: 'New location created',
            location: newLocation,
            created
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not create location',
            error
        })
    }
}

locationController.getAll = async (req, res) => {
    try {
        const foundLocations = await location.findAll({})
        // console.log('foundLocations', foundLocations);
        res.status(200).json({
            message: 'Here are all locations',
            locations: foundLocations
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not get all locations',
            error
        }) 
    }
}

locationController.getOne = async (req, res) => {
    try {
        const foundLocation = await location.findOne({
            where: {
                id: req.params.locationId
            }
        })

        res.status(200).json({
            message: 'Here is one location',
            location: foundLocation
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could get single location',
            error
        }) 
    }
}

locationController.update = async (req, res) => {
    try {
        const foundLocation = await location.findOne({
            where: {
                id: req.params.locationId
            }
        })

        const updatedLocation = await foundLocation.update(req.body)

        res.status(200).json({
            message: 'Location updated',
            location: updatedLocation
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not update single location',
            error
        }) 
    }
}

locationController.delete = async (req, res) => {
    try {
        const foundLocation = await location.findOne({
            where: {
                id: req.params.locationId
            }
        })

        const deletedLocation = await foundLocation.destroy()

        res.status(200).json({
            message: 'Location destroyed',
            location: deletedLocation
        })        
    } catch (error) {
        res.status(400).json({
            message: 'Could not delete single location',
            error
        }) 
    }
}

module.exports = locationController