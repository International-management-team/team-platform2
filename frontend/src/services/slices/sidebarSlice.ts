import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SidebarContent {
  TASK = 'TASK',
  PROJECT = 'PROJECT',
}

interface SidebarState {
  content?: SidebarContent;
  isOpenSidebar: boolean;
}

const initialState: SidebarState = {
  isOpenSidebar: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openSidebar: (state, action: PayloadAction<SidebarContent>) => {
      state.isOpenSidebar = true;
      state.content = action.payload;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
      state.content = undefined;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export const selectSidebarContent = (state: RootState) => state.sidebar.content;
