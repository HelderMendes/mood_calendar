'use client';
import { auth, db } from '@/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  // GoogleAuthProvider,
  // getAuth,
  // signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  currentUser: any;
  userDataObj: object;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loading: boolean;
}

// const AuthContext=React.createContext(null);
const AuthContext = React.createContext<AuthContextType | null>(null);

// CUSTOM HOOK
export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth handlers
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email: string) => {
    setUserDataObj({});
    setCurrentUser(null);
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    setUserDataObj(null);
    setCurrentUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      try {
        setCurrentUser(user); // Set the user based on Firebase auth state

        if (user) {
          // If the user exists, fetch user data from Firestore
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDataObj(docSnap.data()); // Set user data from Firestore
          } else {
            setUserDataObj(null); // Clear user data if no document is found
          }
        } else {
          setUserDataObj(null); // Clear user data if no user is logged in
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading after the process is done
      }
    });

    return unsubscribe; // clean up the subscription
  }, []);

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    setUserDataObj,
    signup,
    login,
    logout,
    resetPassword,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
