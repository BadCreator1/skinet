import { IAddress } from "./address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}

export interface ItemOrdered {
    productItemId: number;
    productName: string;
    pictureUrl: string;
}

export interface OrderItem {
    id: number;
    itemOrdered: ItemOrdered;
    price: number;
    quantity: number;
    productName: string;
    pictureUrl: string;
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    deliveryMethod: string;
    orderItems: OrderItem[];
    subtotal: number;
    status: number;
    shippingPrice: number;
    paymentIntentId: string;
    total: number;
}