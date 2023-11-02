import { UserType } from '../auth/authTypes';

export type AddMemberRequestData = {
  email: string;
};

export type ResponseIntervalType = {
  [time: string]: {
    members_count: number;
    members: UserType[];
  };
};

export type IntervalType = {
  time: string;
  membersCount: number;
  members: UserType[];
};

export type TeamResponseData = {
  total_members: number;
  members: UserType[];
  members_per_interval: ResponseIntervalType[];
};
