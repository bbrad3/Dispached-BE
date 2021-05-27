const models = require('../models')
const { user, shift, shuttle, ride, location } = models
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

function socketIO(io) {
    io.on('connection', socket => {
        console.log('io connected', socket.id)
        // socket.room
        // socket.on('start_shift', async ({userId, shuttleNumber, radio}) => {
        //     // console.log('driver_active shift', userId, shuttleNumber, radio);
        //     // associate driver with shift
        //     try {
        //         const decryptedId = await jwt.verify(userId, process.env.JWT_SECRET)
        //         // console.log('decryptedId', decryptedId);
        //         const foundUser = await user.findOne({
        //             where: {
        //                 id: decryptedId.userId
        //             }
        //         })
        //         // console.log('user', foundUser.dataValues);
        //         // console.log('headers', req.headers);
        //         const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        //         const foundShuttle = await shuttle.findOne({
        //             where: {
        //                 number: shuttleNumber
        //             }
        //         })
        //         // console.log('shuttle', foundShuttle);
        
        //         const newShift = await shift.create({
        //             userId: foundUser.id,
        //             shuttleId: foundShuttle.id,
        //             radio: radio,
        //             shiftStart: new Date()
        //         })
        //         // console.log('shift created', newShift);
        //         socket.emit('shift_started', {
        //             shift: newShift,
        //             user: {...foundUser.dataValues, id: encryptedId},
        //             shuttle: foundShuttle
        //         })
        //     } catch (error) {
        //         socket.emit('shift_started', error)
        //     } 
        // })

        socket.on('end_shift', async ({id}) => {
            try {
                const foundShift = await shift.findOne({
                    where: {
                        id: id
                    }
                })
        
                const endedShift = await foundShift.update({
                    shiftEnd: new Date()
                })
                        
                socket.emit('shift_ended', {
                    shift: endedShift.dataValues
                })
            } catch (error) {
                socket.emit('shift_ended', {error})
            }
        })
        
        // socket.on('get_rides', async () => {
        //     try {
        //         // narrow search to todays rides only
        //         const foundRides = await ride.findAll({
        //             include: [{
        //                 model: location,
        //                 as: 'pickupLocation'
        //             },
        //             {
        //                 model: location,
        //                 as: 'dropoffLocation'
        //             }]
        //         })
        //         console.log('foundRides', foundRides);
        //         socket.emit('allRides', {rides: foundRides})
        //     } catch (error) {
        //         console.error(error);
        //         // socket.emit('allRides', error)
        //     }
        // })

        socket.on('assign_ride', async ({rideId, shiftId}) => {
            try {
                const foundRide = await ride.findOne({
                    where: {
                        id: rideId
                    }
                })
                const foundShift = await shift.findOne({
                    where: {
                        id: shiftId
                    }
                })
                // console.log(foundRide.dataValues, foundShift.dataValues);
                const updatedRide = await foundRide.update({
                    shiftId: foundShift.id,
                    status: 'assigned'
                })
                // console.log('updatedRide', updatedRide.dataValues);
                console.log('==============',
                    socket.adapter.rooms
                );
                socket.emit('ride_updated', {
                    ride: updatedRide
                })
                console.log('lakdjflkajsdlkfjlkafd...');
            } catch (error) {
                console.error(error);
            }
        })

        socket.on('rolling', async ({rideId}) => {
            try {
                const foundRide = await ride.findOne({
                    where: {
                        id: rideId
                    }
                })
                const updatedRide = await foundRide.update({
                    status: 'rolling'
                })
                socket.emit('ride_updated', {
                    ride: updatedRide
                })
            } catch (error) {
                console.error(error);
            }
        })

        socket.on('ride_complete', async ({rideId}) => {
            try {
                const foundRide = await ride.findOne({
                    where: {
                        id: rideId
                    }
                })
                const updatedRide = await foundRide.update({
                    status: 'complete'
                })
                socket.emit('ride_updated', {
                    ride: updatedRide
                })
            } catch (error) {
                console.error(error);
            }
        })

        socket.on('disconnect', () => {
            console.log('io disconnected');
        })
    })
}

module.exports = socketIO