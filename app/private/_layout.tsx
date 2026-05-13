import { useAuthStore } from "@/lib/stores/auth";
import { Redirect, Tabs } from "expo-router";

export default function PrivateLayout() {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
            <Tabs.Screen name="shop" options={{ title: "Shop", headerShown: false }} />
        </Tabs>
    );
}
