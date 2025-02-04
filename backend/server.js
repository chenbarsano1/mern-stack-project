import express from 'express'
import workoutRoutes from './routes/workouts.js'
import mongoose from 'mongoose';

const port = process.env.PORT || 4000

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to db and listening on port ${port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

