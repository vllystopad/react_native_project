import { SplashScreen } from 'expo-router';
import { Providers } from '@/providers';
import { useAuthStore } from '@/lib/stores/auth';
import { Header } from '@/components/ui/header';
import {Stack} from 'expo-router';
import { Footer } from '@/components/ui/footer';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

// 2. payment 
// 3. если не доделаю то в конце добавить кастомный сплеш скрин
// 4. splash screen - экран который появляется во время загрузки приложения 
// и еще до того как появляются страницы приложения 
// и его можно кастомизировать 

// header creates space 

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
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
 