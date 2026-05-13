import { StripeProvider } from '@stripe/stripe-react-native';
import { type ReactNode } from 'react';

const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY!;

export default function PaymentProvider({children}: {children: ReactNode}){
    return (
        <StripeProvider
            publishableKey={stripeKey}
            urlScheme="myapp"
        >
            {children}
        </StripeProvider>
    )
}