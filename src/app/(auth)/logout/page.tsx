"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CreditCard } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();

    const timer = setTimeout(() => {
      router.push("/");
    }, 1500);

    return () => clearTimeout(timer);
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative text-center max-w-md mx-auto">
        <div className="relative mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl flex items-center justify-center mx-auto mb-4 relative z-10">
            <LogOut className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse" />
          </div>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl blur-lg opacity-30"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-gray-200">
            <CreditCard className="h-4 w-4 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-6 sm:p-8">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            در حال خروج از
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              سعید پی
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mb-6">
            حساب کاربری شما با موفقیت بسته شد
          </p>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-gray-500 text-sm">لطفاً منتظر بمانید...</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-blue-700 text-sm font-medium">
              🙏 از استفاده از خدمات سعید پی متشکریم
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            به زودی به صفحه اصلی منتقل می‌شوید...
          </p>
        </div>
      </div>
    </div>
  );
}
