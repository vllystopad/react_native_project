import { useAuthStore } from "@/lib/stores/auth";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { queries } from "@/common/queries";
import { currentUser } from "@/api/currentUser";
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { CURRENT_USER_STALE_TIME } from "@/constants/auth";
import { Header } from "./ui/header";
import { Footer } from "./ui/footer";
import { Stack } from "expo-router";

export default function AppInit() {
  const { isLoggedIn, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: queries.auth.currentUser,
    queryFn: currentUser,
    enabled: isLoggedIn,
    refetchInterval: CURRENT_USER_STALE_TIME,
    staleTime: CURRENT_USER_STALE_TIME,
  });

  useEffect(() => {
    if (userData?.customer) {
      setUser(userData.customer);
    }
  }, [userData]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoggedIn) {
      queryClient.removeQueries({ queryKey: queries.auth.currentUser });
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      <Footer />
    </>
  );
}
