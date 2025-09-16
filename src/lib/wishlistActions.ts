'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function addToWishlist(productId: string): Promise<{ success: boolean; message: string; }> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, message: 'You must be logged in to add to wishlist.' };
  }

  try {
    const res = await fetch(`${process.env.NEXT_EXTERNAL_URL}/api/v1/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: session.user.token,
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to add to wishlist.' };
    }

    return { success: true, message: data.message || 'Added to wishlist successfully!' };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An error occurred.";
    return { success: false, message };
  }
}
