const models = require('../models')
const { ride, location } = models

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
        const foundDropoff = await location.findOne({
            where: {
                name: req.body.dropoff
            }
        })

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
        console.log('new ride', pickup, dropoff, pickupCustom, dropoffCustom);

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

module.exports = rideController