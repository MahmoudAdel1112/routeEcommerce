'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductResponse } from '@/interfaces/product.interface';
import Item from '../ui/Item';
import SectionTitle from '../ui/SectionTitle';
import { fetchProducts } from '@/lib/products';
import Link from 'next/link';

export default function OurProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data: ProductResponse = await fetchProducts({ page: 3 });
        setProducts(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    getProducts();
  }, []);

  const swiperNavPrevRef = useRef<HTMLDivElement>(null);
  const swiperNavNextRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding">
      <SectionTitle>Our Products</SectionTitle>
      <div className="flex items-center justify-between mt-4 mb-8">
        <h2 className="text-3xl font-semibold">Explore Our Products</h2>
        <div className="flex gap-2">
          <div ref={swiperNavPrevRef} className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <ChevronLeft size={24} color="black" />
          </div>
          <div ref={swiperNavNextRef} className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <ChevronRight size={24} color="black" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      
      <Swiper
        modules={[Grid, Navigation]}
        slidesPerView={4}
        grid={{
          rows: 2,
          fill: 'row',
        }}
        spaceBetween={30}
        navigation={{
          prevEl: swiperNavPrevRef.current,
          nextEl: swiperNavNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = swiperNavPrevRef.current;
            swiper.params.navigation.nextEl = swiperNavNextRef.current;
          }
        }}
        className="h-[800px]"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="pb-8">
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-center my-8">
        <Link href="/allproducts" className="bg-[var(--secondary-two)] text-white px-12 py-4 rounded">
          View All Products
        </Link>
      </div>
    </section>
  );
}
