"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CategoriesResponse,
  Category,
} from "@/interfaces/categories.interfaces";
import CategoryItem from "../ui/CategoryItem";
import SectionTitle from "../ui/SectionTitle";
import { fetchCategories } from "@/lib/categories";

export default function BrowseByCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data: CategoriesResponse = await fetchCategories();
        setCategories(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    getCategories();
  }, []);

  const swiperNavPrevRef = useRef<HTMLDivElement>(null);
  const swiperNavNextRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding">
      <SectionTitle>Categories</SectionTitle>
      <div className="flex items-center justify-between mt-4 mb-8">
        <h2 className="text-3xl font-semibold">Browse by category</h2>
        <div className="flex gap-2">
          <div
            ref={swiperNavPrevRef}
            className="bg-gray-200 p-2 rounded-full cursor-pointer"
          >
            <ChevronLeft size={24} color="black" />
          </div>
          <div
            ref={swiperNavNextRef}
            className="bg-gray-200 p-2 rounded-full cursor-pointer"
          >
            <ChevronRight size={24} color="black" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={6}
        navigation={{
          prevEl: swiperNavPrevRef.current,
          nextEl: swiperNavNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = swiperNavPrevRef.current;
            swiper.params.navigation.nextEl = swiperNavNextRef.current;
          }
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <CategoryItem category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
