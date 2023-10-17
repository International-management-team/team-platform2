import { UserType } from '../auth/authTypes';

export type ProjectRequestData = {
  name: string;
  description: string;
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
  start: string;
  deadline: string;
  status: string;
  priority: string;
};
