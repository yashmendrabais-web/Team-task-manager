import axiosInstance from './axios';
export const getProjects = async () => {
  const response = await axiosInstance.get('/projects');
  return response.data;
};
export const getProject = async (id) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};
export const createProject = async (projectData) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data;
};
export const updateProject = async (id, projectData) => {
  const response = await axiosInstance.put(`/projects/${id}`, projectData);
  return response.data;
};
export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};
export const addMember = async (projectId, memberData) => {
  const response = await axiosInstance.post(`/projects/${projectId}/members`, memberData);
  return response.data;
};
export const removeMember = async (projectId, userId) => {
  const response = await axiosInstance.delete(`/projects/${projectId}/members/${userId}`);
  return response.data;
};
