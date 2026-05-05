import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useAuthStore } from '@/lib/stores/auth';
import { ACCESS_TOKEN } from '@/common/store-keys';

const baseUrl = process.env.SERVER_BASE_URL ?? 'http://localhost:4000/api';

export const baseAPI = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
});

baseAPI.interceptors.request.use(async (request) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
}, (error) => Promise.reject(error));

baseAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      const { removeUser } = useAuthStore.getState();
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      removeUser();
      router.replace('/login');
    }
    // Reject — do NOT retry, otherwise 401 causes infinite loop
    return Promise.reject(error);
  }
);
