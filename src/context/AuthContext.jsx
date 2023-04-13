import React, { useState, createContext, useEffect } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  // Store the variables we want to share
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Functions to store and delete the token received by the backend in the browser
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  // Function to check if the user is already authenticated and update the states, accessible from anywhere
  const authenticateUser = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const response = await authService.me();
        setIsLoggedIn(true);
        setLoading(false);
        setUser(response);
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate('/');
    toast.success('Logged out!')
  }

  // When the app first renders, let's see if the user's session is still active
  useEffect(() => {
    authenticateUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, storeToken, removeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
