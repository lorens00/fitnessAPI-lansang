const Workout = require('../models/Workout');

// Get all workouts for the logged-in user
exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id }).select('_id userId name duration status dateAdded __v');
        res.status(200).json({ workouts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new workout
exports.addWorkout = async (req, res) => {
    const { name, duration, status } = req.body;
    try {
        const newWorkout = new Workout({
            userId: req.user.id,
            name,
            duration,
            status,
            dateAdded: new Date()
        });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, duration, status } = req.body;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            id,
            { name, duration, status },
            { new: true }
        );
        res.status(200).json({
            message: "Workout updated successfully",
            updatedWorkout: {
                _id: updatedWorkout._id,
                userId: updatedWorkout.userId,
                name: updatedWorkout.name,
                duration: updatedWorkout.duration,
                status: updatedWorkout.status,
                dateAdded: updatedWorkout.dateAdded,
                __v: updatedWorkout.__v
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        await Workout.findByIdAndDelete(id);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Complete workout status
exports.completeWorkoutStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            id,
            { status: 'complete' },
            { new: true }
        );
        res.status(200).json(updatedWorkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
