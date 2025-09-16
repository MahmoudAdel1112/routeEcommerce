import { Product } from './product.interface';

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: Cart;
}
