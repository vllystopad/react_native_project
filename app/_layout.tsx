import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    return (
        <View style={{ flex: 1 }}>
            {/* <Header /> */}
            <Stack>
                <Stack.Screen name={"(main)"} options={{ headerShown: false }} />
                <Stack.Screen name={"(auth)"} options={{ headerShown: false }} />
            </Stack>

            {/* <Footer /> */}
        </View>
    )
}