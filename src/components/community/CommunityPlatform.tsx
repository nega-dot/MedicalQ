import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Heart, 
  Brain, 
  Activity, 
  Bone, 
  Eye, 
  Pill, 
  Baby, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Shield, 
  Star,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

const CommunityPlatform: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', name: 'All Communities', icon: Users, color: 'text-gray-600', count: 50 },
    { id: 'cardiology', name: 'Heart Disease', icon: Heart, color: 'text-red-500', count: 12 },
    { id: 'oncology', name: 'Cancer Support', icon: Activity, color: 'text-purple-500', count: 8 },
    { id: 'neurology', name: 'Brain & Nervous', icon: Brain, color: 'text-blue-500', count: 6 },
    { id: 'orthopedics', name: 'Bone & Joint', icon: Bone, color: 'text-green-500', count: 9 },
    { id: 'diabetes', name: 'Diabetes Care', icon: Pill, color: 'text-orange-500', count: 7 },
    { id: 'mental-health', name: 'Mental Health', icon: Brain, color: 'text-indigo-500', count: 11 },
    { id: 'pediatrics', name: 'Child Health', icon: Baby, color: 'text-pink-500', count: 5 },
    { id: 'ophthalmology', name: 'Eye Care', icon: Eye, color: 'text-cyan-500', count: 4 }
  ];

  const questions = [
    {
      id: 1,
      title: 'Post-cardiac surgery recovery timeline and precautions',
      content: 'I had bypass surgery 2 weeks ago. What should I expect in terms of recovery timeline? What activities should I avoid?',
      author: 'John Smith',
      authorRole: 'Patient',
      category: 'cardiology',
      tags: ['surgery', 'recovery', 'cardiac'],
      timestamp: '2 hours ago',
      upvotes: 15,
      downvotes: 1,
      replies: 8,
      views: 234,
      isAnswered: true,
      doctorReplied: true,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Managing chemotherapy side effects - nausea and fatigue',
      content: 'Starting my third cycle of chemo next week. The nausea and fatigue are getting worse. Any tips from fellow patients or doctors?',
      author: 'Sarah Johnson',
      authorRole: 'Patient',
      category: 'oncology',
      tags: ['chemotherapy', 'side-effects', 'nausea'],
      timestamp: '4 hours ago',
      upvotes: 23,
      downvotes: 0,
      replies: 12,
      views: 456,
      isAnswered: true,
      doctorReplied: true,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Migraine frequency increasing - when to see neurologist?',
      content: 'My migraines have increased from once a month to 3-4 times per week. Should I be concerned? When should I see a specialist?',
      author: 'Mike Wilson',
      authorRole: 'Patient',
      category: 'neurology',
      tags: ['migraine', 'frequency', 'specialist'],
      timestamp: '6 hours ago',
      upvotes: 18,
      downvotes: 2,
      replies: 6,
      views: 189,
      isAnswered: false,
      doctorReplied: false,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Knee replacement surgery - what to expect?',
      content: 'Scheduled for knee replacement next month. First-time surgery patient. What should I prepare for? Recovery tips?',
      author: 'Linda Davis',
      authorRole: 'Patient',
      category: 'orthopedics',
      tags: ['knee-replacement', 'surgery', 'preparation'],
      timestamp: '8 hours ago',
      upvotes: 31,
      downvotes: 1,
      replies: 15,
      views: 567,
      isAnswered: true,
      doctorReplied: true,
      priority: 'low'
    },
    {
      id: 5,
      title: 'Blood sugar spikes after meals - normal or concerning?',
      content: 'Type 2 diabetic for 3 years. Recently noticing blood sugar spikes to 200+ after meals despite medication. Is this normal?',
      author: 'Robert Chen',
      authorRole: 'Patient',
      category: 'diabetes',
      tags: ['blood-sugar', 'spikes', 'medication'],
      timestamp: '1 day ago',
      upvotes: 27,
      downvotes: 3,
      replies: 9,
      views: 345,
      isAnswered: true,
      doctorReplied: true,
      priority: 'high'
    }
  ];

  const filteredQuestions = questions.filter(question => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center px-4 py-2 bg-medical-gradient/10 border border-medical-teal/20 rounded-full text-medical-teal text-sm font-medium mb-6"
          >
            <Users className="h-4 w-4 mr-2" />
            Community Support Platform
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Connect, Share, <span className="bg-medical-gradient bg-clip-text text-transparent">Heal Together</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join disease-specific communities where patients and verified doctors share experiences, 
            ask questions, and provide support for better health outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Health Communities
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-medical-teal text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className={`h-4 w-4 ${
                        selectedCategory === category.id ? 'text-white' : category.color
                      }`} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gradient-to-br from-medical-teal/10 to-medical-blue/10 rounded-lg border border-medical-teal/20">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Community Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Members</span>
                    <span className="font-semibold text-medical-teal">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Questions Today</span>
                    <span className="font-semibold text-medical-blue">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expert Doctors</span>
                    <span className="font-semibold text-medical-green">523</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions, symptoms, or conditions..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-teal appearance-none"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="answered">Answered First</option>
                      <option value="unanswered">Unanswered First</option>
                    </select>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-medical-gradient text-white rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Ask Question</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-border"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-medical-teal transition-colors cursor-pointer">
                          {question.title}
                        </h3>
                        {question.isAnswered && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                            Answered
                          </span>
                        )}
                        {question.doctorReplied && (
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4 text-medical-blue" />
                            <span className="text-xs text-medical-blue font-medium">Doctor Replied</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {question.content}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex items-center space-x-2 mb-3">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(question.priority)}`}>
                      {question.priority}
                    </div>
                  </div>

                  {/* Question Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-medical-teal rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {question.author.charAt(0)}
                        </div>
                        <span>{question.author}</span>
                        <span className="text-xs">({question.authorRole})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{question.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Stats */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-dark-card rounded transition-colors">
                            <ThumbsUp className="h-4 w-4 text-green-500" />
                          </button>
                          <span className="text-sm font-medium">{question.upvotes}</span>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-dark-card rounded transition-colors">
                            <ThumbsDown className="h-4 w-4 text-red-500" />
                          </button>
                          <span className="text-sm font-medium">{question.downvotes}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4 text-medical-blue" />
                        <span className="text-sm font-medium">{question.replies} replies</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{question.views} views</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-medical-teal text-white rounded-lg text-sm font-medium hover:bg-medical-teal/90 transition-colors flex items-center space-x-1"
                    >
                      <Reply className="h-3 w-3" />
                      <span>Reply</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-dark-surface border-2 border-medical-teal text-medical-teal rounded-lg font-medium hover:bg-medical-teal hover:text-white transition-all duration-200"
              >
                Load More Questions
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPlatform;