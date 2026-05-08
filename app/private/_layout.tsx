import { useAuthStore } from "@/lib/stores/auth";
import { Tabs } from "expo-router";

export default function PrivateLayout() {
    const { isLoggedIn } = useAuthStore();
    return (
        <Tabs>
            <Tabs.Protected guard={isLoggedIn}>
                <Tabs.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
                <Tabs.Screen name="shop" options={{ title: "Shop", headerShown: false }} />
            </Tabs.Protected>
        </Tabs>
    );
}
