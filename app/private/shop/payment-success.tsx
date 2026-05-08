import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function PaymentSuccessPage(){
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();

    if (!isLoggedIn){ router.navigate('/login') }
    return (
        <View>
            <Text>
                Success asf 
            </Text>
        </View>
    )
}