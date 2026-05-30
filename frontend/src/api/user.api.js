import axiosInstance from './axios';
export const searchUser = async (email) => {
  const response = await axiosInstance.get(`/users/search?email=${email}`);
  return response.data;
};
export const searchUsers = searchUser;
