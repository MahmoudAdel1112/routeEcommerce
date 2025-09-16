import { fetchProducts } from "@/lib/products";
import { ProductResponse } from "@/interfaces/product.interface";
import ProductList from "@/components/ui/ProductList";

export default async function AllProductsPage() {
  let data: ProductResponse | null = null;
  let error = null;

  try {
    // Fetch initial page
    data = await fetchProducts({ page: 1 });
  } catch (err: unknown) {
    error = err instanceof Error ? err.message : String(err);
  }

  const initialProducts = data?.data || [];

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="section-padding">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
