import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as authApi from '../api/auth.api';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await authApi.getMe();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    setUser(response.data);
    toast.success('Welcome back!');
    return response;
  };
  const register = async (userData) => {
    const response = await authApi.register(userData);
    setUser(response.data);
    toast.success('Account created!');
    return response;
  };
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
    } finally {
      setUser(null);
      toast.success('Logged out successfully');
    }
  };
  const contextValue = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
