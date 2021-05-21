const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.post('/', userController.new)
// userRouter.get('/', userController.getAll)
userRouter.post('/login', userController.login)
userRouter.get('/verify', userController.verify)
// userRouter.put('/:userId', userController.update)
// userRouter.delete('/:userId', userController.delete)

module.exports = userRouter