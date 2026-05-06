import { baseAPI } from '.';
import { type User } from '@/common/types';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await baseAPI.post<RegisterResponse>('/customers', data);
  return response.data;
};
