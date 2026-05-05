import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { login } from '@/api/login';
import { register, type RegisterData } from '@/api/register';
import { logout } from '@/api/logout';
import { currentUser } from '@/api/currentUser';
import { useAuthStore } from '@/lib/stores/auth';
import { ACCESS_TOKEN } from '@/common/store-keys';
import { getAccessToken } from '@/common/utils';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      const token = getAccessToken(data.token);
      await SecureStore.setItemAsync(ACCESS_TOKEN, token);
      const userData = await currentUser();
      setUser(userData.customer);

      router.replace('/(main)');
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
      setUser(data.customer);
      router.replace('/(main)');
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
