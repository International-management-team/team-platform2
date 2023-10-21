import { request } from '../apiRequest';
import { URLS } from '../types';
import {
  LoginRequestData,
  RegisterRequestData,
  TokenType,
  UpdatePasswordData,
  UserType,
} from './authTypes';

export const authAPI = {
  register: (data: RegisterRequestData): Promise<RegisterRequestData> => {
    return request.post<RegisterRequestData, RegisterRequestData>(
      URLS.SIGN_UP,
      data,
    );
  },

  login: (data: LoginRequestData): Promise<TokenType> => {
    return request.post<TokenType, LoginRequestData>(URLS.SIGN_IN, data);
  },

  getMe: async (): Promise<UserType> => {
    return request.get<UserType>(URLS.USER_ME);
  },

  patchMe: async (data: Partial<UserType>): Promise<UserType> => {
    return request.patch<UserType, Partial<UserType>>(URLS.USER_ME, data);
  },

  setPassword: async (
    data: UpdatePasswordData,
  ): Promise<UpdatePasswordData> => {
    return request.post<UpdatePasswordData, UpdatePasswordData>(
      URLS.SET_PASSWORD,
      data,
    );
  },

  // logout: (): Promise<'OK'> => request.post<'OK', null>(URLS.LOGOUT),
};
