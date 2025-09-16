'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/interfaces/product.interface';
import Item from './Item';
import { fetchMoreProducts } from '@/app/allproducts/actions';

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef(null);

  const loadMoreProducts = useCallback(async () => {
    const nextPage = page + 1;
    const newProducts = await fetchMoreProducts(nextPage);

    if (newProducts.length > 0) {
      setPage(nextPage);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } else {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadMoreProducts]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
      {hasMore && (
        <div ref={loadMoreRef} className="text-center py-8">
          Loading more products...
        </div>
      )}
    </>
  );
}
