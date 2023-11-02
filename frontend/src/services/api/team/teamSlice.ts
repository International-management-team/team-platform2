import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { createArrayFromIntervals, teamAPI } from './teamAPI';
import {
  AddMemberRequestData,
  IntervalType,
  TeamResponseData,
} from './teamTypes';
import { UserType } from '../auth/authTypes';

// Types

type TeamStateType = {
  allMembers: UserType[];
  membersPerInterval: IntervalType[];
  selectedIntervalIndex?: number;
  isLoading: boolean;
  error: null | unknown | string;
};

// State

const initialState: TeamStateType = {
  allMembers: [],
  membersPerInterval: [],
  isLoading: false,
  error: null,
};

export const teamThunks = {
  addMember: createAsyncThunk(
    'team/add',
    async (
      requestData: { projectId: number; addMemberData: AddMemberRequestData },
      { dispatch },
    ) => {
      const response = await teamAPI.addMember(
        requestData.projectId,
        requestData.addMemberData,
      );
      dispatch(getMembers(requestData.projectId));
      return response;
    },
  ),

  getMembers: createAsyncThunk('team/members', async (projectId: number) => {
    const members = await teamAPI.getMembers(projectId);
    return members;
  }),
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    selectInterval: (state, action: PayloadAction<number>) => {
      state.selectedIntervalIndex = action.payload;
    },
    resetSelectedInterval: (state) => {
      state.selectedIntervalIndex = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // add member
      .addCase(teamThunks.addMember.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(teamThunks.addMember.fulfilled, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(
        teamThunks.addMember.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )
      // get all members
      .addCase(teamThunks.getMembers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.allMembers = [];
        state.membersPerInterval = [];
        state.selectedIntervalIndex = undefined;
      })
      .addCase(
        teamThunks.getMembers.fulfilled,
        (state, action: PayloadAction<TeamResponseData>) => {
          state.isLoading = false;
          state.error = false;
          state.allMembers = action.payload.members;
          state.membersPerInterval = createArrayFromIntervals(
            action.payload.members_per_interval,
          );
        },
      )
      .addCase(
        teamThunks.getMembers.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.allMembers = [];
          state.membersPerInterval = [];
          state.selectedIntervalIndex = undefined;
        },
      );
  },
});

export const selectIntervals = (state: RootState) =>
  state.team.membersPerInterval;
export const selectSelectedInterval = (state: RootState) =>
  state.team.selectedIntervalIndex;
export const selectMembers = (state: RootState) => state.team.allMembers;
export const selectTeamIsLoading = (state: RootState) => state.team.isLoading;
export const selectTeamError = (state: RootState) => state.team.error;

export const { addMember, getMembers } = teamThunks;

export const { selectInterval, resetSelectedInterval } = teamSlice.actions;
