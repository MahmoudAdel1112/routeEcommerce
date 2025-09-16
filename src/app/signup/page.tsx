'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import authImage from '@/assets/images/authImage.jpeg';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rePassword: z.string(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number'),
}).refine((data) => data.password === data.rePassword, {
  message: 'Passwords do not match',
  path: ['rePassword'],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const { status } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.message === 'success') {
        toast.success('Account created successfully!');
        router.push('/login');
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="flex items-stretch min-h-screen">
      <div className="w-1/2 relative">
        <Image src={authImage} alt="Auth image" layout="fill" objectFit="cover" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-4xl font-bold mb-4">Create an account</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-4">
              <input {...register('name')} className={`border-b-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`} id="name" type="text" placeholder="Name" />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <input {...register('email')} className={`border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`} id="email" type="email" placeholder="Email" />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <input {...register('password')} className={`border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`} id="password" type="password" placeholder="Password" />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
              <input {...register('rePassword')} className={`border-b-2 ${errors.rePassword ? 'border-red-500' : 'border-gray-300'} w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`} id="rePassword" type="password" placeholder="Repeat Password" />
              {errors.rePassword && <p className="text-red-500 text-xs italic">{errors.rePassword.message}</p>}
            </div>

            <div className="mb-6">
              <input {...register('phone')} className={`border-b-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`} id="phone" type="text" placeholder="Phone" />
              {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone.message}</p>}
            </div>

            <button style={{ backgroundColor: '#db4444' }} className="text-white font-bold py-3 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="submit">
              Create Account
            </button>
            <div className="text-center mt-4">
              <p>Already have an account? <Link href="/login" className="font-bold text-sm" style={{ color: '#db4444' }}>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
