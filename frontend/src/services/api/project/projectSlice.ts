import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { projectAPI } from './projectAPI';
import { ProjectRequestData, ProjectType } from './projectTypes';
import { getMembers } from '../team/teamSlice';

// Types

type ProjectStateType = {
  curProject: null | ProjectType | undefined;
  allProjects: ProjectType[];
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

  getProject: createAsyncThunk(
    'project/get',
    async (id: number, { dispatch }) => {
      const project = await projectAPI.getProject(id);
      dispatch(getMembers(id));
      return project;
    },
  ),

  getAllProjects: createAsyncThunk('project/getAll', async () => {
    const projects = await projectAPI.getAllProjects();
    return projects;
  }),

  patchProject: createAsyncThunk(
    'project/patch',
    async (data: { projectData: Partial<ProjectType>; projectId: number }) => {
      const patchedProject = await projectAPI.patchProject(data);
      return patchedProject;
    },
  ),
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
        state.curProject = null;
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
          state.allProjects = [];
        },
      )
      // patch Project
      .addCase(projectThunks.patchProject.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        projectThunks.patchProject.fulfilled,
        (state, action: PayloadAction<ProjectType>) => {
          state.isLoading = false;
          state.error = false;
          state.curProject = action.payload;
        },
      )
      .addCase(
        projectThunks.patchProject.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
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

export const { getAllProjects, getProject, addProject, patchProject } =
  projectThunks;
