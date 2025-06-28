const { auth } = require('../config/firebase');
const User = require('../models/User');

class AuthController {
  // Register a new user
  static async register(req, res) {
    try {
      const { name, email, password, role, specialization, licenseNumber, medicalCouncilRegistration } = req.body;

      // Validate required fields
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, password, and role are required'
        });
      }

      // Validate role
      if (!['user', 'doctor'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Role must be either "user" or "doctor"'
        });
      }

      // Validate doctor-specific fields
      if (role === 'doctor') {
        if (!specialization || !licenseNumber || !medicalCouncilRegistration) {
          return res.status(400).json({
            success: false,
            message: 'Specialization, license number, and medical council registration are required for doctors'
          });
        }
      }

      // Check if user already exists in MongoDB
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create user in Firebase
      const firebaseUser = await auth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: false
      });

      // Create user in MongoDB
      const userData = {
        firebaseUid: firebaseUser.uid,
        name,
        email: email.toLowerCase(),
        role
      };

      // Add doctor-specific fields if applicable
      if (role === 'doctor') {
        userData.specialization = specialization;
        userData.licenseNumber = licenseNumber;
        userData.medicalCouncilRegistration = medicalCouncilRegistration;
        userData.isVerified = false; // Doctors need manual verification
      }

      const user = new User(userData);
      await user.save();

      // Set custom claims in Firebase for role-based access
      await auth.setCustomUserClaims(firebaseUser.uid, {
        role: role,
        isVerified: role === 'user' ? true : false
      });

      // Return user data (excluding sensitive information)
      const userResponse = {
        id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      };

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: userResponse
      });

    } catch (error) {
      console.error('Registration error:', error);

      // Handle Firebase auth errors
      if (error.code === 'auth/email-already-exists') {
        return res.status(409).json({
          success: false,
          message: 'Email already exists in Firebase'
        });
      }

      if (error.code === 'auth/invalid-email') {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      if (error.code === 'auth/weak-password') {
        return res.status(400).json({
          success: false,
          message: 'Password is too weak'
        });
      }

      // Handle MongoDB errors
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during registration'
      });
    }
  }

  // Login user (verify token and return user data)
  static async login(req, res) {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return res.status(400).json({
          success: false,
          message: 'ID token is required'
        });
      }

      // Verify the ID token
      const decodedToken = await auth.verifyIdToken(idToken);
      
      // Find user in database
      const user = await User.findOne({ firebaseUid: decodedToken.uid });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Update last login time
      user.lastLoginAt = new Date();
      await user.save();

      // Update custom claims if needed
      const currentClaims = decodedToken;
      if (currentClaims.role !== user.role || currentClaims.isVerified !== user.isVerified) {
        await auth.setCustomUserClaims(user.firebaseUid, {
          role: user.role,
          isVerified: user.isVerified
        });
      }

      // Return user data
      const userResponse = {
        id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
        isVerified: user.isVerified,
        lastLoginAt: user.lastLoginAt
      };

      res.json({
        success: true,
        message: 'Login successful',
        user: userResponse
      });

    } catch (error) {
      console.error('Login error:', error);

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

      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  }

  // Get current user profile
  static async getProfile(req, res) {
    try {
      // User is already attached to req by auth middleware
      const user = req.user;

      const userResponse = {
        id: user._id,
        firebaseUid: user.firebaseUid,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
        isVerified: user.isVerified,
        profilePicture: user.profilePicture,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt
      };

      res.json({
        success: true,
        user: userResponse
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching profile'
      });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const { name, specialization, profilePicture } = req.body;
      const user = req.user;

      // Validate updates
      const updates = {};
      
      if (name) {
        updates.name = name.trim();
      }

      if (user.role === 'doctor' && specialization) {
        const validSpecializations = [
          'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics',
          'Psychiatry', 'Surgery', 'Neurology', 'Oncology'
        ];
        
        if (!validSpecializations.includes(specialization)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid specialization'
          });
        }
        
        updates.specialization = specialization;
      }

      if (profilePicture) {
        updates.profilePicture = profilePicture;
      }

      // Update user in database
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        updates,
        { new: true, runValidators: true }
      );

      // Update display name in Firebase if name changed
      if (name) {
        await auth.updateUser(user.firebaseUid, {
          displayName: name
        });
      }

      const userResponse = {
        id: updatedUser._id,
        firebaseUid: updatedUser.firebaseUid,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        specialization: updatedUser.specialization,
        isVerified: updatedUser.isVerified,
        profilePicture: updatedUser.profilePicture
      };

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: userResponse
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating profile'
      });
    }
  }

  // Logout user (revoke tokens)
  static async logout(req, res) {
    try {
      const user = req.user;

      // Revoke all refresh tokens for the user
      await auth.revokeRefreshTokens(user.firebaseUid);

      res.json({
        success: true,
        message: 'Logout successful'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }
  }

  // Delete user account
  static async deleteAccount(req, res) {
    try {
      const user = req.user;

      // Delete user from Firebase
      await auth.deleteUser(user.firebaseUid);

      // Soft delete user from database (or hard delete if preferred)
      await User.findByIdAndUpdate(user._id, { 
        isActive: false,
        email: `deleted_${Date.now()}_${user.email}` // Prevent email conflicts
      });

      res.json({
        success: true,
        message: 'Account deleted successfully'
      });

    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting account'
      });
    }
  }

  // Change password
  static async changePassword(req, res) {
    try {
      const { newPassword } = req.body;
      const user = req.user;

      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 8 characters long'
        });
      }

      // Update password in Firebase
      await auth.updateUser(user.firebaseUid, {
        password: newPassword
      });

      // Revoke all existing tokens to force re-authentication
      await auth.revokeRefreshTokens(user.firebaseUid);

      res.json({
        success: true,
        message: 'Password changed successfully. Please login again.'
      });

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        message: 'Error changing password'
      });
    }
  }

  // Verify doctor (admin function)
  static async verifyDoctor(req, res) {
    try {
      const { doctorId } = req.params;
      const { isVerified } = req.body;

      const doctor = await User.findById(doctorId);

      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }

      if (doctor.role !== 'doctor') {
        return res.status(400).json({
          success: false,
          message: 'User is not a doctor'
        });
      }

      // Update verification status
      doctor.isVerified = isVerified;
      await doctor.save();

      // Update custom claims in Firebase
      await auth.setCustomUserClaims(doctor.firebaseUid, {
        role: doctor.role,
        isVerified: isVerified
      });

      res.json({
        success: true,
        message: `Doctor ${isVerified ? 'verified' : 'unverified'} successfully`,
        doctor: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization,
          isVerified: doctor.isVerified
        }
      });

    } catch (error) {
      console.error('Verify doctor error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating doctor verification'
      });
    }
  }
}

module.exports = AuthController;