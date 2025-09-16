"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import exclusiveImage from "@/assets/images/exclusive.jpeg";
import iphoneImage from "@/assets/images/iphoneImage.jpeg";
import lineImage from "@/assets/images/Line.jpeg";
import { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const categories = [
  { name: "Woman's Fashion", href: "#" },
  { name: "Men's Fashion", href: "#" },
  { name: "Electronics", href: "#" },
  { name: "Home & Lifestyle", href: "#" },
  { name: "Medicine", href: "#" },
  { name: "Sports & Outdoor", href: "#" },
  { name: "Baby's & Toys", href: "#" },
  { name: "Groceries & Pets", href: "#" },
  { name: "Health & Beauty", href: "#" },
];

export default function Categories() {
  const categoriesRef = useRef<HTMLUListElement>(null);
  const [categoriesHeight, setCategoriesHeight] = useState(0);

  useEffect(() => {
    if (categoriesRef.current) {
      setCategoriesHeight(categoriesRef.current.offsetHeight);
    }
  }, []);

  return (
    <section className="px-[135px] py-4">
      <div className="flex gap-4 ">
        <div className="flex h-[344px]">
          <div className="w-[217px] h-[344px] pr-4">
            <ul
              ref={categoriesRef}
              className="flex flex-col justify-between h-full"
            >
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <Link href={category.href} className="hover:underline">
                    {category.name}
                  </Link>
                  {(category.name === "Woman's Fashion" ||
                    category.name === "Men's Fashion") && <ChevronRight />}
                </li>
              ))}
            </ul>
          </div>
          {categoriesHeight > 0 && (
            <div style={{ height: `${categoriesHeight}px` }}>
              <Image
                src={lineImage}
                alt="line"
                className="object-cover h-full"
              />
            </div>
          )}
        </div>
        <div className="max-w-[892px] h-[344px] px-5 flex items-center">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <div className="flex items-center justify-between bg-black text-white p-8 px-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={exclusiveImage}
                      alt="Exclusive Offer"
                      width={50}
                      height={50}
                    />
                    <p className="font-inter">iPhone 14 Series</p>
                  </div>
                  <p className="text-6xl font-inter">Up to 10% off Voucher</p>
                  <a href="#" className="text-lg font-bold underline">
                    Shop Now{" "}
                  </a>
                </div>
                <div>
                  <Image
                    src={iphoneImage}
                    alt="iPhone"
                    width={496}
                    height={352}
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://via.placeholder.com/800x400.png?text=Slide+2"
                alt="Slide 2"
                width={800}
                height={400}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://via.placeholder.com/800x400.png?text=Slide+3"
                alt="Slide 3"
                width={800}
                height={400}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src="https://via.placeholder.com/800x400.png?text=Slide+4"
                alt="Slide 4"
                width={800}
                height={400}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
