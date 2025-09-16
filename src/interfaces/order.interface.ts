import { CartItem } from './cart.interface';
import { User } from 'next-auth';

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  user: User;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}
