import { Stack } from "expo-router";
import { Providers } from "@/providers";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";


export default function RootLayout() {
    return (
            <Providers>
                <Header />
                <Stack>
                    <Stack.Screen name={"(main)"} options={{ headerShown: false }} />
                    <Stack.Screen name={"(auth)"} options={{ headerShown: false }} />
                </Stack>
                <Footer />
            </Providers>
    )
}