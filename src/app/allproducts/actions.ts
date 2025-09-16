'use server';

import { fetchProducts } from '@/lib/products';
import { Product } from '@/interfaces/product.interface';

export async function fetchMoreProducts(page: number): Promise<Product[]> {
  try {
    const data = await fetchProducts({ page });
    return data?.data || [];
  } catch (error) {
    console.error("Error in server action 'fetchMoreProducts':", error);
    return [];
  }
}
