import { request } from '../apiRequest';
import { getRouteMemberAdd, getRouteMembers } from '../types';
import { AddMemberRequestData, TeamResponseData } from './teamTypes';

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
