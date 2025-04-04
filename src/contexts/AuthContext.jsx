
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('ecoRecicleUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('ecoRecicleUser', JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  const register = (userData) => {
    // In a real app, you'd send this to a backend
    // For now, we'll store in localStorage with some basic validation
    const users = JSON.parse(localStorage.getItem('ecoRecicleUsers') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      return { success: false, message: "Este email já está cadastrado" };
    }

    // Add user to "database"
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('ecoRecicleUsers', JSON.stringify(users));
    
    // Log user in automatically
    login(newUser);
    
    return { success: true, user: newUser };
  };

  const logout = () => {
    localStorage.removeItem('ecoRecicleUser');
    setCurrentUser(null);
  };

  const isAuthenticated = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
