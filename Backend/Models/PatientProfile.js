const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150']
    },
    disease: {
        type: String,
        required: [true, 'Disease/condition is required'],
        trim: true,
        maxlength: [200, 'Disease description cannot exceed 200 characters']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        ref: 'Credential'
    },
    community: {
        type: String,
        required: true,
        default: 'general',
        trim: true
    },
    medicalHistory: [{
        condition: String,
        diagnosedDate: Date,
        notes: String
    }],
    allergies: [String],
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date
    }]
}, {
    timestamps: true
});

// Index for faster queries
patientProfileSchema.index({ username: 1 });
patientProfileSchema.index({ community: 1 });

module.exports = mongoose.model('PatientProfile', patientProfileSchema);