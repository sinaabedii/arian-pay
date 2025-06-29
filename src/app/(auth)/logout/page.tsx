"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";

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
    <div className="min-h-screen bg-gray-50 relative flex items-center justify-center p-3 sm:p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-12 h-12 sm:w-24 sm:h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-10 h-10 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative text-center max-w-sm sm:max-w-md mx-auto w-full">
        {/* Logo */}
        <div className="relative mb-6 sm:mb-8">
          <Link href="/">
            <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-4 relative z-10 transform hover:scale-105 transition-transform duration-300 p-3 sm:p-4 cursor-pointer">
              <Image
                src="/Logo.png"
                alt="سعید پی"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl blur-lg opacity-30"></div>
          <div className="absolute -top-1 sm:-top-2 -right-6 sm:-right-8 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-gray-200">
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            در حال خروج از
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              سعید پی
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 px-2">
            حساب کاربری شما با موفقیت بسته شد
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm">لطفاً منتظر بمانید...</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-3 sm:mb-4">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-1.5 sm:h-2 rounded-full animate-pulse transition-all duration-1000"
              style={{ width: "70%" }}
            ></div>
          </div>

          <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100">
            <p className="text-blue-700 text-xs sm:text-sm font-medium">
              🙏 از استفاده از خدمات سعید پی متشکریم
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            به زودی به صفحه اصلی منتقل می‌شوید...
          </p>
        </div>
      </div>
    </div>
  );
}
