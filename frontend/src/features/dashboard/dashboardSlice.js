import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as dashboardApi from '../../api/dashboard.api';

const initialState = {
  stats: {
    total_projects: 0,
    total_tasks: 0,
    my_tasks: 0,
    overdue_tasks: 0,
  },
  status_breakdown: [],
  recent_tasks: [],
  overdue_list: [],
  loading: false,
  error: null,
};
export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async () => {
  const response = await dashboardApi.getDashboard();
  return response.data;
});
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.status_breakdown = action.payload.status_breakdown;
        state.recent_tasks = action.payload.recent_tasks;
        state.overdue_list = action.payload.overdue_list;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectStatusBreakdown = (state) => state.dashboard.status_breakdown;
export const selectRecentTasks = (state) => state.dashboard.recent_tasks;
export const selectOverdueList = (state) => state.dashboard.overdue_list;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;
export default dashboardSlice.reducer;
