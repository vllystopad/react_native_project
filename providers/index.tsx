import ThemeProvider from './ThemeProvider';
import APIQueryClientProvider from './QueryClientProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIQueryClientProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </APIQueryClientProvider>
  );
};