import { request } from './apiRequest';
import {
  AddMemberRequestData,
  TeamResponseData,
  getRouteMemberAdd,
  getRouteMembers,
} from './types';

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
