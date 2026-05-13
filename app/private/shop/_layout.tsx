import { Stack } from "expo-router";

export default function ShopLayout(){
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}  />
            <Stack.Screen name="payment-error" options={{ headerShown: false }} />
            <Stack.Screen name="payment-success" options={{ headerShown: false }} />
        </Stack>
    )
}
