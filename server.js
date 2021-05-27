const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
require('dotenv').config()
const io = require('socket.io')(httpServer, {
    cors: {
        origin: process.env.FRONT_END_URL, // this needs to be a variable
        methods: ['GET', 'POST', 'PUT']
    }
})
const socketIO = require('./controllers/socket_io')

const routesReport = require('rowdy-logger').begin(app)

// MIDDLEWARE
app.use(express.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())

// ROUTES
const userRouter = require('./routers/userRouter')
app.use('/user', userRouter)

const locationRouter = require('./routers/locationRouter')
app.use('/location', locationRouter)

const rideRouter = require('./routers/rideRouter')
app.use('/ride', rideRouter)

const shiftRouter = require('./routers/shiftRouter')
app.use('/shift', shiftRouter)

socketIO(io) // this has access to all the on's and emit's

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    routesReport.print()
})
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     routesReport.print()
// })