import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'doctor' | 'admin';
  verified?: boolean;
  avatar?: string;
  specialization?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'doctor') => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'user' | 'doctor') => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('medicalq_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'doctor') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      verified: role === 'doctor' ? Math.random() > 0.5 : true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      specialization: role === 'doctor' ? 'General Medicine' : undefined,
    };
    
    setUser(userData);
    localStorage.setItem('medicalq_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'doctor') => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      verified: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      specialization: role === 'doctor' ? 'General Medicine' : undefined,
    };
    
    setUser(userData);
    localStorage.setItem('medicalq_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medicalq_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};