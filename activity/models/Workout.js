const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
}, { versionKey: '__v' });

module.exports = mongoose.model('Workout', workoutSchema);
