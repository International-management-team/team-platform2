import { UserType } from '../auth/authTypes';
import { TaskRequestData, TaskType } from '../task/taskTypes';

export type ProjectRequestData = {
  name: string;
  description: string;
  participants: UserType[];
  tasks: TaskRequestData[];
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
  participants: UserType[];
  tasks: TaskType[];
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

export type ProjectPriority = 'maximum' | 'medium' | 'minimum';

type ProjectPriorityMapper = Record<ProjectPriority, string>;
export const projectPriorityMapper: ProjectPriorityMapper = {
  maximum: 'Высокий',
  medium: 'Средний',
  minimum: 'Низкий',
};
