'use client';
import Image from "next/image";
import { Heart, Eye, Star } from "lucide-react";
import { Product } from "@/interfaces/product.interface";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted, loading } =
    useWishlist();
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

  return (
    <Link href={`/products/${product._id}`}>
      <div className="group bg-gray-100 p-4 rounded-md relative flex flex-col h-full">
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <div
            className="bg-white rounded-full p-1 shadow-md"
            onClick={handleWishlistClick}
          >
            <Heart
              size={20}
              className={`cursor-pointer ${
                isWishlisted(product._id) ? "text-red-500" : "text-gray-500"
              } hover:text-red-500 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              fill={isWishlisted(product._id) ? "currentColor" : "none"}
            />
          </div>
          <div className="bg-white rounded-full p-1 shadow-md">
            <Eye
              size={20}
              className="cursor-pointer text-gray-500 hover:text-blue-500"
            />
          </div>
        </div>
        <div className="relative w-full h-48 mb-4 rounded-md flex items-center justify-center">
          <Image
            src={product.imageCover}
            alt={product.title}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h3
            className="text-black text-base font-medium mb-1 h-12"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.title}
          </h3>
          <div className="flex-grow" />
          <div>
            <p className="text-[#DB4444] text-lg font-semibold mb-2">
              ${product.price}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex">{renderStars(product.ratingsAverage)}</div>
              <span className="text-sm text-gray-600">
                ({product.ratingsQuantity})
              </span>
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart(product._id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default Item;