import { useRouter } from "expo-router";
import { Button, View } from "react-native";

// makes sense to add biometric check when doing payment (to confirm that real person makes a payment)
export default function PaymentTab() {
    const router = useRouter();
    return (
        <View>
            <Button title="Go to Login" onPress={() => router.navigate('/login')} />
        </View>
    )
}