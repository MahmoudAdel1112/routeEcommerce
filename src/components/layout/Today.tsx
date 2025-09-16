import React from "react";

import Item from "@/components/ui/Item";
import { Product } from "@/interfaces/product.interface";

interface TodayProps {
  products: Product[];
}

export default function Today({ products }: TodayProps) {
  return (
    <div className="section-padding">
      {products.length === 0 ? (
        <p className="text-red-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
