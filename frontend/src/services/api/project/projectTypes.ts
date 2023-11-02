import { UserType } from '../auth/authTypes';

export type ProjectRequestData = {
  name: string;
  description: string;
  start: string;
  deadline: string;
  status: ProjectStatus;
  priority: string;
};

export type ProjectType = {
  id: number;
  owner: UserType;
  name: string;
  description: string;
  start: string;
  deadline: string;
  status: string;
  priority: ProjectPriority;
};

export type ProjectStatus =
  | 'Backlog'
  | 'To Do'
  | 'In Progress'
  | 'In Review'
  | 'Done';

type ProjectStatusMapper = Record<ProjectStatus, string>;
export const projectStatusMapper: ProjectStatusMapper = {
  Backlog: 'backlog',
  Done: 'done',
  'In Progress': 'in_progress',
  'In Review': 'in_review',
  'To Do': 'todo',
};

export type ProjectPriority = 'maximum' | 'average' | 'minimum';

type ProjectPriorityMapper = Record<ProjectPriority, string>;
export const projectPriorityMapper: ProjectPriorityMapper = {
  maximum: 'Высокий',
  average: 'Средний',
  minimum: 'Низкий',
};
