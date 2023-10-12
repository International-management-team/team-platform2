import { request } from '../apiRequest';
import { URLS } from '../types';
import { ProjectRequestData, ProjectType } from './projectTypes';

export const projectAPI = {
  addProject: (data: ProjectRequestData): Promise<ProjectType> => {
    return request.post<ProjectType, ProjectRequestData>(URLS.PROJECTS, data);
  },

  getProject: (id: number): Promise<ProjectType> => {
    return request.get<ProjectType>(URLS.PROJECTS + id);
  },

  getAllProjects: (): Promise<ProjectType[]> => {
    return request.get<ProjectType[]>(URLS.PROJECTS);
  },
};
