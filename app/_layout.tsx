import { SplashScreen } from 'expo-router';
import { Providers } from '@/providers';
import AppInit from '@/components/AppInit';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Providers>
      <AppInit />
    </Providers>
  );
}
