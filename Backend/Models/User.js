const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  // User role
  role: {
    type: String,
    enum: ['user', 'doctor'],
    default: 'user',
    required: true
  },
  
  // Doctor-specific fields
  specialization: {
    type: String,
    required: function() {
      return this.role === 'doctor';
    },
    enum: [
      'General Medicine',
      'Cardiology',
      'Dermatology',
      'Pediatrics',
      'Psychiatry',
      'Surgery',
      'Neurology',
      'Oncology'
    ]
  },
  
  profilePicture: {
    type: String,
    default: null
  },
  
  isVerified: {
    type: Boolean,
    default: function() {
      return this.role === 'user' ? true : false;
    }
  },
  
  licenseNumber: {
    type: String,
    required: function() {
      return this.role === 'doctor';
    },
    sparse: true
  },
  
  medicalCouncilRegistration: {
    type: String,
    required: function() {
      return this.role === 'doctor';
    },
    sparse: true
  },
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  lastLoginAt: {
    type: Date,
    default: null
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ specialization: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ createdAt: -1 });

userSchema.virtual('isDoctor').get(function() {
  return this.role === 'doctor';
});

userSchema.methods.canProvideMedicalAdvice = function() {
  return this.role === 'doctor' && this.isVerified && this.isActive;
};

userSchema.statics.findDoctorsBySpecialization = function(specialization) {
  return this.find({
    role: 'doctor',
    specialization: specialization,
    isVerified: true,
    isActive: true
  });
};

userSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

userSchema.pre('save', function(next) {
  if (this.role === 'doctor') {
    if (!this.specialization) {
      return next(new Error('Specialization is required for doctors'));
    }
    if (!this.licenseNumber) {
      return next(new Error('License number is required for doctors'));
    }
    if (!this.medicalCouncilRegistration) {
      return next(new Error('Medical council registration is required for doctors'));
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;