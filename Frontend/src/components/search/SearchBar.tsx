import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, TrendingUp, User, Stethoscope, Building, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import api from '../../configs/api';

interface SearchResult {
  id: string;
  type: 'doctor' | 'department' | 'service' | 'community';
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  url: string;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: Date;
  type: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder, 
  onSearch, 
  className = "" 
}) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'doctor',
      title: 'Dr. Rajesh Kumar',
      subtitle: 'Cardiologist • 15 years experience',
      icon: Stethoscope,
      url: '/doctors/rajesh-kumar'
    },
    {
      id: '2',
      type: 'department',
      title: 'Cardiology Department',
      subtitle: 'Heart care and cardiac surgery',
      icon: Building,
      url: '/departments/cardiology'
    },
    {
      id: '3',
      type: 'doctor',
      title: 'Dr. Meera Gupta',
      subtitle: 'Oncologist • Cancer specialist',
      icon: Stethoscope,
      url: '/doctors/meera-gupta'
    },
    {
      id: '4',
      type: 'service',
      title: 'Emergency Services',
      subtitle: '24/7 emergency medical care',
      icon: Building,
      url: '/services/emergency'
    },
    {
      id: '5',
      type: 'community',
      title: 'Heart Disease Community',
      subtitle: 'Connect with cardiac patients',
      icon: User,
      url: '/community/cardiology'
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`recentSearches_${user.id}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setRecentSearches(parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          })));
        } catch (error) {
          console.error('Error parsing recent searches:', error);
        }
      }
    }
  }, [user]);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string, type: string = 'general') => {
    if (!user || !searchQuery.trim()) return;

    const newSearch: RecentSearch = {
      id: Date.now().toString(),
      query: searchQuery.trim(),
      timestamp: new Date(),
      type
    };

    const updated = [newSearch, ...recentSearches.filter(s => s.query !== searchQuery.trim())]
      .slice(0, 10); // Keep only last 10 searches

    setRecentSearches(updated);
    localStorage.setItem(`recentSearches_${user.id}`, JSON.stringify(updated));

    // Also save to backend if user is logged in
    if (user) {
      api.post('/api/search/save', {
        query: searchQuery.trim(),
        type,
        userId: user.id
      }).catch(error => {
        console.error('Error saving search to backend:', error);
      });
    }
  };

  // Perform search
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Filter mock results based on query
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filtered);
      
      // In a real app, you would make an API call here:
      // const response = await api.get(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      // setResults(response.data.results);
      
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
      if (onSearch) {
        onSearch(searchQuery);
      }
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    saveRecentSearch(result.title, result.type);
    setIsOpen(false);
    // Navigate to result URL
    window.location.href = result.url;
  };

  const handleRecentSearchClick = (recentSearch: RecentSearch) => {
    setQuery(recentSearch.query);
    performSearch(recentSearch.query);
    if (onSearch) {
      onSearch(recentSearch.query);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (user) {
      localStorage.removeItem(`recentSearches_${user.id}`);
    }
  };

  const removeRecentSearch = (searchId: string) => {
    const updated = recentSearches.filter(s => s.id !== searchId);
    setRecentSearches(updated);
    if (user) {
      localStorage.setItem(`recentSearches_${user.id}`, JSON.stringify(updated));
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
            if (e.key === 'Escape') {
              setIsOpen(false);
              inputRef.current?.blur();
            }
          }}
          placeholder={placeholder || t('search.placeholder')}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border shadow-xl overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center">
                <div className="w-6 h-6 border-2 border-medical-teal/30 border-t-medical-teal rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('search.searching')}</p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && query && results.length > 0 && (
              <div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Search className="h-4 w-4 mr-2" />
                    {t('search.results')}
                  </h4>
                </div>
                <div className="py-2">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <result.icon className="h-5 w-5 text-medical-teal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.type === 'doctor' ? 'bg-medical-blue/10 text-medical-blue' :
                          result.type === 'department' ? 'bg-medical-teal/10 text-medical-teal' :
                          result.type === 'service' ? 'bg-medical-green/10 text-medical-green' :
                          'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400'
                        }`}>
                          {result.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && query && results.length === 0 && (
              <div className="p-4 text-center">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('search.noResults')}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t('search.tryDifferent')}
                </p>
              </div>
            )}

            {/* Recent Searches */}
            {!query && user && recentSearches.length > 0 && (
              <div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {t('search.recent')}
                  </h4>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    {t('search.clearAll')}
                  </button>
                </div>
                <div className="py-2">
                  {recentSearches.slice(0, 5).map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-card transition-colors group"
                    >
                      <button
                        onClick={() => handleRecentSearchClick(search)}
                        className="flex-1 text-left flex items-center space-x-3"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white truncate">
                            {search.query}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTimeAgo(search.timestamp)}
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!query && (!user || recentSearches.length === 0) && (
              <div>
                <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {t('search.trending')}
                  </h4>
                </div>
                <div className="py-2">
                  {['Cardiology', 'Emergency Services', 'Dr. Rajesh Kumar', 'Diabetes Care', 'Mental Health'].map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(trend);
                        performSearch(trend);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-dark-card transition-colors flex items-center space-x-3"
                    >
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-900 dark:text-white">{trend}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;