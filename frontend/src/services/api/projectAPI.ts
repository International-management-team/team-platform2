import { request } from './apiRequest';
import { URLS, ProjectType, ProjectRequestData } from './types';

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
