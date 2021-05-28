const models = require('../models')
const { ride, location, shift } = models
const { Op } = require("sequelize")

const rideController = {}

rideController.new = async (req, res) => {
    try {
        let pickup = null
        let dropoff = null
        let pickupCustom = null
        let dropoffCustom = null

        const foundPickup = await location.findOne({
            where: {
                name: req.body.pickup
            }
        })
        // console.log('foundPickup', foundPickup.id, req.body.dropoff);    
        const foundDropoff = await location.findOne({
            where: {
                name: req.body.dropoff
            }
        })
        // console.log('foundDropoff', foundDropoff.id);
        if (foundPickup) {
            pickup = foundPickup.id
        } else {
            pickupCustom = req.body.pickup
        }
        if (foundDropoff) {
            dropoff = foundDropoff.id
        } else {
            dropoffCustom = req.body.dropoff
        }
        // console.log('new ride', pickup, dropoff, pickupCustom, dropoffCustom);

        const newRide = await ride.create({
            status: 'pending',
            pickupId: pickup,
            dropoffId: dropoff,
            pickupCustom: pickupCustom,
            dropoffCustom: dropoffCustom,
            passengers: req.body.passengers,
            callerName: req.body.callerName,
            room: req.body.room,
            shiftId: null
        })

        res.status(200).json({
            message: 'New ride created',
            ride: newRide,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not create ride'
        })
    }
}

rideController.getAll = async (req, res) => {
    try {
        let today_start = new Date().setHours(0,0,0,0)
        const foundRides = await ride.findAll({
            where: {
                createdAt: {[Op.gt]: today_start}
            },
            include: [{
                model: location,
                as: 'pickupLocation'
            },
            {
                model: location,
                as: 'dropoffLocation'
            }]
        })

        res.status(200).json({
            message: 'Here are all rides',
            rides: foundRides
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not get all rides',
            error
        })
    }
}

rideController.getDriverRides = async (req, res) => {
    try {
        const foundRides = await ride.findAll({
            where: {
                shiftId: req.params.shiftId
            },
            include: [
                {
                    model: location,
                    as: 'pickupLocation',
                    required: false
                },
                {
                    model: location,
                    as: 'dropoffLocation',
                    required: false
                }
            ]
        })

        res.status(200).json({
            message: 'Here are the drivers rides',
            rides: foundRides
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not get driver rides',
            error
        })
    }
}

rideController.assignRide = async (req, res) => {
    try {
        console.log(req.params.rideId, req.body.shiftId);
        const foundRide = await ride.findOne({
            where: {
                id: req.params.rideId
            }
        })
        const foundShift = await shift.findOne({
            where: {
                id: req.body.shiftId
            }
        })
        // console.log(foundRide.dataValues, foundShift.dataValues);
        const updatedRide = await foundRide.update({
            shiftId: foundShift.id,
            status: 'assigned'
        })
        // console.log('updatedRide', updatedRide);
        res.status(200).json({
            message: 'Ride associated with shift',
            ride: updatedRide
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not assign driver to ride'
        })
    }
}

module.exports = rideController