'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Order, ShippingAddress } from '@/interfaces/order.interface';

export async function createCashOrder(cartId: string, shippingAddress: ShippingAddress): Promise<Order> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('You must be logged in to create an order.');
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: session.user.token,
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to create order.');
    }

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred while creating the order.';
    console.error('Failed to create cash order', error);
    throw new Error(message);
  }
}

export async function getOrders(): Promise<Order[]> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('You must be logged in to view orders.');
  }

  try {
    const userId = session.user.id;

    if (!userId) {
      throw new Error('User ID not found in session.');
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch orders.');
    }

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred while fetching orders.';
    console.error('Failed to fetch orders', error);
    throw new Error(message);
  }
}
