import { UserType } from '../auth/authTypes';

export type TaskType = {
  id: number;
  name: string;
  deadline: string;
  priority: TaskPriority;
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
  | 'Todo'
  | 'In progress'
  | 'In review'
  | 'Done';

type TaskStatusMapper = Record<TaskStatus, string>;
export const taskStatusMapper: TaskStatusMapper = {
  Backlog: 'backlog',
  Done: 'done',
  'In progress': 'in_progress',
  'In review': 'in_review',
  Todo: 'todo',
};

export type ColumnType = {
  id: number;
  title: string;
  status: TaskStatus;
  tasks: TaskType[];
};

export type TaskPriority = 'maximum' | 'average' | 'minimum';

type TaskPriorityMapper = Record<TaskPriority, string>;
export const taskPriorityMapper: TaskPriorityMapper = {
  maximum: 'Высокий',
  average: 'Средний',
  minimum: 'Низкий',
};
