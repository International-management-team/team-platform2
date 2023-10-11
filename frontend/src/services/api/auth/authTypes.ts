import { ITimezoneOption } from 'react-timezone-select';

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
  current_password: string;
  new_password: string;
  confirm_password?: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type UserType = {
  id: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  created_at?: string;
  update_at?: string;
  is_active?: boolean;
  timezone?: ITimezoneOption | undefined;
  work_start?: string;
  work_finish?: string;
  photo?: string;
  telephone_number?: string;
};

export type TokenType = {
  access: string;
  refresh: string;
};
