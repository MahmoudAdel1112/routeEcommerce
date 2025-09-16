// src/lib/data.ts
"use server";

import { Product, ProductResponse } from "@/interfaces/product.interface";

export async function fetchProducts({
  page = 1,
  brandId,
  categoryId,
}: { page?: number, brandId?: string, categoryId?: string } = {}): Promise<ProductResponse> {
  // Placeholder for your actual external API URL
  // IMPORTANT: Store your actual API URL in a .env.local file
  // e.g., EXTERNAL_API_URL=https://api.yourexternalapi.com/data

  let url = `${process.env.NEXT_EXTERNAL_URL}/api/v1/products?limit=10&page=${page}`;
  if (brandId) {
    url += `&brand=${brandId}`;
  }
  if (categoryId) {
    url += `&category=${categoryId}`;
  }

  try {
    const response = await fetch(url,
      {
        // Add any necessary headers, e.g., for API keys
        // headers: {
        //   'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
        // },
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      // Handle non-2xx responses
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in server data fetching function:", error);
    // Re-throw or return a specific error object to be handled by the component
    throw new Error("Could not fetch data from external source.");
  }
}

export async function fetchProductById(id: string): Promise<{ data: Product }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_EXTERNAL_URL}/api/v1/products/${id}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in server data fetching function:", error);
    throw new Error("Could not fetch data from external source.");
  }
}