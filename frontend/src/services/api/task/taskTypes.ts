import { UserType } from '../auth/authTypes';

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
  status: TaskStatus;
  description: string;
  assigned_to: UserType[];
};

export type TaskStatus =
  | 'Backlog'
  | 'To Do'
  | 'In Progress'
  | 'In Review'
  | 'Done';

type StatusMapper = Record<TaskStatus, string>;
export const statusMapper: StatusMapper = {
  Backlog: 'backlog',
  Done: 'done',
  'In Progress': 'in_progress',
  'In Review': 'in_review',
  'To Do': 'todo',
};

export type ColumnType = {
  id: number;
  title: TaskStatus;
  tasks: TaskType[];
};
