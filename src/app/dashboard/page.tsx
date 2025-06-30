"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isCustomer, isStore, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // هدایت بر اساس نقش کاربر
    if (isCustomer()) {
      router.push("/dashboard/customer");
    } else if (isStore()) {
      router.push("/dashboard/store");
    } else if (isAdmin()) {
      router.push("/dashboard/admin");
    }
  }, [isAuthenticated, isCustomer, isStore, isAdmin, router]);

  // نمایش loading در حین تشخیص نقش
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
