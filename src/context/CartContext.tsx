'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Cart } from '@/interfaces/cart.interface';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateProductQuantity: (productId: string, count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    if (!session) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: session.user.token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCart(data.data);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId: string) => {
    if (!session) {
      toast.error('You must be logged in to add to cart.');
      return;
    }
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: session.user.token,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        fetchCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to add to cart', error);
      toast.error('Failed to add to cart.');
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!session) {
      toast.error('You must be logged in to remove from cart.');
      return;
    }
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          token: session.user.token,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product removed from cart");
        fetchCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to remove from cart', error);
      toast.error('Failed to remove from cart.');
    }
  };

  const clearCart = async () => {
    if (!session) {
      toast.error('You must be logged in to clear cart.');
      return;
    }
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'DELETE',
        headers: {
          token: session.user.token,
        },
      });
      if (res.ok) {
        toast.success("Cart cleared");
        fetchCart();
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to clear cart', error);
      toast.error('Failed to clear cart.');
    }
  };

  const updateProductQuantity = async (productId: string, count: number) => {
    if (!session) {
      toast.error('You must be logged in to update cart.');
      return;
    }
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: session.user.token,
        },
        body: JSON.stringify({ count }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Product quantity updated");
        fetchCart();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Failed to update product quantity', error);
      toast.error('Failed to update product quantity.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, updateProductQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
