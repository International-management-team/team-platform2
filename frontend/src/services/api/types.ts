export type RegisterRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type ProfileRequestData = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type UpdatePasswordData = {
  password: string;
  confirm_password: string;
  new_password: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type UserType = {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
  user_timezone?: unknown;
  timetable?: unknown;
  photo?: string;
  telephone_number?: number;
};

export type TokenType = {
  access: string;
  refresh: string;
};

export enum URLS {
  AUTH = 'auth',
  SIGN_UP = `${URLS.AUTH}/users/`,
  SIGN_IN = `${URLS.AUTH}/jwt/create/`,
  USER_ME = `${URLS.AUTH}/users/me/`,
}