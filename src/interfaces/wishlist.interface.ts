import { Product } from './product.interface';

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}
