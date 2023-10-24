import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TaskRequestData, TaskType } from './taskTypes';
import { taskAPI } from './taskAPI';

// Types

type TaskStateType = {
  curTask: TaskType | undefined;
  allTasks: TaskType[];
  isLoading: boolean;
  error: null | unknown | string;
};

// State

const initialState: TaskStateType = {
  curTask: undefined,
  allTasks: [],
  isLoading: false,
  error: null,
};

export const taskThunks = {
  addTask: createAsyncThunk(
    'task/add',
    async (
      addTaskData: { task: TaskRequestData; projectId: number },
      { dispatch },
    ) => {
      const newTask = await taskAPI.addTask(
        addTaskData.task,
        addTaskData.projectId,
      );
      dispatch(taskThunks.getAllTasks(addTaskData.projectId));
      return newTask;
    },
  ),

  getTask: createAsyncThunk(
    'task/get',
    async (getTaskData: { projectId: number; taskId: number }) => {
      const task = await taskAPI.getTask(
        getTaskData.projectId,
        getTaskData.taskId,
      );
      return task;
    },
  ),

  getAllTasks: createAsyncThunk('task/getAll', async (projectId: number) => {
    const tasks = await taskAPI.getAllTasks(projectId);
    return tasks;
  }),

  patchTask: createAsyncThunk(
    'task/patch',
    async (patchArgs: {
      data: Partial<TaskType>;
      projectId: number;
      taskId: number;
    }) => {
      const patchedTask = await taskAPI.patchTask(
        patchArgs.data,
        patchArgs.projectId,
        patchArgs.taskId,
      );
      return patchedTask;
    },
  ),
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetCurTask: (state) => {
      state.curTask = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // add task
      .addCase(taskThunks.addTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        taskThunks.addTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.isLoading = false;
          state.error = false;
          state.curTask = action.payload;
        },
      )
      .addCase(
        taskThunks.addTask.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.curTask = undefined;
        },
      )
      // get task
      .addCase(taskThunks.getTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.curTask = undefined;
      })
      .addCase(
        taskThunks.getTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.isLoading = false;
          state.error = false;
          state.curTask = action.payload;
        },
      )
      .addCase(
        taskThunks.getTask.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.curTask = undefined;
        },
      )
      // get all tasks
      .addCase(taskThunks.getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        taskThunks.getAllTasks.fulfilled,
        (state, action: PayloadAction<TaskType[]>) => {
          state.isLoading = false;
          state.error = false;
          state.allTasks = action.payload;
        },
      )
      .addCase(
        taskThunks.getAllTasks.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.allTasks = [];
        },
      )
      // patch task
      .addCase(taskThunks.patchTask.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        taskThunks.patchTask.fulfilled,
        (state, action: PayloadAction<TaskType>) => {
          state.isLoading = false;
          state.error = false;
          state.curTask = action.payload;
        },
      )
      .addCase(
        taskThunks.patchTask.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const selectTasks = (state: RootState) => state.tasks.allTasks;
export const selectCurrentTask = (state: RootState) => state.tasks.curTask;
export const selectTaskIsLoading = (state: RootState) => state.tasks.isLoading;
export const selectTaskError = (state: RootState) => state.tasks.error;

export const { getAllTasks, getTask, addTask, patchTask } = taskThunks;
export const { resetCurTask } = taskSlice.actions;
