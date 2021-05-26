const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT']
    }
})

const routesReport = require('rowdy-logger').begin(app)

// MIDDLEWARE
app.use(express.json())
app.use(require('morgan')('dev'))
app.use(require('cors')())
require('dotenv').config()

// ROUTES
const userRouter = require('./routers/userRouter')
app.use('/user', userRouter)

const locationRouter = require('./routers/locationRouter')
app.use('/location', locationRouter)

const rideRouter = require('./routers/rideRouter')
app.use('/ride', rideRouter)

const shiftRouter = require('./routers/shiftRouter')
app.use('/shift', shiftRouter)

io.on('connection', socket => {
    console.log('io connected', socket.id)
    io.on('driver_active', (shift) => {
        console.log('driver_active shift', shift);
    })

    socket.on('disconnect', () => {
        console.log('io disconnected');
    })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    routesReport.print()
})
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     routesReport.print()
// })