import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { login, LoginData } from '@/api/login';
import { register, type RegisterData } from '@/api/register';
import { logout } from '@/api/logout';
import { useAuthStore } from '@/lib/stores/auth';
import { ACCESS_TOKEN } from '@/common/store-keys';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN, data.token);
      setUser(data.user);
      router.replace('/private');
    },
  });

  return { login: mutate, isPending, error };
};

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: async (data) => {
      await SecureStore.setItemAsync(ACCESS_TOKEN, data.token);
      setUser(data.user);
      router.replace('/private');
    },
  });

  return { register: mutate, isPending, error };
};

export const useLogout = () => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const clear = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    removeUser();
    router.replace('/login');
  };

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: clear,
    onError: clear,
  });

  return { logout: mutate, isPending };
};
