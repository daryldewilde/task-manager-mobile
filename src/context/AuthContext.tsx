import React, { createContext, useState, useContext, useEffect } from 'react';
import { getData, storeData, removeData } from '../utils/utils';
import { setLogoutCallback } from '../api/api';

type AuthContextType = {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    await removeData('token');
    setToken(null);
  };

  useEffect(() => {
    // Load token on app start
    getData('token').then((storedToken) => {
      setToken(storedToken);
      setIsLoading(false);
    });

    // Register logout callback for API to use on 401 errors
    setLogoutCallback(logout);
  }, []);

  const login = async (newToken: string) => {
    await storeData('token', newToken);
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
