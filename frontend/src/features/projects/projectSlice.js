import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as projectApi from '../../api/project.api';

const getProjectId = (project) => project?.id ?? project?._id;
const getMemberId = (member) => member?.id ?? member?._id;
const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await projectApi.getProjects();
  return response.data;
});
export const fetchProject = createAsyncThunk('projects/fetchProject', async (id) => {
  const response = await projectApi.getProject(id);
  return response.data;
});
export const createProject = createAsyncThunk('projects/createProject', async (projectData) => {
  const response = await projectApi.createProject(projectData);
  return response.data;
});
export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, data }) => {
  const response = await projectApi.updateProject(id, data);
  return response.data;
});
export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
  await projectApi.deleteProject(id);
  return id;
});
export const addProjectMember = createAsyncThunk('projects/addProjectMember', async ({ projectId, memberData }, { dispatch }) => {
  const response = await projectApi.addMember(projectId, memberData);
  dispatch(fetchProject(projectId));
  return response.data;
});

export const removeProjectMember = createAsyncThunk('projects/removeProjectMember', async ({ projectId, userId }) => {
  await projectApi.removeMember(projectId, userId);
  return { projectId, userId };
});
const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { id, data } = action.meta.arg;
        const index = state.projects.findIndex(
          (p) => String(getProjectId(p)) === String(id)
        );
        if (index !== -1) {
          state.projects[index] = { ...state.projects[index], ...data };
        }
        if (state.currentProject &&
          String(getProjectId(state.currentProject)) === String(id)) {
          state.currentProject = { ...state.currentProject, ...data };
        }
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => String(getProjectId(project)) !== String(action.payload));
      })
      .addCase(addProjectMember.fulfilled, (state, action) => {
        if (state.currentProject && String(getProjectId(state.currentProject)) === String(action.meta.arg.projectId)) {
          const members = Array.isArray(state.currentProject.members) ? state.currentProject.members : [];
          if (action.payload?.data) {
            members.push(action.payload.data);
          }
          state.currentProject.members = members;
        }
      })
      .addCase(removeProjectMember.fulfilled, (state, action) => {
        if (state.currentProject && String(getProjectId(state.currentProject)) === String(action.payload.projectId)) {
          state.currentProject.members = state.currentProject.members.filter(
            (member) => String(getMemberId(member)) !== String(action.payload.userId)
          );
        }
      });
  },
});

export const { clearCurrentProject, clearError } = projectSlice.actions;
export const selectProjects = (state) => state.projects.projects;
export const selectCurrentProject = (state) => state.projects.currentProject;
export const selectProjectsLoading = (state) => state.projects.loading;
export const selectProjectsError = (state) => state.projects.error;
export default projectSlice.reducer;
