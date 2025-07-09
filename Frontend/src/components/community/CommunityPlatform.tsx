import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Search, 
  Filter, 
  Plus, 
  User, 
  Calendar,
  Eye,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  ChevronDown,
  Stethoscope,
  AlertCircle,
  Clock
} from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
    specialty?: string;
  };
  category: string;
  tags: string[];
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
  isAnswered: boolean;
  urgency: 'low' | 'medium' | 'high';
}

interface Answer {
  id: string;
  questionId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
    specialty?: string;
  };
  createdAt: Date;
  upvotes: number;
  isAccepted: boolean;
}

const CommunityPlatform: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAskModal, setShowAskModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    urgency: 'medium' as 'low' | 'medium' | 'high'
  });

  const categories = [
    'all',
    'general-health',
    'cardiology',
    'dermatology',
    'pediatrics',
    'orthopedics',
    'mental-health',
    'nutrition',
    'emergency'
  ];

  const urgencyColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        title: 'Persistent headaches for the past week',
        content: 'I\'ve been experiencing severe headaches daily for the past week. They usually start in the morning and worsen throughout the day. I\'ve tried over-the-counter pain relievers but they provide minimal relief.',
        author: {
          id: 'user1',
          name: 'Aarushi Yadav',
          avatar: undefined,
          isVerified: false
        },
        category: 'general-health',
        tags: ['headache', 'pain', 'chronic'],
        createdAt: new Date('2025-06-28T10:30:00Z'),
        upvotes: 96,
        answers: 23,
        views: 1569,
        isAnswered: true,
        urgency: 'medium'
      },
      {
        id: '2',
        title: 'Best exercises for lower back pain relief',
        content: 'I work at a desk all day and have been dealing with lower back pain. What are some effective exercises or stretches I can do to alleviate this pain?',
        author: {
          id: 'user2',
          name: 'Abhimanyu Sharma',
          avatar: undefined,
          isVerified: false
        },
        category: 'orthopedics',
        tags: ['back-pain', 'exercise', 'workplace'],
        createdAt: new Date('2025-06-27T15:45:00Z'),
        upvotes: 320,
        answers: 56,
        views: 2038,
        isAnswered: true,
        urgency: 'low'
      },
      {
        id: '3',
        title: 'Chest pain and shortness of breath - urgent',
        content: 'Experiencing chest pain and difficulty breathing for the past hour. Should I be concerned?',
        author: {
          id: 'user3',
          name: 'Anonymous',
          avatar: undefined,
          isVerified: false
        },
        category: 'emergency',
        tags: ['chest-pain', 'breathing', 'urgent'],
        createdAt: new Date('2025-06-28T08:15:00Z'),
        upvotes: 981,
        answers: 198,
        views: 9782,
        isAnswered: false,
        urgency: 'high'
      }
    ];

    const mockAnswers: Answer[] = [
      {
        id: 'a1',
        questionId: '1',
        content: 'Persistent headaches can have various causes. I recommend keeping a headache diary to track triggers, staying hydrated, and ensuring adequate sleep. If symptoms persist, please consult with a healthcare provider for proper evaluation.',
        author: {
          id: 'doc1',
          name: 'Dr. Emily Rodriguez',
          avatar: undefined,
          isVerified: true,
          specialty: 'Neurology'
        },
        createdAt: new Date('2024-01-15T14:20:00Z'),
        upvotes: 15,
        isAccepted: true
      }
    ];

    setQuestions(mockQuestions);
    setAnswers(mockAnswers);
  }, []);

  const handleAskQuestion = () => {
    if (!newQuestion.title.trim() || !newQuestion.content.trim()) return;

    const question: Question = {
      id: Date.now().toString(),
      title: newQuestion.title,
      content: newQuestion.content,
      author: {
        id: 'current-user',
        name: 'Current User',
        isVerified: false
      },
      category: newQuestion.category || 'general-health',
      tags: newQuestion.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date(),
      upvotes: 0,
      answers: 0,
      views: 0,
      isAnswered: false,
      urgency: newQuestion.urgency
    };

    setQuestions(prev => [question, ...prev]);
    setNewQuestion({
      title: '',
      content: '',
      category: '',
      tags: '',
      urgency: 'medium'
    });
    setShowAskModal(false);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'most-answered':
        return b.answers - a.answers;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medical Community</h1>
              <p className="text-gray-600 mt-1">Ask questions, share knowledge, and connect with healthcare professionals</p>
            </div>
            <button
              onClick={() => setShowAskModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="most-answered">Most Answered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {sortedQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[question.urgency]}`}>
                      {question.urgency === 'high' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                      {question.urgency.charAt(0).toUpperCase() + question.urgency.slice(1)} Priority
                    </span>
                    <span className="text-xs text-gray-500">
                      {question.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                    {question.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {question.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{question.author.name}</span>
                        {question.author.isVerified && (
                          <Stethoscope className="w-3 h-3 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{question.answers}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{question.views}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {question.isAnswered && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>This question has been answered</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ask Question Modal */}
        {showAskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Ask a Question</h2>
                  <button
                    onClick={() => setShowAskModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Title *
                    </label>
                    <input
                      type="text"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Be specific and clear about your question"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Provide detailed information about your question, symptoms, or situation"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newQuestion.category}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select category</option>
                        {categories.slice(1).map(cat => (
                          <option key={cat} value={cat}>
                            {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        value={newQuestion.urgency}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, urgency: e.target.value as 'low' | 'medium' | 'high' }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Concern but not urgent</option>
                        <option value="high">High - Need quick response</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newQuestion.tags}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="e.g., headache, pain, medication"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Important Disclaimer</p>
                        <p>This platform is for informational purposes only and should not replace professional medical advice. For emergencies, please contact emergency services immediately.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleAskQuestion}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Post Question
                    </button>
                    <button
                      onClick={() => setShowAskModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {sortedQuestions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search criteria' 
                : 'Be the first to ask a question in the community'}
            </p>
            <button
              onClick={() => setShowAskModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ask the First Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPlatform;
