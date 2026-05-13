import { useRouter } from "expo-router";
import { Button } from "react-native";
import { useAuthStore } from '@/lib/stores/auth';
import { useLogout } from '@/hooks/useAuth';

export default function Dashboard() {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();
    const { logout } = useLogout();

    return (
        <Button
            title={isLoggedIn ? 'Logout' : 'Login'}
            onPress={() => {
                if (isLoggedIn) {
                    logout();
                } else {
                    router.navigate('/login');
                }
            }}
        />
    );
}
