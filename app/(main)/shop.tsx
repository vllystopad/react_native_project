import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function ShopTab(){

    const router = useRouter();
    return (
        <View>
            <Button title="Go to login page" onPress={() => router.navigate('/login')} />
        </View>
    )
}