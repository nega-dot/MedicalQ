import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../configs/firebase'; 
import api from '../configs/api'; 
import toast from 'react-hot-toast';

// Matches the user data structure from your backend
interface User {
  id: string; // MongoDB _id
  firebaseUid: string;
  name: string;
  email: string;
  role: 'user' | 'doctor' | 'admin';
  isVerified: boolean;
  avatar?: string; // We'll keep generating this on the frontend
  profilePicture?: string | null;
  specialization?: string;
}

// Data for the registration function
interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'doctor';
  specialization?: string;
  licenseNumber?: string;
  medicalCouncilRegistration?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
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
    // onAuthStateChanged is the Firebase recommended way to handle session persistence
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get the ID token from Firebase
          const token = await firebaseUser.getIdToken();
          localStorage.setItem('authToken', token);
          // Set token for all future api requests
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Fetch the full user profile from our backend
          const { data } = await api.get('/auth/profile');
          const backendUser = data.user;

          // Populate user state with data from our MongoDB
          setUser({
            id: backendUser.id, // MongoDB _id
            firebaseUid: backendUser.firebaseUid,
            name: backendUser.name,
            email: backendUser.email,
            role: backendUser.role,
            isVerified: backendUser.isVerified,
            specialization: backendUser.specialization,
            profilePicture: backendUser.profilePicture,
            avatar: backendUser.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.email}`,
          });

        } catch (error) {
          console.error("Failed to fetch user profile. Logging out.", error);
          // If fetching profile fails, something is wrong. Log out to be safe.
          await signOut(auth);
          setUser(null);
          localStorage.removeItem('authToken');
          delete api.defaults.headers.common['Authorization'];
        }
      } else {
        // User is not logged in
        setUser(null);
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle setting the user state and loading state.
    } catch (error: any) {
      setIsLoading(false); // Stop loading on error
      // Re-throw the error so the component can catch it and display a toast
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // 1. Register user with the backend. The backend will create the user in Firebase Auth and MongoDB.
      await api.post('/auth/register', data);
      
      // 2. After successful registration, log the user in.
      await login(data.email, data.password);
      // onAuthStateChanged will then take over to fetch the profile and set state.
    } catch (error: any) {
      setIsLoading(false); // Stop loading on error
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Notify backend to revoke refresh tokens
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Server logout failed, continuing with client-side logout.", error);
      // Don't block client logout if server call fails
    } finally {
      // Sign out from the Firebase client
      await signOut(auth);
      // onAuthStateChanged will handle clearing user state and setting isLoading to false.
      toast.success("You've been logged out.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};