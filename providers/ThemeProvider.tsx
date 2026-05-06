import { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { getTheme, colors, ThemeMode } from '../constants/theme';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => { },
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    setMode(systemScheme === 'dark' ? 'dark' : 'light');
  }, [systemScheme]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors(mode).background);
  }, [mode]);

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <ThemeContext.Provider value={{ mode, toggleMode }}>
          <PaperProvider theme={getTheme(mode)}>
            {children}
          </PaperProvider>
        </ThemeContext.Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
