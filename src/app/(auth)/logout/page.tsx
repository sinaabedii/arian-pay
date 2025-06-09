"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    // خروج از سیستم
    logout();
    
    // انتقال به صفحه اصلی با تاخیر کوتاه
    const timer = setTimeout(() => {
      router.push("/");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-secondary-light flex items-center justify-center mx-auto mb-4">
          <LogOut className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">در حال خروج از حساب کاربری</h1>
        <p className="text-secondary">لطفاً منتظر بمانید...</p>
      </div>
    </div>
  );
} 