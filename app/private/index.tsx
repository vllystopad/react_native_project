import { useRouter } from "expo-router";
import { View, Button } from "react-native";

export default function Dashboard() {
    const router = useRouter();
    return (
        <Button title="Go to Login" onPress={() => router.navigate('/login')} />
    );
}
