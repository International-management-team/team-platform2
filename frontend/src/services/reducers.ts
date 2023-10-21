import { combineReducers } from 'redux';
import { authSlice } from 'src/services/api/auth/authSlice';
import { projectSlice } from './api/project/projectSlice';
import { headerSlice } from './slices/headerSlice';
import { popupSlice } from './slices/popupSlice';
import { sidebarSlice } from './slices/sidebarSlice';
import { teamSlice } from './api/team/teamSlice';
import { taskSlice } from './api/task/taskSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  projects: projectSlice.reducer,
  team: teamSlice.reducer,
  tasks: taskSlice.reducer,

  header: headerSlice.reducer,
  popup: popupSlice.reducer,
  sidebar: sidebarSlice.reducer,
});
