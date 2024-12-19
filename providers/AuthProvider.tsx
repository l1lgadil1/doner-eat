'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, ADMIN_CREDENTIALS, MOCK_ADMIN_USER } from '@/lib/mock-data';
import Cookies from 'js-cookie';

interface AdminAuthContextType {
  adminUser: User | null;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage and cookies on mount
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
      // Ensure cookie is set if localStorage has the user
      Cookies.set('adminUser', storedUser, { expires: 7 });
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setAdminUser(MOCK_ADMIN_USER);
      const userData = JSON.stringify(MOCK_ADMIN_USER);
      localStorage.setItem('adminUser', userData);
      Cookies.set('adminUser', userData, { expires: 7 }); // Cookie expires in 7 days
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('adminUser');
    Cookies.remove('adminUser');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, loginAdmin, logoutAdmin, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AuthProvider');
  }
  return context;
}; 