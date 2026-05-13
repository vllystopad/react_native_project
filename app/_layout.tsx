import { SplashScreen, Slot } from 'expo-router';
import { Providers } from '@/providers';
import { useAuthStore } from '@/lib/stores/auth';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { _hasHydrated } = useAuthStore();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!_hasHydrated) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <Providers>
      <Slot />
    </Providers>
  );
}
 