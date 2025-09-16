"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Product } from "@/interfaces/product.interface";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    if (!session) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers: {
            token: session.user.token,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWishlist(data.data);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: string) => {
    if (!session) {
      toast.error("You must be logged in to add to wishlist.");
      return;
    }
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: session?.user?.token,
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchWishlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      toast.error("Failed to add to wishlist.");
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!session) {
      toast.error("You must be logged in to remove from wishlist.");
      return;
    }
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: {
            token: session.user.token,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchWishlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove from wishlist.");
    }
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((product) => product._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
