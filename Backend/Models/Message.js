const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: [true, 'Answer text is required'],
        trim: true,
        maxlength: [2000, 'Answer cannot exceed 2000 characters']
    },
    doctor_username: {
        type: String,
        required: [true, 'Doctor username is required'],
        trim: true,
        ref: 'DoctorProfile'
    },
    time: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    _id: true
});

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'Message text is required'],
        trim: true,
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    sender: {
        type: String,
        required: [true, 'Sender username is required'],
        trim: true,
        ref: 'PatientProfile'
    },
    community: {
        type: String,
        required: [true, 'Community is required'],
        trim: true,
        default: 'general'
    },
    type: {
        type: String,
        required: true,
        enum: ['question', 'announcement', 'discussion'],
        default: 'question'
    },
    answers: [answerSchema],
    time: {
        type: String,
        required: true,
        default: () => new Date().toISOString(),
        unique: true // Used as message_id in your code
    },
    tags: [String],
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    isResolved: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
messageSchema.index({ community: 1, time: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ type: 1 });
messageSchema.index({ time: 1 }, { unique: true });

// Virtual for answer count
messageSchema.virtual('answerCount').get(function() {
    return this.answers.length;
});

// Method to add answer
messageSchema.methods.addAnswer = function(answerData) {
    this.answers.push(answerData);
    return this.save();
};

// Method to mark as resolved
messageSchema.methods.markResolved = function() {
    this.isResolved = true;
    return this.save();
};

module.exports = mongoose.model('Message', messageSchema);