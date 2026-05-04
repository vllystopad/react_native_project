import { useRouter } from 'expo-router';
import { Appbar, Button, useTheme } from 'react-native-paper';
import { useThemeMode } from '../../providers/ThemeProvider';

export const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Appbar.Header>
      <Appbar.Content title="Mobike" onPress={() => { router.navigate('/') }} />
      <Button
        mode="text"
        textColor={theme.colors.onSurface}
        onPress={toggleMode}
      >
        {mode === 'light' ? '🌙' : '☀️'}
      </Button>
      <Button
        mode="contained"
        onPress={() => router.navigate('/login')}
      >
        Login
      </Button>
    </Appbar.Header>
  );
};
