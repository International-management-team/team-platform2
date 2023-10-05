import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  mockColumnItems,
  mockEmptyColumn,
} from 'src/utils/constants temporary/constant_temp';
import { RootState } from '../store';
import type { ColumnType, ProjectRequestData, ProjectType } from '../api/types';
import { projectAPI } from '../api/projectAPI';

// Types

type ProjectStateType = {
  curProject: null | ProjectType | undefined;
  allProjects: ProjectType[] | null;
  isLoading: boolean;
  error: null | unknown | string;
};

// State

const initialState: ProjectStateType = {
  curProject: undefined,
  allProjects: [],
  isLoading: false,
  error: null,
};

export const projectThunks = {
  // Info: Error axios interceptor is configured in the project, try-catch is not needed.

  addProject: createAsyncThunk(
    'project/add',
    async (projectData: ProjectRequestData, { dispatch }) => {
      const newProject = await projectAPI.addProject(projectData);
      dispatch(projectThunks.getAllProjects());
      return newProject;
    },
  ),

  getProject: createAsyncThunk('project/get', async (id: number) => {
    const project = await projectAPI.getProject(id);
    return project;
  }),

  getAllProjects: createAsyncThunk('project/getAll', async () => {
    const projects = await projectAPI.getAllProjects();
    return projects;
  }),
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add project
      .addCase(projectThunks.addProject.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.addProject.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          state.isLoading = false;
          state.error = false;
          state.curProject = action.payload;
        },
      )
      .addCase(
        projectThunks.addProject.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.curProject = null;
        },
      )
      // get project
      .addCase(projectThunks.getProject.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.getProject.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          state.isLoading = false;
          state.error = false;
          state.curProject = action.payload;
        },
      )
      .addCase(
        projectThunks.getProject.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.curProject = null;
        },
      )
      // get all projects
      .addCase(projectThunks.getAllProjects.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.getAllProjects.fulfilled,
        (state, action: PayloadAction<ProjectType[]>) => {
          state.isLoading = false;
          state.error = false;
          state.allProjects = action.payload;
        },
      )
      .addCase(
        projectThunks.getAllProjects.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.allProjects = null;
        },
      );
  },
});

export const selectProjects = (state: RootState) => state.projects.allProjects;
export const selectCurrentProject = (state: RootState) =>
  state.projects.curProject;
export const selectProjectIsLoading = (state: RootState) =>
  state.projects.isLoading;
export const selectProjectError = (state: RootState) => state.projects.error;

export const { getAllProjects, getProject, addProject } = projectThunks;
