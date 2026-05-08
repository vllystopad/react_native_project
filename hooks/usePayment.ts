import { useMutation, useQuery } from '@tanstack/react-query';
import { useStripe } from '@stripe/stripe-react-native';
import { makePayment } from '@/api/payment';
import { useRouter } from 'expo-router';
import { PurchaseData } from '@/types/shop';
import { queries } from '@/common/queries';

export const usePaymentSheet = (purchaseData: PurchaseData) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const router = useRouter();

    const initSheetQuery = useQuery({
        queryFn: async () => {
            // Проверка что data не пусто
            if (!purchaseData.userId || !purchaseData.name || purchaseData.totalPrice === 0) {
                throw new Error('Incomplete purchase data');
            }

            const paymentResponse = await makePayment(purchaseData);

            if (!paymentResponse.clientSecret) {
                throw new Error('No clientSecret received');
            }

            console.log('Initializing payment sheet with clientSecret:', paymentResponse.clientSecret);

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Mobike Shop",
                paymentIntentClientSecret: paymentResponse.clientSecret,
                defaultBillingDetails: {
                    name: purchaseData.name,
                    email: purchaseData.email,
                    address: {
                        city: purchaseData.shippingDetails.city,
                        country: purchaseData.shippingDetails.country,
                        line1: purchaseData.shippingDetails.address,
                        postalCode: purchaseData.shippingDetails.postalCode,
                    }
                }
            });

            if (error) {
                throw new Error(`Payment sheet init failed: ${error.message}`);
            }

            return paymentResponse.clientSecret;
        },
        queryKey: [...queries.payment.paymentSheet, purchaseData.totalPrice],
        retry: 1,
        enabled: !!(purchaseData.userId && purchaseData.name && purchaseData.totalPrice > 0)
    });

    const presentSheetMutation = useMutation({
        mutationFn: async () => {
            if (!initSheetQuery.isSuccess) {
                throw new Error('Payment sheet not initialized');
            }
            const { error } = await presentPaymentSheet();
            if (error) {
                console.error('Payment sheet error:', error);
                throw new Error(`Payment failed: ${error.message}`);
            }
            return { success: true };
        },
        onSuccess: () => {
            console.log('Payment successful!');
            router.push('/private/shop/payment-success');
        },
        onError: (error) => {
            console.error('Payment error:', error);
            router.push('/private/shop/payment-error');
        }
    });

    return {
        openSheet: presentSheetMutation.mutate,
        isInitializing: initSheetQuery.isPending,
        isReady: initSheetQuery.isSuccess,
        isProcessing: presentSheetMutation.isPending,
        error: initSheetQuery.error ?? presentSheetMutation.error,
    };
}