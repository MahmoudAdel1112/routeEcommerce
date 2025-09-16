import { Product, ProductResponse } from "@/interfaces/product.interface";
import Item from "../ui/Item";
import SectionTitle from "../ui/SectionTitle";
import { fetchProducts } from "@/lib/products";
import Link from "next/link";

export default async function BestSellingProducts() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const data: ProductResponse = await fetchProducts({ page: 5 });
    products = data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  return (
    <section className="section-padding">
      <SectionTitle>This Month</SectionTitle>
      <div className="flex items-center justify-between mt-4 mb-8">
        <h2 className="text-3xl font-semibold">Best Selling Products</h2>
        <Link
          href="/allproducts"
          className="bg-[var(--secondary-two)] text-white px-12 py-4 rounded"
        >
          View all
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
