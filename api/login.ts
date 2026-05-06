import { baseAPI } from '.';
import { type User } from '@/common/types';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await baseAPI.post<LoginResponse>('/customers/login', data);
  return response.data;
};
