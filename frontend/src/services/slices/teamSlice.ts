import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type {
  AddMemberRequestData,
  TeamResponseData,
  UserType,
} from '../api/types';
import { teamAPI } from '../api/teamAPI';

// Types

type TeamStateType = {
  allMembers: UserType[] | null;
  isLoading: boolean;
  error: null | unknown | string;
};

// State

const initialState: TeamStateType = {
  allMembers: [],
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
  reducers: {},
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
      // get all projects
      .addCase(teamThunks.getMembers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        teamThunks.getMembers.fulfilled,
        (state, action: PayloadAction<TeamResponseData>) => {
          state.isLoading = false;
          state.error = false;
          state.allMembers = action.payload.members;
        },
      )
      .addCase(
        teamThunks.getMembers.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.error = action.payload;
          state.allMembers = null;
        },
      );
  },
});

export const selectMembers = (state: RootState) => state.team.allMembers;
export const selectTeamIsLoading = (state: RootState) => state.team.isLoading;
export const selectTeamError = (state: RootState) => state.team.error;

export const { addMember, getMembers } = teamThunks;
