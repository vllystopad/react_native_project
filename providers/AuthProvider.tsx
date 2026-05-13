import { useEffect, useState, type ReactNode } from 'react';
import { useAuthStore } from '@/lib/stores/auth';
import { usePathname, useRouter } from 'expo-router';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !pathname) {
      return;
    }

    const isPrivateRoute = pathname.startsWith('/private');

    if (isLoggedIn) {
      if (!isPrivateRoute && pathname !== '/private') {
        router.replace('/private');
      }
    } else {
      if (isPrivateRoute) {
        router.replace('/login');
      }
    }
  }, [isLoggedIn, isReady, pathname, router]);

  return <>{children}</>;
}
