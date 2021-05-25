const models = require('../models')
const { user, shuttle, shift, ride } = models
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

const shiftController = {}

shiftController.startShift = async (req, res) => {
    try {
        // console.log(req.headers.authorization);
        const decryptedId = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // console.log('decryptedId', decryptedId);
        const foundUser = await user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        // console.log('user', foundUser.dataValues);
        // console.log('headers', req.headers);
        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)
        // console.log('shuttleNumber', req.headers.shuttlenumber);
        const foundShuttle = await shuttle.findOne({
            where: {
                number: req.headers.shuttlenumber
            }
        })
        // console.log('shuttle', foundShuttle);

        const newShift = await shift.create({
            userId: foundUser.id,
            shuttleId: foundShuttle.id,
            shiftStart: new Date()
        })

        res.status(200).json({
            message: 'Shift started',
            shift: newShift,
            user: {...foundUser.dataValues, id: encryptedId},
            shuttle: foundShuttle
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not start shift',
            error
        })
    }
}

shiftController.currentShift = async (req, res) => {
    try {
        const today_start = new Date().setHours(7,0,0,0)
        const now = new Date()

        const foundShifts = await shift.findAll({
            where: {
                shiftStart: {
                    [Op.gt]: today_start,
                    [Op.lt]: now
                }
            },
            include: [
                {
                    model: user,
                    required: false
                },
                {
                    model: shuttle,
                    required: false
                }
            ]
        })
        
        res.status(200).json({
            start: today_start,
            now,
            shifts: foundShifts
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not get current shift',
            error
        })
    }
}

module.exports = shiftController