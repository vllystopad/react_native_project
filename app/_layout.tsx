import { SplashScreen } from 'expo-router';
import { Providers } from '@/providers';
import { useAuthStore } from '@/lib/stores/auth';
import {Stack} from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { _hasHydrated } = useAuthStore();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!_hasHydrated){
    return <ActivityIndicator style={{ flex: 1 }} />
  }

  return (
    <Providers>
      <Stack>
          <Stack.Screen name="private" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
 