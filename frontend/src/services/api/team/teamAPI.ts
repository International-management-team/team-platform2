import { request } from '../apiRequest';
import { getRouteMemberAdd, getRouteMembers } from '../types';
import {
  AddMemberRequestData,
  IntervalType,
  ResponseIntervalType,
  TeamResponseData,
} from './teamTypes';

export const teamAPI = {
  addMember: (
    projectId: number,
    requestData: AddMemberRequestData,
  ): Promise<AddMemberRequestData> => {
    return request.post<AddMemberRequestData, AddMemberRequestData>(
      getRouteMemberAdd(projectId),
      requestData,
    );
  },
  getMembers: (projectId: number): Promise<TeamResponseData> => {
    return request.get<TeamResponseData>(getRouteMembers(projectId));
  },
};

export function createArrayFromIntervals(
  intervals: ResponseIntervalType[],
): IntervalType[] {
  return intervals.map((interval) => {
    return {
      time: Object.keys(interval)[0],
      members: interval[Object.keys(interval)[0]].members,
      membersCount: interval[Object.keys(interval)[0]].members_count,
    };
  });
}
