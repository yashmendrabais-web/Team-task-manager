import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
  setFilter,
  clearTasks,
  selectTasks,
  selectFilteredTasks,
  selectTasksLoading,
  selectTasksError,
  selectTaskFilter,
} from '../features/tasks/taskSlice';

export const useTasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const filteredTasks = useSelector(selectFilteredTasks);
  const loading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  const filter = useSelector(selectTaskFilter);

  const loadTasks = useCallback((projectId) => {
    return dispatch(fetchTasks(projectId)).unwrap();
  }, [dispatch]);

  const addTask = useCallback((taskData) => {
    return dispatch(createTask(taskData)).unwrap();
  }, [dispatch]);

  const editTask = useCallback((taskId, taskData) => {
    return dispatch(updateTask({ taskId, taskData })).unwrap();
  }, [dispatch]);

  const changeStatus = useCallback((taskId, status) => {
    return dispatch(updateStatus({ taskId, status })).unwrap();
  }, [dispatch]);

  const removeTask = useCallback((taskId) => {
    return dispatch(deleteTask(taskId)).unwrap();
  }, [dispatch]);

  const setTaskFilter = useCallback((status) => {
    dispatch(setFilter(status));
  }, [dispatch]);

  const clearProjectTasks = useCallback(() => {
    dispatch(clearTasks());
  }, [dispatch]);

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    filter,
    loadTasks,
    addTask,
    editTask,
    changeStatus,
    removeTask,
    setTaskFilter,
    clearProjectTasks,
  };
};
