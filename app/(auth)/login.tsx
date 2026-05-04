import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function LoginPage(){
    const router = useRouter();
    return (
        <View>
            <Button title="Go to Register" onPress={() => router.navigate('/register')} />
        </View>
    )    
}