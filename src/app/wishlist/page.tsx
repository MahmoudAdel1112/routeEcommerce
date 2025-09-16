'use client';

import { useWishlist } from "@/hooks/useWishlist";
import Item from "@/components/ui/Item";
import SectionTitle from "@/components/ui/SectionTitle";
import { fetchProducts } from "@/lib/products";
import { Product } from "@/interfaces/product.interface";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const { wishlist, loading } = useWishlist();
  const [justForYou, setJustForYou] = useState<Product[]>([]);

  useEffect(() => {
    const getJustForYouProducts = async () => {
      const productsResponse = await fetchProducts({ page: 1 });
      setJustForYou(productsResponse.data.slice(0, 4));
    };
    getJustForYouProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h6 className="text-xl font-semibold mb-4">
        Wishlist ({wishlist.length})
      </h6>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
      <div className="mt-16">
        <SectionTitle>Just for you</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {justForYou.map((product) => (
            <Item key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}