import { type ShippingDetails } from "./shipping";
import { type PaymentDetails } from "./payment";

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface PurchaseData {
    userId: string;
    name: string;
    email: string;
    paymentDetails: PaymentDetails;
    shippingDetails: ShippingDetails;
    products: Product[];
    totalPrice: number;
}