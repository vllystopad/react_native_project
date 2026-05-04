import { Tabs } from "expo-router";

export default function MainLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
            <Tabs.Screen name="shop" options={{ title: "Shop" }} />
            <Tabs.Screen name="payment" options={{ title: "Payment" }} />
        </Tabs>
    );
}
