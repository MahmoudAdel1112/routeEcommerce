"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/interfaces/product.interface";
import Item from "@/components/ui/Item";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";

interface FlashSalesProps {
  products: Product[];
}

const FlashSales: React.FC<FlashSalesProps> = ({ products }) => {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const timeElapsedSinceEpoch = now % threeDaysInMs;
    const timeLeft = threeDaysInMs - timeElapsedSinceEpoch;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const swiperNavPrevRef = useRef<HTMLDivElement>(null);
  const swiperNavNextRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="section-padding mt-16">
        <SectionTitle>Today&apos;s</SectionTitle>
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-end gap-8">
            <h2 className="font-inter font-semibold text-3xl mr-10">
              Flash Sales
            </h2>
            <div className="flex items-end gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">Days</span>
                <span className="font-inter font-bold text-3xl">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--secondary-two)" }}
              >
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">Hours</span>
                <span className="font-inter font-bold text-3xl">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--secondary-two)" }}
              >
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">Minutes</span>
                <span className="font-inter font-bold text-3xl">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--secondary-two)" }}
              >
                :
              </span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium">Seconds</span>
                <span className="font-inter font-bold text-3xl">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
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
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Item product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center my-8">
          <Link
            href="/allproducts"
            className="bg-[var(--secondary-two)] text-white px-12 py-4 rounded"
          >
            View all products
          </Link>
        </div>
      </section>
    </>
  );
};

export default FlashSales;
