import { useState } from 'react';
import { authService } from '@/services/api/auth';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    
    sessionStorage.setItem('authToken', response.token);
    sessionStorage.setItem('user', JSON.stringify(response.user));
    
    setUser(response.user);
    return response;
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!sessionStorage.getItem('authToken');
  };

  return { 
    user,
    login, 
    logout,
    isAuthenticated
  };
}

