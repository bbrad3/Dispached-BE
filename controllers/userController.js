const models = require('../models')
const { user } = models
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {}



module.exports = userController