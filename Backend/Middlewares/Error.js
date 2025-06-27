const logger = require('../utils/logger'); 

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = {
      message,
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = {
      message: message.join(', '),
      statusCode: 400
    };
  }

  // Firebase Auth errors
  if (err.code && err.code.startsWith('auth/')) {
    const firebaseErrorMessages = {
      'auth/email-already-exists': 'Email already exists',
      'auth/invalid-email': 'Invalid email format',
      'auth/weak-password': 'Password is too weak',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Invalid credentials',
      'auth/id-token-expired': 'Token has expired',
      'auth/id-token-revoked': 'Token has been revoked',
      'auth/invalid-id-token': 'Invalid token',
      'auth/user-disabled': 'User account has been disabled'
    };

    const message = firebaseErrorMessages[err.code] || 'Authentication error';
    error = {
      message,
      statusCode: err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' ? 401 : 400
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};