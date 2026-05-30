import axiosInstance from './axios';
export const getProjectTasks = async (projectId) => {
  const response = await axiosInstance.get(`/tasks/project/${projectId}`);
  return response.data;
};
export const getMyTasks = async () => {
  const response = await axiosInstance.get('/tasks/my');
  return response.data;
};
export const createTask = async (taskData) => {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
};
export const updateTask = async (taskId, taskData) => {
  const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
  return response.data;
};
export const updateTaskStatus = async (taskId, status) => {
  const response = await axiosInstance.patch(`/tasks/${taskId}/status`, { status });
  return response.data;
};
export const deleteTask = async (taskId) => {
  const response = await axiosInstance.delete(`/tasks/${taskId}`);
  return response.data;
};
