const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout');
const { verify } = require("../auth");

// Get all workouts for the logged-in user
router.get('/all', verify, workoutController.getMyWorkouts);

// Add a new workout
router.post('/', verify, workoutController.addWorkout);

// Update a workout
router.put('/:id', verify, workoutController.updateWorkout);

// Delete a workout
router.delete('/:id', verify, workoutController.deleteWorkout);

// Complete workout status
router.put('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);

module.exports = router;
