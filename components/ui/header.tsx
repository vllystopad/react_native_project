import { useRouter } from 'expo-router';
import { Appbar, Button, useTheme } from 'react-native-paper';
import { useThemeMode } from '../../providers/ThemeProvider';
import { useAuthStore } from '@/lib/stores/auth';
import { useLogout } from '@/hooks/useAuth';

export const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();
  const { isLoggedIn } = useAuthStore();
  const { logout } = useLogout();

  return (
    <Appbar.Header>
      <Appbar.Content title="Mobike" onPress={() => { router.navigate('/login') }} />
        <Button
        mode="text"
        textColor={theme.colors.onSurface}
        onPress={toggleMode}
      >
        {mode === 'light' ? '🌙' : '☀️'}
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          if (isLoggedIn){
            logout();
            router.navigate('/private')
          } else {
            router.navigate('/login')
          }
        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>
    </Appbar.Header>
  );
};
