'use server';

import { Brand } from '@/interfaces/product.interface';

export async function fetchBrands(): Promise<{ data: Brand[] }> {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch brands', error);
    throw new Error('Could not fetch brands.');
  }
}

export async function fetchBrandById(id: string): Promise<{ data: Brand }> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch brand ${id}`, error);
    throw new Error(`Could not fetch brand ${id}.`);
  }
}
