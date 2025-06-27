import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  Star, 
  TrendingUp,
  Filter,
  Search,
  Heart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  ThumbsUp,
  User,
  Calendar
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'questions', label: 'My Questions', icon: MessageSquare },
    { id: 'health', label: 'Health Profile', icon: Heart },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
  ];

  const recentQuestions = [
    {
      id: 1,
      title: "Persistent headaches for 3 days",
      category: "Neurology",
      status: "answered",
      answers: 3,
      views: 127,
      lastActivity: "2 hours ago",
      priority: "medium"
    },
    {
      id: 2,
      title: "Chest pain during exercise",
      category: "Cardiology",
      status: "emergency",
      answers: 1,
      views: 89,
      lastActivity: "30 minutes ago",
      priority: "high"
    },
    {
      id: 3,
      title: "Skin rash on arms",
      category: "Dermatology",
      status: "pending",
      answers: 0,
      views: 45,
      lastActivity: "1 day ago",
      priority: "low"
    },
    {
      id: 4,
      title: "Sleep issues and fatigue",
      category: "General Medicine",
      status: "answered",
      answers: 2,
      views: 203,
      lastActivity: "3 hours ago",
      priority: "medium"
    }
  ];

  const healthMetrics = [
    { label: 'Questions Asked', value: 12, trend: '+2', color: 'text-medical-teal' },
    { label: 'Answers Received', value: 8, trend: '+1', color: 'text-medical-blue' },
    { label: 'Follow-ups', value: 5, trend: '0', color: 'text-medical-green' },
    { label: 'Satisfaction', value: '4.8/5', trend: '+0.2', color: 'text-yellow-400' },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "Video Call",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Dec 28",
      time: "2:00 PM",
      type: "In-person",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'emergency': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-400" />;
      default: return null;
    }
  };

  const filteredQuestions = recentQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || question.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, John! 👋
              </h1>
              <p className="text-gray-400">
                Here's what's happening with your health journey
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-medical-gradient text-white rounded-full font-medium shadow-lg hover:shadow-medical-teal/25 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Ask Question</span>
            </motion.button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-dark-surface/50 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-medical-teal text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-dark-card'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Health Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-dark-surface/50 backdrop-blur-xl border border-dark-border rounded-2xl group hover:bg-dark-surface/70 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 text-sm font-medium">{metric.label}</h3>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      </motion.div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                      </span>
                      <span className="text-green-400 text-sm font-medium">
                        {metric.trend}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Questions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-dark-surface/50 backdrop-blur-xl border border-dark-border rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Questions</h3>
                    <button className="text-medical-teal hover:text-medical-teal/80 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentQuestions.slice(0, 3).map((question, index) => (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-4 bg-dark-card/50 rounded-lg hover:bg-dark-card transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-white group-hover:text-medical-teal transition-colors">
                            {question.title}
                          </h4>
                          {getPriorityIcon(question.priority)}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{question.category}</span>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(question.status)}`}>
                            {question.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Upcoming Appointments */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-dark-surface/50 backdrop-blur-xl border border-dark-border rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Upcoming Appointments</h3>
                    <button className="text-medical-teal hover:text-medical-teal/80 text-sm font-medium">
                      Schedule
                    </button>
                  </div>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-4 bg-dark-card/50 rounded-lg hover:bg-dark-card transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={appointment.avatar}
                            alt={appointment.doctor}
                            className="w-12 h-12 rounded-full border-2 border-medical-teal"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white group-hover:text-medical-teal transition-colors">
                              {appointment.doctor}
                            </h4>
                            <p className="text-sm text-gray-400">{appointment.specialty}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{appointment.date}</p>
                            <p className="text-xs text-gray-400">{appointment.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your questions..."
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface/50 border border-dark-border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-dark-surface/50 border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-medical-teal appearance-none"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="answered">Answered</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {filteredQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-dark-surface/50 backdrop-blur-xl border border-dark-border rounded-2xl hover:bg-dark-surface/70 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {getPriorityIcon(question.priority)}
                          <h3 className="text-lg font-semibold text-white group-hover:text-medical-teal transition-colors">
                            {question.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{question.category}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(question.status)}`}>
                        {question.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{question.answers} answers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{question.views} views</span>
                        </div>
                      </div>
                      <span>Last activity: {question.lastActivity}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'health' && (
            <motion.div
              key="health"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center py-20">
                <Heart className="h-16 w-16 text-medical-teal mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Health Profile</h3>
                <p className="text-gray-400">Track your health metrics and medical history</p>
                <button className="mt-6 px-6 py-3 bg-medical-gradient text-white rounded-full font-medium">
                  Set Up Profile
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center py-20">
                <Calendar className="h-16 w-16 text-medical-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Appointments</h3>
                <p className="text-gray-400">Schedule and manage your doctor appointments</p>
                <button className="mt-6 px-6 py-3 bg-medical-gradient text-white rounded-full font-medium">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserDashboard;