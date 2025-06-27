import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import Features from './components/Home/Features';
import Stats from './components/Home/Stats';
import AuthModal from './components/Auth/AuthModal';
import UserDashboard from './components/Dashboard/UserDashboard';

const HomePage: React.FC = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'register' }>({
    isOpen: false,
    type: 'login'
  });

  const handleAuthModal = (type: 'login' | 'register') => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  return (
    <div className="bg-dark-bg">
      <Header onAuthModal={handleAuthModal} />
      <Hero onGetStarted={() => handleAuthModal('register')} />
      <Features />
      <Stats />
      
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialTab={authModal.type}
      />
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type: 'login' | 'register' }>({
    isOpen: false,
    type: 'login'
  });

  const handleAuthModal = (type: 'login' | 'register') => {
    setAuthModal({ isOpen: true, type });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, type: 'login' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-medical-teal/30 border-t-medical-teal rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading MedicalQ...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <HomePage />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <>
                  <Header onAuthModal={handleAuthModal} />
                  <UserDashboard />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <AuthModal
          isOpen={authModal.isOpen}
          onClose={closeAuthModal}
          initialTab={authModal.type}
        />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#ffffff',
            border: '1px solid #475569',
          },
          success: {
            iconTheme: {
              primary: '#14b8a6',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;