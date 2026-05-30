import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import * as taskApi from '../../api/task.api';

const getTaskId = (task) => task?.id ?? task?._id;
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId) => {
  const response = await taskApi.getProjectTasks(projectId);
  return response.data;
});
export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await taskApi.createTask(taskData);
  return response.data;
});
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, taskData }) => {
  const response = await taskApi.updateTask(taskId, taskData);
  return response.data;
});
export const updateStatus = createAsyncThunk('tasks/updateStatus', async ({ taskId, status }) => {
  await taskApi.updateTaskStatus(taskId, status);
  return { taskId, status };
});
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await taskApi.deleteTask(taskId);
  return taskId;
});
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { taskId, taskData } = action.meta.arg;
        const index = state.tasks.findIndex(
          (task) => String(getTaskId(task)) === String(taskId)
        );
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...taskData };
        }
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => String(getTaskId(task)) === String(action.payload.taskId));
        if (index !== -1) {
          state.tasks[index].status = action.payload.status;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => String(getTaskId(task)) !== String(action.payload));
      });
  },
});

export const { setFilter, clearTasks } = taskSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;
export const selectTaskFilter = (state) => state.tasks.filter;
export const selectFilteredTasks = createSelector(
  [selectTasks, selectTaskFilter],
  (tasks, filter) => {
    if (filter === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.status === filter);
  }
);
export default taskSlice.reducer;
