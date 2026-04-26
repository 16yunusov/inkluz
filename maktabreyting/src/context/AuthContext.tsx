'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, users } from '@/data/mockData';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('maktab_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string) => {
    // Simulate API call
    const foundUser = users.find((u) => 
      u.email?.toLowerCase() === identifier.toLowerCase() || 
      u.username?.toLowerCase() === identifier.toLowerCase()
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('maktab_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maktab_user');
    router.push('/login');
  };

  // Protected Routes Check
  useEffect(() => {
    if (!isLoading && !user && pathname.startsWith('/admin-panel')) {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
