import { fetchProductById, fetchProducts } from "@/lib/products";
import ProductDetails from "@/components/ui/ProductDetails";
import SectionTitle from "@/components/ui/SectionTitle";
import Item from "@/components/ui/Item";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = await fetchProductById(params.id);
  const { data: relatedProducts } = await fetchProducts({ page: 1 });

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <div className="mt-16">
        <SectionTitle>Related Items</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <Item key={relatedProduct._id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}