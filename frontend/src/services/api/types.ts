export enum URLS {
  AUTH = 'auth',
  SIGN_UP = `${URLS.AUTH}/users/`,
  SIGN_IN = `${URLS.AUTH}/jwt/create/`,
  USER_ME = `${URLS.AUTH}/users/me/`,
  SET_PASSWORD = `${URLS.AUTH}/users/set_password/`,
  PROJECTS = 'projects/',
}

export const getRouteProject = (projectId: number) =>
  `${URLS.PROJECTS}${projectId}/`;

export const getRouteMemberAdd = (projectId: number) =>
  getRouteProject(projectId) + 'add_member/';

export const getRouteMembers = (projectId: number) =>
  getRouteProject(projectId) + 'team/';
