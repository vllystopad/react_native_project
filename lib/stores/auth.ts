import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type User } from '@/common/types';
import { getItem, setItem, deleteItemAsync } from 'expo-secure-store';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User) => void;
  setLoggedIn: () => void;
  removeUser: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setUser: (user: User) =>
        set({ user, isLoggedIn: true }),
      setLoggedIn: () =>
        set({ isLoggedIn: true }),
      removeUser: () =>
        set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
