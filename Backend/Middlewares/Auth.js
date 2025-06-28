const { auth } = require('../config/firebase');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      });
    }

    const token = authHeader.substring(7); 

    const decodedToken = await auth.verifyIdToken(token);
    
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found in database'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    req.user = user;
    req.decodedToken = decodedToken;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired'
      });
    }
    
    if (error.code === 'auth/id-token-revoked') {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

const requireDoctor = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== 'doctor') {
    return res.status(403).json({
      success: false,
      message: 'Doctor access required'
    });
  }

  next();
};

const requireVerifiedDoctor = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== 'doctor') {
    return res.status(403).json({
      success: false,
      message: 'Doctor access required'
    });
  }

  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Doctor verification required'
    });
  }

  next();
};

const requirePatient = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role !== 'user') {
    return res.status(403).json({
      success: false,
      message: 'Patient access required'
    });
  }

  next();
};

const requireOwnershipOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  const resourceUserId = req.params.userId || req.body.userId;
  
  if (req.user._id.toString() === resourceUserId || req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. You can only access your own resources.'
  });
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decodedToken = await auth.verifyIdToken(token);
    
    const user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (user && user.isActive) {
      req.user = user;
      req.decodedToken = decodedToken;
    }
    
    next();
  } catch (error) {
    next();
  }
};

const rateLimitAuth = (req, res, next) => {
  next();
};

module.exports = {
  verifyToken,
  requireDoctor,
  requireVerifiedDoctor,
  requirePatient,
  requireOwnershipOrAdmin,
  optionalAuth,
  rateLimitAuth
};