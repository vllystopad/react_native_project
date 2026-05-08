import { baseAPI } from "."
import { PurchaseData } from "@/types/shop";

export const getEmptyPurchaseData = (): PurchaseData => ({
    userId: "",
    name: "",
    email: "",
    paymentDetails: {
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    },
    shippingDetails: {
        address: "",
        city: "",
        postalCode: "",
        country: ""
    },
    products: [],
    totalPrice: 0
});

const mockdata: PurchaseData = {
    "userId": "69fb35f77c633b871466c376",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "paymentDetails": {
        "cardNumber": "4242424242424242",
        "expiryDate": "12/26",
        "cvv": "123"
    },
    "shippingDetails": {
        "address": "123 Main St",
        "city": "New York",
        "postalCode": "10001",
        "country": "USA"
    },
    "products": [
        {
            "id": "69fe11ef8b25be58c77fdb55",
            "name": "Premium T-Shirt",
            "price": 29.99,
            "quantity": 1
        },
        {
            "id": "69fe12028b25be58c77fdb58",
            "name": "Designer Jeans",
            "price": 89.99,
            "quantity": 1
        },
        {
            "id": "69fe120d8b25be58c77fdb5b",
            "name": "Classic Sneakers",
            "price": 149.99,
            "quantity": 1
        }
    ],
    "totalPrice": 269.97
}

export const makePayment = async (purchaseData: PurchaseData) => {
    try {
        console.log('Making payment request with data:', purchaseData);
        const response = await baseAPI.post('/purchase', purchaseData);
        console.log('Payment response:', response.data);

        if (!response.data?.clientSecret) {
            throw new Error('clientSecret not received from server');
        }

        return response.data;
    } catch (error) {
        console.error('Payment request failed:', error);
        throw error;
    }
}