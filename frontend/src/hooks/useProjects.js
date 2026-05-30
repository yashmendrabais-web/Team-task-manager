import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  removeProjectMember,
  clearCurrentProject,
  selectProjects,
  selectCurrentProject,
  selectProjectsLoading,
  selectProjectsError,
} from '../features/projects/projectSlice';

export const useProjects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectProjectsLoading);
  const error = useSelector(selectProjectsError);

  const loadProjects = useCallback(() => {
    return dispatch(fetchProjects()).unwrap();
  }, [dispatch]);

  const loadProject = useCallback((id) => {
    return dispatch(fetchProject(id)).unwrap();
  }, [dispatch]);

  const addProject = useCallback((data) => {
    return dispatch(createProject(data)).unwrap();
  }, [dispatch]);

  const editProject = useCallback((id, data) => {
    return dispatch(updateProject({ id, data })).unwrap();
  }, [dispatch]);

  const removeProject = useCallback((id) => {
    return dispatch(deleteProject(id)).unwrap();
  }, [dispatch]);

  const addMember = useCallback((projectId, memberData) => {
    return dispatch(addProjectMember({ projectId, memberData })).unwrap();
  }, [dispatch]);

  const removeMember = useCallback((projectId, userId) => {
    return dispatch(removeProjectMember({ projectId, userId })).unwrap();
  }, [dispatch]);

  const clearProject = useCallback(() => {
    dispatch(clearCurrentProject());
  }, [dispatch]);

  return {
    projects,
    currentProject,
    loading,
    error,
    loadProjects,
    loadProject,
    addProject,
    editProject,
    removeProject,
    addMember,
    removeMember,
    clearProject,
  };
};
