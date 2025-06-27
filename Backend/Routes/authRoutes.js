// routes/authRoutes.js
const express        = require('express');
const router         = express.Router();
const AuthController = require('../controllers/authController');

// Pull out the specific middleware functions you need:
const {
  verifyToken,
  requirePatient,          // if you have patient-only routes
  requireDoctor,           // doctor-only routes
  requireVerifiedDoctor,   // fully-verified doctor
  requireOwnershipOrAdmin, // checking resource ownership
  optionalAuth,            // if you want auth-optional endpoints
  rateLimitAuth            // any rate-limiting you set up
} = require('../Middlewares/Auth');

const isAdmin = require('../Middlewares/adminMiddleware');

// Public
router.post('/register', AuthController.register);
router.post('/login',    AuthController.login);

// Protected (must present a valid Firebase token)
router.get(   '/profile',         verifyToken,    AuthController.getProfile);
router.put(   '/profile',         verifyToken,    AuthController.updateProfile);
router.post(  '/logout',          verifyToken,    AuthController.logout);
router.delete('/account',         verifyToken,    AuthController.deleteAccount);
router.put(   '/change-password', verifyToken,    AuthController.changePassword);

// Admin-only (must be logged in AND an admin)
router.put(
  '/verify-doctor/:doctorId',
   verifyToken,
   isAdmin,
   AuthController.verifyDoctor
);

module.exports = router;