// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('quizToken');
    if (token) {
      // Validate token and get user data
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      // Implement login logic
      const response = await loginAPI(credentials);
      const { token, user } = response;
      localStorage.setItem('quizToken', token);
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('quizToken');
    setUser(null);
  };

  const validateToken = async (token) => {
    try {
      const user = await validateTokenAPI(token);
      setUser(user);
    } catch (error) {
      localStorage.removeItem('quizToken');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
  };
};

// Mock API functions (replace with actual API calls)
const loginAPI = async (credentials) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-token',
        user: {
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email,
        }
      });
    }, 1000);
  });
};

const validateTokenAPI = async (token) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      });
    }, 1000);
  });
};