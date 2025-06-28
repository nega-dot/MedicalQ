import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, ArrowRight, Heart, Brain, Activity, Bone, Eye, Pill, Baby, Zap, Clock, Star } from 'lucide-react';

const CommunityAds: React.FC = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const communityAds = [
    {
      id: 1,
      title: 'Heart Disease Community',
      description: 'Connect with cardiac patients and specialists',
      recentActivity: 'Dr. Kumar just answered a question about post-surgery recovery...',
      members: 2847,
      activeNow: 23,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      trending: true
    },
    {
      id: 2,
      title: 'Cancer Support Group',
      description: 'Share experiences and get expert guidance',
      recentActivity: 'Sarah shared her chemotherapy experience and tips...',
      members: 1923,
      activeNow: 18,
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      trending: false
    },
    {
      id: 3,
      title: 'Neurology Forum',
      description: 'Brain health discussions and support',
      recentActivity: 'Mike asked about migraine management techniques...',
      members: 1456,
      activeNow: 15,
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      trending: true
    },
    {
      id: 4,
      title: 'Orthopedic Care',
      description: 'Joint health and mobility support',
      recentActivity: 'Linda shared her knee replacement recovery journey...',
      members: 1789,
      activeNow: 12,
      icon: Bone,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      trending: false
    },
    {
      id: 5,
      title: 'Diabetes Management',
      description: 'Blood sugar control and lifestyle tips',
      recentActivity: 'Robert asked about post-meal blood sugar spikes...',
      members: 2156,
      activeNow: 28,
      icon: Pill,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      trending: true
    }
  ];

  // Auto-rotate ads every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % communityAds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentAd = communityAds[currentAdIndex];

  return (
    <div className="space-y-6">
      {/* Main Community Ad */}
      <motion.div
        key={currentAd.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-6 ${currentAd.bgColor} border ${currentAd.borderColor} rounded-2xl relative overflow-hidden shadow-lg`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${currentAd.color.split('-')[1]}' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Trending Badge */}
        {currentAd.trending && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-medical-teal text-white px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>Trending</span>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 ${currentAd.bgColor} border ${currentAd.borderColor} rounded-xl shadow-sm`}>
                <currentAd.icon className={`h-6 w-6 ${currentAd.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentAd.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentAd.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-green-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">{currentAd.activeNow} online</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Activity</span>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg border border-white/20">
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                "{currentAd.recentActivity}"
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{currentAd.members.toLocaleString()} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8 rating</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-medical-gradient text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-200"
          >
            <span>Join Community</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Community Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {communityAds.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAdIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentAdIndex 
                ? 'bg-medical-teal w-6' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Quick Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
          Community Highlights
        </h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-2">
            <div className="text-2xl font-bold text-medical-teal">50+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Active Communities</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-medical-blue">12K+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-medical-green">500+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Expert Doctors</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-purple-500">24/7</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </motion.div>

      {/* Trending Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border shadow-sm"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-medical-teal" />
          Trending Questions
        </h4>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">
              "Post-surgery recovery tips?"
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Heart className="h-3 w-3 text-red-500" />
              <span>Cardiology</span>
              <span>•</span>
              <span>15 replies</span>
            </div>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">
              "Managing diabetes naturally"
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Pill className="h-3 w-3 text-orange-500" />
              <span>Diabetes</span>
              <span>•</span>
              <span>23 replies</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Join All Communities CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-medical-teal/10 to-medical-blue/10 p-4 rounded-xl border border-medical-teal/20"
      >
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Explore All Communities
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Find support groups for every health condition and connect with experts
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-medical-teal text-white rounded-lg font-medium hover:bg-medical-teal/90 transition-colors"
          >
            Browse All Communities
          </motion.button>
        </div>
      </motion.div>

      {/* Emergency Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="font-semibold text-red-800 dark:text-red-400">
              Need Immediate Help?
            </h4>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            For medical emergencies, don't wait for community responses
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Call Emergency: +91-11-2575-1111
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunityAds;