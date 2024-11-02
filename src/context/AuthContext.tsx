import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  enrolledCourses?: string[];
  createdAt: any;
  updatedAt: any;
  photoURL?: string;
  public?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as UserProfile);
      } else if (user) {
        const newProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          enrolledCourses: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          photoURL: user.photoURL || undefined,
          public: false,
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error managing user profile:', error);
      toast.error('Error loading user profile. Please try refreshing the page.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUserProfile = async (uid: string, profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userProfile: UserProfile = {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        public: false,
      };
      await setDoc(userRef, userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw new Error('Failed to create user profile. Please try again.');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(result.user.uid, {
        uid: result.user.uid,
        name,
        email,
        enrolledCourses: [],
        photoURL: result.user.photoURL,
      });
      toast.success('Account created successfully!');
    } catch (error: any) {
      const errorMessage =
        error.code === 'auth/email-already-in-use'
          ? 'Email is already registered. Please login instead.'
          : error.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters long.'
          : 'Failed to create account. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      const errorMessage =
        error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : 'Failed to login. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user profile exists
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await createUserProfile(user.uid, {
          uid: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          enrolledCourses: [],
          photoURL: user.photoURL,
        });
      }
      toast.success('Logged in successfully!');
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      const errorMessage =
        error.code === 'auth/popup-closed-by-user'
          ? 'Google sign-in was cancelled.'
          : error.code === 'auth/unauthorized-domain'
          ? 'This domain is not authorized for Google sign-in.'
          : 'Failed to login with Google. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
    } catch (error: any) {
      toast.error('Failed to logout. Please try again.');
      throw error;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
