import ThemeProvider from './ThemeProvider';
import APIQueryClientProvider from './QueryClientProvider';
import AuthProvider from './AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIQueryClientProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </APIQueryClientProvider>
  );
};