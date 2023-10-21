import { request } from '../apiRequest';
import { getRouteTask, getRouteTasks } from '../types';
import { TaskRequestData, TaskType } from './taskTypes';

export const taskAPI = {
  addTask: (data: TaskRequestData, projectId: number): Promise<TaskType> => {
    return request.post<TaskType, TaskRequestData>(
      getRouteTasks(projectId),
      data,
    );
  },

  getTask: (projectId: number, taskId: number): Promise<TaskType> => {
    return request.get<TaskType>(getRouteTask(projectId, taskId));
  },

  getAllTasks: (projectId: number): Promise<TaskType[]> => {
    return request.get<TaskType[]>(getRouteTasks(projectId));
  },

  patchTask: async (
    data: Partial<TaskType>,
    projectId: number,
    taskId: number,
  ): Promise<TaskType> => {
    return request.patch<TaskType, Partial<TaskType>>(
      getRouteTask(projectId, taskId),
      data,
    );
  },
};
