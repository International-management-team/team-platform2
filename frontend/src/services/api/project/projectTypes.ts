import { UserType } from '../auth/authTypes';
import { TaskRequestData, TaskType } from '../task/taskTypes';

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
