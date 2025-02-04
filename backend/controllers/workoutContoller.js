import express from 'express'
import Workout from '../models/workoutModel.js'
import mongoose from 'mongoose'

// get all workouts
export const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
export const getWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// create a workout
export const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message, emptyFields})
    }
}

// delete a workout
export const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json((workout))
}

// update a workout
export const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }
    // extract allowed fields from req.body
    const { title, reps, load } = req.body;
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (reps !== undefined) updatedFields.reps = reps;
    if (load !== undefined) updatedFields.load = load;

    const workout = await Workout.findByIdAndUpdate(id, updatedFields, {new: true})
    
    // const workout = await Workout.findByIdAndUpdate({_id: id}, {
    //     ...req.body
    // }, {new: true})
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json((workout))
}