import { Redirect } from "expo-router";
import { useAuthStore } from "@/lib/stores/auth";

export default function Root(){
    const { isLoggedIn } = useAuthStore();
    const path = isLoggedIn ? '/' : '/login'
  return <Redirect href={path} />;
}