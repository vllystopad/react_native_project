import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function PaymentTab() {

    const router = useRouter();

    return (

        <View>
            <Button title="Go to Login" onPress={() => router.navigate('/login')} />
        </View>
    )
    
}