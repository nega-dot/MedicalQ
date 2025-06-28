const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Doctor must be at least 18 years old'],
        max: [100, 'Age cannot exceed 100']
    },
    specialty: {
        type: String,
        required: [true, 'Specialty is required'],
        trim: true,
        enum: [
            'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
            'Hematology', 'Infectious Disease', 'Nephrology', 'Neurology',
            'Oncology', 'Ophthalmology', 'Orthopedics', 'Pediatrics',
            'Psychiatry', 'Pulmonology', 'Radiology', 'Surgery',
            'Urology', 'General Medicine', 'Emergency Medicine', 'Other'
        ]
    },
    authentication_token: {
        type: String,
        required: [true, 'Authentication token is required'],
        unique: true,
        trim: true
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
    isVerified: {
        type: Boolean,
        default: false
    },
    licenseNumber: {
        type: String,
        trim: true
    },
    experience: {
        type: Number,
        min: [0, 'Experience cannot be negative']
    }
}, {
    timestamps: true
});

// Index for faster queries
doctorProfileSchema.index({ username: 1 });
doctorProfileSchema.index({ specialty: 1 });
doctorProfileSchema.index({ community: 1 });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
