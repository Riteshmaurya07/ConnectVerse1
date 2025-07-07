import React, { createContext, useState, useEffect, ReactNode } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  signup: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  login: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, [initializing]);

  const signup = (email: string, password: string) =>
    auth().createUserWithEmailAndPassword(email, password);
  
  const login = (email: string, password: string) =>
    auth().signInWithEmailAndPassword(email, password);
  
  const logout = () => auth().signOut();

  return (
    <AuthContext.Provider value={{ user, initializing, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
