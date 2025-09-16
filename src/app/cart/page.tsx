'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CartPage() {
  const { cart, loading, removeFromCart, updateProductQuantity } = useCart();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item) => (
              <tr key={item.product._id} className="border-b">
                <td className="p-2 flex items-center gap-4">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <span>{item.product.title}</span>
                </td>
                <td className="p-2">${item.price}</td>
                <td className="p-2">
                  <div className="flex items-center border rounded-md w-min">
                    <button
                      onClick={() => updateProductQuantity(item.product._id, item.count - 1)}
                      className="p-2"
                      disabled={item.count <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.count}</span>
                    <button
                      onClick={() => updateProductQuantity(item.product._id, item.count + 1)}
                      className="p-2"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-2">${item.price * item.count}</td>
                <td className="p-2">
                  <button onClick={() => removeFromCart(item.product._id)}>
                    <X size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/" className="border border-gray-400 px-8 py-3 rounded-md">
          Return to Shop
        </Link>
        <button onClick={() => {}} className="border border-gray-400 px-8 py-3 rounded-md">
          Update Cart
        </button>
      </div>

      <div className="flex justify-between items-start mt-16">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border border-gray-400 p-3 rounded-md"
          />
          <button className="bg-[#DB4444] text-white px-8 py-3 rounded-md">
            Apply Coupon
          </button>
        </div>
        <div className="border-2 border-black p-6 rounded-md w-1/3">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${cart.totalCartPrice}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${cart.totalCartPrice}</span>
          </div>
          <Link href="/checkout">
            <button className="bg-[#DB4444] text-white w-full mt-4 py-3 rounded-md">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}