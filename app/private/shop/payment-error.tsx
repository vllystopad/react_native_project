import { Text, View } from "react-native";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "expo-router";

export default function PaymentErrorPage(){
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();
    if (!isLoggedIn){ router.navigate('/login') }
    return (
        <View>
            <Text>
                Error page
            </Text>
        </View>
    )
}