import axiosInstance from './axios';
export const getDashboard = async () => {
  const response = await axiosInstance.get('/dashboard');
  return response.data;
};
