const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    unsubscribedAt: {
        type: Date,
        default: null
    },
    preferences: {
        healthTips: {
            type: Boolean,
            default: true
        },
        medicalNews: {
            type: Boolean,
            default: true
        },
        hospitalUpdates: {
            type: Boolean,
            default: true
        },
        eventNotifications: {
            type: Boolean,
            default: true
        }
    },
    source: {
        type: String,
        enum: ['website', 'mobile_app', 'social_media', 'referral', 'other'],
        default: 'website'
    },
    ipAddress: {
        type: String,
        default: null
    },
    userAgent: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// Indexes for better performance
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ isActive: 1 });
newsletterSchema.index({ subscribedAt: -1 });

// Methods
newsletterSchema.methods.unsubscribe = function() {
    this.isActive = false;
    this.unsubscribedAt = new Date();
    return this.save();
};

newsletterSchema.methods.resubscribe = function() {
    this.isActive = true;
    this.subscribedAt = new Date();
    this.unsubscribedAt = null;
    return this.save();
};

// Static methods
newsletterSchema.statics.getActiveSubscribers = function() {
    return this.find({ isActive: true });
};

newsletterSchema.statics.getSubscriptionStats = function() {
    return this.aggregate([
        {
            $group: {
                _id: null,
                totalSubscribers: { $sum: 1 },
                activeSubscribers: {
                    $sum: {
                        $cond: [{ $eq: ['$isActive', true] }, 1, 0]
                    }
                },
                inactiveSubscribers: {
                    $sum: {
                        $cond: [{ $eq: ['$isActive', false] }, 1, 0]
                    }
                }
            }
        }
    ]);
};

module.exports = mongoose.model('Newsletter', newsletterSchema);