"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(6, "New password must be at least 6 characters"),
    rePassword: z.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

const AccountPage = () => {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully!");
        if (result.token) {
          // Update the session with the new token
          await update({ ...session, user: { ...session?.user, token: result.token } });
        }
        reset();
      } else {
        toast.error(result.message || "Failed to update password.");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred.");
    }
  };

  return (
    <div className="container mx-auto px-[135px] py-8 ">
      <div className="flex">
        <aside className="w-1/4 pr-8">
          <div>
            <h3 className="font-bold mb-2">Manage My Account</h3>
            <ul className="pl-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  My Profile
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Address Book
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  My Payment Options
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">My Orders</h3>
            <ul className="pl-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  My Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  My Cancellations
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">My Wishlist</h3>
          </div>
        </aside>
        <main className="w-3/4">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#db4444" }}>
            Edit Your Profile
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Password Changes</h3>
              <div className="space-y-4">
                <div>
                  <input
                    {...register("currentPassword")}
                    type="password"
                    placeholder="Current Password"
                    className={`border-b-2 ${
                      errors.currentPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-xs italic">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="New Password"
                    className={`border-b-2 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("rePassword")}
                    type="password"
                    placeholder="Confirm New Password"
                    className={`border-b-2 ${
                      errors.rePassword ? "border-red-500" : "border-gray-300"
                    } w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-black`}
                  />
                  {errors.rePassword && (
                    <p className="text-red-500 text-xs italic">
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 rounded text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#db4444" }}
                className="text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
