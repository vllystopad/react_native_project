import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export type ThemeMode = 'light' | 'dark';

export const colors = (mode: ThemeMode) => {
  const isLight = mode === 'light';
  return {
    primary:         isLight ? '#5A6D57' : '#4D8FD6',
    primaryLight:    isLight ? '#D1D9CF' : '#1A3A6E',
    primaryDark:     isLight ? '#748C70' : '#2A6BB5',
    secondary:       isLight ? '#404040' : '#8EB8E8',
    secondaryLight:  isLight ? '#606060' : '#A0B8D0',
    background:      isLight ? '#FFFFFF' : '#0A1628',
    surface:         isLight ? '#F0F0F0' : '#0F2240',
    surfaceVariant:  isLight ? '#D1D9CF' : '#1A3A6E',
    textPrimary:     isLight ? '#0C0C0C' : '#E0ECFA',
    textSecondary:   isLight ? '#606060' : '#A0B8D0',
    outline:         isLight ? '#ADADAD' : '#4A6B8A',
    error:           '#FF4858',
    success:         '#00966D',
    white:           '#FFFFFF',
  };
};

export const getTheme = (mode: ThemeMode) => {
  const c = colors(mode);
  const base = mode === 'light' ? MD3LightTheme : MD3DarkTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary:             c.primary,
      onPrimary:           mode === 'light' ? '#FFFFFF' : '#0A1628',
      primaryContainer:    c.primaryLight,
      onPrimaryContainer:  mode === 'light' ? '#1A2E18' : '#B8D4F5',
      secondary:           c.secondary,
      onSecondary:         mode === 'light' ? '#FFFFFF' : '#0A1628',
      secondaryContainer:  c.surfaceVariant,
      background:          c.background,
      onBackground:        c.textPrimary,
      surface:             c.surface,
      onSurface:           c.textPrimary,
      surfaceVariant:      c.surfaceVariant,
      onSurfaceVariant:    c.textSecondary,
      outline:             c.outline,
      error:               c.error,
      onError:             '#FFFFFF',
    },
  };
};
