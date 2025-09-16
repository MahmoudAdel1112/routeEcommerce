'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { createCashOrder } from '@/lib/order';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  companyName: z.string().optional(),
  streetAddress: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  saveInfo: z.boolean().optional(),
});

export default function CheckoutPage() {
  const { cart, loading } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      companyName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      phone: '',
      email: '',
      saveInfo: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const shippingAddress = {
      details: values.streetAddress,
      phone: values.phone,
      city: values.city,
    };

    if (paymentMethod === 'cash') {
      try {
        if (cart?._id) {
          const order = await createCashOrder(cart._id, shippingAddress);
          if (order) {
            toast.success('Order created successfully');
            router.push('/orders');
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    } else if (paymentMethod === 'bank') {
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          toast.error('Stripe is not configured correctly.');
          return;
        }

        const res = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart }),
        });

        const { id: sessionId } = await res.json();

        const { error } = await stripe.redirectToCheckout({
          sessionId,
        });

        if (error) {
          toast.error(error.message || 'An unexpected error occurred.');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  const inputClasses = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3";

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
      <h1 className="text-3xl font-bold mb-8">Billing Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" {...form.register('firstName')} className={inputClasses} />
            {form.formState.errors.firstName && <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name (Optional)</label>
            <input type="text" id="companyName" {...form.register('companyName')} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" id="streetAddress" {...form.register('streetAddress')} className={inputClasses} />
            {form.formState.errors.streetAddress && <p className="text-red-500 text-sm mt-1">{form.formState.errors.streetAddress.message}</p>}
          </div>
          <div>
            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment, floor, etc. (Optional)</label>
            <input type="text" id="apartment" {...form.register('apartment')} className={inputClasses} />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Town / City</label>
            <input type="text" id="city" {...form.register('city')} className={inputClasses} />
            {form.formState.errors.city && <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" {...form.register('phone')} className={inputClasses} />
            {form.formState.errors.phone && <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" {...form.register('email')} className={inputClasses} />
            {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
          </div>
          <div className="flex items-center">
            <input id="saveInfo" type="checkbox" {...form.register('saveInfo')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-900">Save this information for faster check-out next time</label>
          </div>
        </form>
        <div>
          <div className="space-y-4">
            {cart.products.map((item) => (
              <div key={item.product._id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image src={item.product.imageCover} alt={item.product.title} width={50} height={50} />
                  <span>{item.product.title.substring(0, 20)}...</span>
                </div>
                <span>${item.price * item.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${cart.totalCartPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${cart.totalCartPrice}</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <input type="radio" name="paymentMethod" id="bank" value="bank" checked={paymentMethod === 'bank'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="bank" className="ml-2 block text-sm text-gray-900">Bank</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="paymentMethod" id="cash" value="cash" checked={paymentMethod === 'cash'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-indigo-600 border-gray-300" />
              <label htmlFor="cash" className="ml-2 block text-sm text-gray-900">Cash on delivery</label>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <input type="text" placeholder="Coupon Code" className="border border-gray-400 p-3 rounded-md w-full" />
            <button className="bg-[#DB4444] text-white px-8 py-3 rounded-md">Apply Coupon</button>
          </div>
                    <button type="submit" form="checkout-form" className="bg-[#DB4444] text-white w-full mt-8 py-3 rounded-md">
            {paymentMethod === 'cash' ? 'Place Order' : 'Continue to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
