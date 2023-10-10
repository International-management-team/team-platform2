import { ITimezoneOption } from 'react-timezone-select';

export enum URLS {
  AUTH = 'auth',
  SIGN_UP = `${URLS.AUTH}/users/`,
  SIGN_IN = `${URLS.AUTH}/jwt/create/`,
  USER_ME = `${URLS.AUTH}/users/me/`,
  SET_PASSWORD = `${URLS.AUTH}/users/set_password/`,
  PROJECTS = 'projects/',
}
export const getRouteMemberAdd = (projectId: number) =>
  `${URLS.PROJECTS}${projectId}/add_member/`;
export const getRouteMembers = (projectId: number) =>
  `${URLS.PROJECTS}${projectId}/team/`;

// Auth Types
export type RegisterRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type ProfileRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type UpdatePasswordData = {
  current_password: string;
  new_password: string;
  confirm_password?: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
  timezone?: ITimezoneOption | undefined;
  work_start?: string;
  work_finish?: string;
  // timetable?: unknown;
  photo?: string | null;
  telephone_number?: string;
};

export type TokenType = {
  access: string;
  refresh: string;
};

// Task Types

export type TaskType = {
  id: number;
  name: string;
  deadline: string;
  priority: string;
  status: string;
  description: string;
  assigned_to: UserType[];
};

export type TaskRequestData = {
  name: string;
  deadline: string;
  priority: string;
  status: string;
  description: string;
  assigned_to: UserType[];
};

export function getAPIStatus(statusTitle: string): string {
  switch (statusTitle) {
    case 'Backlog':
      return 'backlog';
    case 'To Do':
      return 'todo';
    case 'In Progress':
      return 'in_progress';
    case 'In Review':
      return 'in_review';
    case 'Done':
      return 'done';
    default:
      return '';
  }
}

export type ColumnType = {
  id: number;
  title: string;
  tasks: TaskType[];
};

// Project Types

export type ProjectRequestData = {
  name: string;
  description: string;
  participants: UserType[];
  tasks: TaskRequestData[];
  start: string;
  deadline: string;
  status: string;
  priority: string;
};

export type ProjectType = {
  id: number;
  owner: UserType;
  name: string;
  description: string;
  participants: UserType[];
  tasks: TaskType[];
  start: string;
  deadline: string;
  status: string;
  priority: string;
};

// Team Types

export type AddMemberRequestData = {
  email: string;
};

export type IntervalType = {
  [time: string]: {
    members_count: number;
    members: UserType[];
  };
};

export type TeamResponseData = {
  total_members: number;
  members: UserType[];
  members_per_interval: IntervalType[];
};
