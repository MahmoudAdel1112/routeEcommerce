'use server';

import { Category, CategoriesResponse } from '@/interfaces/categories.interfaces';

export async function fetchCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_EXTERNAL_URL}/api/v1/categories`,
      {
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in server data fetching function:", error);
    throw new Error("Could not fetch categories from external source.");
  }
}

export async function fetchCategoryById(id: string): Promise<{ data: Category }> {
  try {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch category ${id}`, error);
    throw new Error(`Could not fetch category ${id}.`);
  }
}