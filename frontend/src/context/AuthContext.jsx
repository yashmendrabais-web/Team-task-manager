import { createContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import * as authApi from '../api/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {\r
        const response = await authApi.getMe();
        setUser(response.data); // ✅ Fixed
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (credentials) => {
    const response = await authApi.login(credentials);
    const { token, ...userData } = response.data; // ✅ Fixed
    localStorage.setItem('token', token);
    setUser(userData);
    toast.success('Welcome back!');
    return response;
  };

  const register = async (userData) => {
    const response = await authApi.register(userData);
    const { token, ...user } = response.data; // ✅ Fixed
    localStorage.setItem('token', token);
    setUser(user);
    toast.success('Account created!');
    return response;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

