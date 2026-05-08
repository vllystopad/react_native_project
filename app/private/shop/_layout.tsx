import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: 'index'
}

export default function ShopLayout(){
    return <Stack>
                <Stack.Screen name="payment-error" options={{ headerShown: false }} />
                <Stack.Screen name="payment-success" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }}  />
            </Stack>
}
