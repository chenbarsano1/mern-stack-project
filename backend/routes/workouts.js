import express from 'express'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from '../controllers/workoutContoller.js'
import { requireAuth } from '../middleware/requireauth.js'

const router = express.Router()

// protecting the other API routes - require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getWorkouts)
 
// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

export default router