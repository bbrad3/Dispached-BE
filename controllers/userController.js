const models = require('../models')
const { user, shuttle, shift } = models
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {}

userController.new = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
        const [newUser, created] = await user.findOrCreate({
            where: {
                email: req.body.email
            },
            defaults: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashedPassword,
                cdl: false,
                driver: false,
                dispatcher: false,
                admin: false
            }
        })

        const encryptedId = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET)

        res.status(200).json({
            message: 'New user created',
            user: {...newUser.dataValues, id: encryptedId}
        })
    } catch (error) {
        res.status(400).json({
            message: 'Create user error',
            error
        })
    }
}

userController.login = async (req, res) => {
    try {
        const foundUser = await user.findOne({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, foundUser.password)
        
        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        if (match) {
            res.status(200).json({
                message: 'User authenticated',
                user: {...foundUser.dataValues, id: encryptedId}
            })
        } else {
            res.status(401).json({
                message: 'Incorrect password'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Login error, check if email is correct',
            error
        })
    }
}

userController.verify = async (req, res) => {
    try {
        let encryptedId = req.headers.authorization
        // console.log('encryptedId', encryptedId);
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)
        // console.log(foundUser, encryptedId);
        if (foundUser) {
            res.status(200).json({
                message: 'Verified user',
                user: {...foundUser.dataValues, id: encryptedId}
            })
        } else {
            res.status(404).json({
                message: 'User not found, could not verify'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Could not verify user',
            error
        })
    }
}

userController.getOne = async (req, res) => {
    try {
        const decryptedId = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: decryptedId.userId
            }
        })

        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        if (foundUser) {
            res.status(200).json({
                message: 'User profile found',
                user: {...foundUser.dataValues, id: encryptedId}
            })
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Could not get single user',
            error
        })
    }
}

userController.update = async (req, res) => {
    try {
        const decryptedId = jwt.decode(req.params.userId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {
                id: decryptedId.userId
            }
        })
        console.log(foundUser.dataValues, req.body); 

        const updatedUser = await foundUser.update(req.body)

        const encryptedId = jwt.sign({userId: updatedUser.id}, process.env.JWT_SECRET)

        res.status(200).json({
            message: 'User updated',
            user: {...updatedUser.dataValues, id: encryptedId}
        })
    } catch (error) {
        res.status(400).json({
            message: 'Could not update single user',
            error
        })
    }
}

module.exports = userController