import { request } from '../apiRequest';
import { URLS, getRouteProject } from '../types';
import { ProjectRequestData, ProjectType } from './projectTypes';

export const projectAPI = {
  addProject: (data: ProjectRequestData): Promise<ProjectType> => {
    return request.post<ProjectType, ProjectRequestData>(URLS.PROJECTS, data);
  },

  getProject: (id: number): Promise<ProjectType> => {
    return request.get<ProjectType>(getRouteProject(id));
  },

  getAllProjects: (): Promise<ProjectType[]> => {
    return request.get<ProjectType[]>(URLS.PROJECTS);
  },

  patchProject: (patchData: {
    projectData: Partial<ProjectType>;
    projectId: number;
  }): Promise<ProjectType> => {
    return request.patch<ProjectType, Partial<ProjectType>>(
      getRouteProject(patchData.projectId),
      patchData.projectData,
    );
  },
};
