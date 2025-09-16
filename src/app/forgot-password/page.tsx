'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'A reset code has been sent to your email.');
      } else {
        toast.error(data.message || 'An error occurred.');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      toast.error(message);
    }
  };

  const inputClasses = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3";

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Forgot Your Password?</h1>
        <p className="text-center mb-8">Enter your email address and we will send you a link to reset your password.</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" {...form.register('email')} className={inputClasses} />
            {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
          </div>
          <button type="submit" className="bg-[#DB4444] text-white w-full py-3 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
}
