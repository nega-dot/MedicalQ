import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Search, 
  Bell, 
  Menu, 
  X, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Shield,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onAuthModal: (type: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthModal }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const profileMenuItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help', href: '/help' },
    { icon: Shield, label: 'Privacy', href: '/privacy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <Heart className="h-8 w-8 text-medical-teal" fill="currentColor" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-medical-blue rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xl font-bold bg-medical-gradient bg-clip-text text-transparent">
              MedicalQ
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, doctors, topics..."
                className="w-full pl-10 pr-4 py-2 bg-dark-surface/50 border border-dark-border rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-dark-surface/95 backdrop-blur-xl rounded-xl border border-dark-border shadow-xl overflow-hidden"
                >
                  <div className="p-4">
                    <div className="text-sm text-gray-400 mb-2">Quick results</div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 hover:bg-dark-card rounded-lg cursor-pointer">
                        <HelpCircle className="h-4 w-4 text-medical-teal" />
                        <span className="text-white">How to treat headaches?</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 hover:bg-dark-card rounded-lg cursor-pointer">
                        <User className="h-4 w-4 text-medical-blue" />
                        <span className="text-white">Dr. Sarah Johnson - Cardiologist</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>

            {user ? (
              <>
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-dark-surface transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-medical-teal"
                    />
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <div className="text-xs text-gray-400 flex items-center">
                        {user.role === 'doctor' && (
                          <Shield className="h-3 w-3 mr-1 text-medical-blue" />
                        )}
                        {user.role}
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-dark-surface/95 backdrop-blur-xl rounded-xl border border-dark-border shadow-xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-dark-border">
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                        <div className="py-2">
                          {profileMenuItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-dark-card transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                          <button
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                            }}
                            className="flex items-center space-x-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-dark-card transition-colors w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAuthModal('login')}
                  className="px-4 py-2 text-white hover:text-medical-teal transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAuthModal('register')}
                  className="px-4 py-2 bg-medical-gradient text-white rounded-full font-medium hover:shadow-lg hover:shadow-medical-teal/25 transition-all duration-200"
                >
                  Get Started
                </motion.button>
              </div>
            )}

            {/* Mobile Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface/95 backdrop-blur-xl border-b border-dark-border"
          >
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal"
                />
              </div>
              {!user && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => onAuthModal('login')}
                    className="flex-1 py-2 text-center text-white hover:text-medical-teal transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onAuthModal('register')}
                    className="flex-1 py-2 bg-medical-gradient text-white rounded-full font-medium"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;