import { useRouter } from "expo-router";
import { Button, View, Text } from "react-native";
import PaymentProvider from "@/providers/StripeProvider";
import { useMemo } from "react";
import { PurchaseData } from "@/types/shop";
import { usePaymentSheet } from "@/hooks/usePayment";
import { useAuthStore } from "@/lib/stores/auth";

// Моковые товары для тестирования платежки
const mockProducts = [
    {
        id: "69fe11ef8b25be58c77fdb55",
        name: "Premium T-Shirt",
        price: 29,
        quantity: 1
    },
    {
        id: "69fe12028b25be58c77fdb58",
        name: "Designer Jeans",
        price: 89,
        quantity: 1
    },
    {
        id: "69fe120d8b25be58c77fdb5b",
        name: "Classic Sneakers",
        price: 149,
        quantity: 1
    }
];


// либо task manager (https://github.com/stripe/stripe-react-native/issues/1981#issuecomment-3189304985)
// // if (Platform.OS === 'android') {
//     function stripeHeadlessTask() {
//       return new Promise(() => {});
//     }

//     AppRegistry.registerHeadlessTask(
//       'StripeKeepJsAwakeTask',
//       () => stripeHeadlessTask
//     );
//   }
// //
//
//
//
//
//
//

export default function ShopTab() {
    const { user } = useAuthStore();

    const totalPrice = useMemo(() => {
        const sum = mockProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        // Round to 2 decimal places to avoid floating point errors
        return Math.round(sum * 100) / 100;
    }, []);

    const billingDetails = useMemo<PurchaseData>(() => ({
        userId: user?._id || "69fb35f77c633b871466c376",
        name: user?.firstName.concat(user?.lastName) || "John Doe",
        email: user?.email || "tester@gmail.com",
        paymentDetails: {
            cardNumber: "4242424242424242",
            expiryDate: "12/26",
            cvv: "123"
        },
        shippingDetails: {
            address: "123 Main St",
            city: "New York",
            postalCode: "10001",
            country: "USA"
        },
        products: mockProducts,
        totalPrice: totalPrice
    }), [user, totalPrice]);

    const { openSheet, isInitializing, isReady, isProcessing, error } = usePaymentSheet(billingDetails);

    return (
        <PaymentProvider>
            <View style={{ padding: 20, gap: 10 }}>
                {error && (
                    <Text style={{ color: 'red', marginBottom: 10 }}>
                        Error: {error instanceof Error ? error.message : String(error)}
                    </Text>
                )}
                <Button
                    title={`Purchase (${totalPrice.toFixed(2)}$)`}
                    disabled={isInitializing || !isReady || isProcessing}
                    onPress={() => openSheet()}
                />
                {isInitializing && <Text>Initializing payment...</Text>}
                {isProcessing && <Text>Processing payment...</Text>}
            </View>
        </PaymentProvider>
    )
}