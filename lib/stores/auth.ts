import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type User } from '@/common/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
  _hasHydrated: boolean; 
  setHasHydrated: (state: boolean) => void; 
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      _hasHydrated: false,
      setUser: (user: User) =>
        set({ user, isLoggedIn: true }),
      removeUser: () =>
        set({ user: null, isLoggedIn: false }),
      setHasHydrated: (state) => set({ _hasHydrated: state })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
