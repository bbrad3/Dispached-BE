const express = require('express')
const app = express()

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    routesReport.print()
})