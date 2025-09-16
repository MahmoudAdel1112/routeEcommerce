'use client';

import { useState } from "react";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";
import { Star, Heart, Minus, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/context/CartContext";

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<Star key={i} size={16} fill="gold" stroke="gold" />);
    } else if (rating >= i + 0.5) {
      stars.push(<Star key={i} size={16} fill="gold" stroke="gold" />); // Half star, but lucide-react doesn't have half star, so full for now
    } else {
      stars.push(<Star key={i} size={16} fill="none" stroke="gold" />);
    }
  }
  return stars;
};

export default function ProductDetails({ product }: { product: Product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isWishlisted, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (loading) return;
    if (isWishlisted(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-row gap-4 h-96">
        <div className="h-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="mySwiper h-full"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-24 h-24">
                  <Image
                    src={img}
                    alt={`${product.title} image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="h-full flex-grow">
          <Swiper
            direction="vertical"
            spaceBetween={10}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[Navigation, Thumbs]}
            className="mySwiper2 h-full"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${product.title} image ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-sm text-gray-600">
            ({product.ratingsQuantity} ratings)
          </span>
        </div>
        <p className="text-2xl font-semibold text-[#DB4444] mb-4">
          ${product.price}
        </p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        
        <div className="mb-4">
          <p className="font-semibold mb-2">Color</p>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer border-2 border-transparent hover:border-black"></div>
            <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer border-2 border-transparent hover:border-black"></div>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Size</p>
          <div className="flex gap-2">
            <div className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-200">S</div>
            <div className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-200">M</div>
            <div className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-200">L</div>
            <div className="w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer hover:bg-gray-200">XL</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center border rounded-md">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2">
              <Minus size={16} />
            </button>
            <span className="px-4">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="p-2">
              <Plus size={16} />
            </button>
          </div>
          <button onClick={() => addToCart(product._id)} className="bg-[#DB4444] text-white px-8 py-2 rounded-md">Add to Cart</button>
          <div className="p-2 border rounded-md cursor-pointer" onClick={handleWishlistClick}>
            <Heart size={20} fill={isWishlisted(product._id) ? "currentColor" : "none"} />
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="font-semibold">Free delivery</p>
              <p className="text-sm text-gray-600">Enter your postal code for delivery availability</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-semibold">Return delivery</p>
              <p className="text-sm text-gray-600">Free 30 days delivery returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}