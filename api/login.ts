import { baseAPI } from '.';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: { _id: string; password: string };
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await baseAPI.post<LoginResponse>('/auth/login', data);
  return response.data;
};
