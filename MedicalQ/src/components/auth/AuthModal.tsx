import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, Stethoscope, Shield, FileText, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'login' | 'register';
}

// Login form does not need role
interface LoginForm {
  email: string;
  password: string;
}

// Register form needs doctor-specific fields, matching the backend validation
interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'doctor';
  specialization?: string;
  licenseNumber?: string;
  medicalCouncilRegistration?: string;
}

// Helper to extract a user-friendly error message from backend or Firebase
const getErrorMessage = (error: any): string => {
  // Check for backend API error response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  // Check for Firebase Auth error codes
  if (error.code) {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password.';
      case 'auth/email-already-in-use':
      case 'auth/email-already-exists':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password is too weak. It should be at least 8 characters.';
      case 'auth/invalid-email':
          return 'Please enter a valid email address.';
      default:
        return 'An unexpected authentication error occurred.';
    }
  }
  // Fallback for generic errors
  return error.message || 'An unknown error occurred. Please try again.';
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab }) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, isLoading } = useAuth();

  const loginForm = useForm<LoginForm>();

  const registerForm = useForm<RegisterForm>({
    defaultValues: { role: 'user' }
  });

  // Watch the role field to conditionally render doctor-specific inputs
  const isDoctorRegistration = registerForm.watch('role') === 'doctor';

  const onLogin = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    try {
      // The register function in context now expects a single data object
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        specialization: data.specialization,
        licenseNumber: data.licenseNumber,
        medicalCouncilRegistration: data.medicalCouncilRegistration,
      });
      toast.success('Account created! Welcome to MedicalQ.');
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const roleOptions = [
    {
      value: 'user',
      label: 'Patient',
      description: 'Ask questions and get medical advice',
      icon: User,
      color: 'text-medical-teal'
    },
    {
      value: 'doctor',
      label: 'Doctor',
      description: 'Provide medical expertise and answers',
      icon: Stethoscope,
      color: 'text-medical-blue'
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-dark-surface/95 backdrop-blur-xl rounded-2xl border border-dark-border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-dark-border">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-medical-gradient rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentTab === 'login' ? 'Welcome back' : 'Join MedicalQ'}</h2>
                <p className="text-sm text-gray-400">{currentTab === 'login' ? 'Sign in to your account' : 'Create your account to get started'}</p>
              </div>
            </div>
            {/* Tab Switcher */}
            <div className="flex bg-dark-card rounded-lg p-1">
              <button onClick={() => setCurrentTab('login')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${currentTab === 'login' ? 'bg-medical-teal text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Sign In</button>
              <button onClick={() => setCurrentTab('register')} className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${currentTab === 'register' ? 'bg-medical-teal text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>Sign Up</button>
            </div>
          </div>

          {/* Content area with scroll */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {currentTab === 'login' ? (
                <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input type="email" {...loginForm.register('email', { required: 'Email is required' })}
                        className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200"
                        placeholder="Enter your email" />
                    </div>
                    {loginForm.formState.errors.email && <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.email.message}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input type={showPassword ? 'text' : 'password'} {...loginForm.register('password', { required: 'Password is required' })}
                        className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200"
                        placeholder="Enter your password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.password.message}</p>}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}
                    className="w-full py-3 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg hover:shadow-medical-teal/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <div className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Signing in...</div> : 'Sign In'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
                    <div className="grid grid-cols-1 gap-2">
                      {roleOptions.map((option) => (
                        <label key={option.value} className={`relative flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${registerForm.watch('role') === option.value ? 'border-medical-teal bg-medical-teal/10' : 'border-dark-border hover:border-dark-card'}`}>
                          <input type="radio" value={option.value} {...registerForm.register('role')} className="sr-only" />
                          <option.icon className={`h-5 w-5 mr-3 mt-0.5 ${option.color}`} />
                          <div>
                            <div className="text-sm font-medium text-white">{option.label}</div>
                            <div className="text-xs text-gray-400">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name, Email (common fields) */}
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label><div className="relative"><User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type="text" {...registerForm.register('name', { required: 'Name is required' })} className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="Enter your full name" /></div>{registerForm.formState.errors.name && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.name.message}</p>}</div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type="email" {...registerForm.register('email', { required: 'Email is required' })} className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="Enter your email" /></div>{registerForm.formState.errors.email && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.email.message}</p>}</div>
                  
                  {/* Doctor-specific fields (Conditional) */}
                  <AnimatePresence>
                    {isDoctorRegistration && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label><div className="relative"><Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><select {...registerForm.register('specialization', { required: 'Specialization is required for doctors' })} className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200 appearance-none"><option value="">Select specialization</option><option value="General Medicine">General Medicine</option><option value="Cardiology">Cardiology</option><option value="Dermatology">Dermatology</option><option value="Pediatrics">Pediatrics</option><option value="Psychiatry">Psychiatry</option><option value="Surgery">Surgery</option><option value="Neurology">Neurology</option><option value="Oncology">Oncology</option></select></div>{registerForm.formState.errors.specialization && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.specialization.message}</p>}</div>
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">License Number</label><div className="relative"><FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type="text" {...registerForm.register('licenseNumber', { required: 'License number is required for doctors' })} className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="e.g., A-12345" /></div>{registerForm.formState.errors.licenseNumber && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.licenseNumber.message}</p>}</div>
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Medical Council Registration</label><div className="relative"><Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type="text" {...registerForm.register('medicalCouncilRegistration', { required: 'Registration info is required for doctors' })} className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="e.g., MCI/2024/12345" /></div>{registerForm.formState.errors.medicalCouncilRegistration && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.medicalCouncilRegistration.message}</p>}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Password and Confirm Password */}
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type={showPassword ? 'text' : 'password'} {...registerForm.register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' }})} className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="Create a password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{registerForm.formState.errors.password && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.password.message}</p>}</div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><input type={showConfirmPassword ? 'text' : 'password'} {...registerForm.register('confirmPassword', { required: 'Please confirm your password' })} className="w-full pl-10 pr-12 py-3 bg-dark-card border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200" placeholder="Confirm your password" /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors">{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>{registerForm.formState.errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>}</div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading}
                    className="w-full py-3 bg-medical-gradient text-white rounded-lg font-medium hover:shadow-lg hover:shadow-medical-teal/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? <div className="flex items-center justify-center"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Creating account...</div> : 'Create Account'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;