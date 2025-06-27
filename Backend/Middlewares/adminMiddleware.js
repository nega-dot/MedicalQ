const adminMiddleware = (req, res, next) => {
  try {
    // Check if user exists (should be attached by authMiddleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required. Insufficient permissions.'
      });
    }

    // Check if admin account is active
    if (!req.user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Admin account is deactivated'
      });
    }

    // Optional: Check if admin is verified (if your system requires admin verification)
    if (req.user.isVerified === false) {
      return res.status(403).json({
        success: false,
        message: 'Admin account is not verified'
      });
    }

    // Admin verification passed, proceed to the next middleware/controller
    next();

  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during admin verification'
    });
  }
};

module.exports = adminMiddleware;