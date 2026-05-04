import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function RegisterPage(){
    const router = useRouter();
    return (
        <View>
            <Button title="Go to Login" onPress={() => router.navigate('/login')} />
        </View>
    )
}