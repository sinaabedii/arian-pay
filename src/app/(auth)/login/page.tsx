"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Lock,
  Smartphone,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Store,
  Shield,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const success = await login({ phone, password });
      if (success) {
        router.push("/dashboard");
      } else {
        setErrorMessage("شماره موبایل یا رمز عبور اشتباه است.");
      }
    } catch {
      setErrorMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (phone: string, password: string) => {
    setPhone(phone);
    setPassword(password);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
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

      <div className="relative flex items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/">
              <div className="flex justify-center mb-4 sm:mb-6 cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300 p-2 sm:p-3">
                  <Image
                    src="/Logo.png"
                    alt="سعید پی"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              ورود به
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                سعید پی
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg px-4">
              وارد حساب خود شوید و از خدمات اعتباری استفاده کنید
            </p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    شماره موبایل
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all text-right text-sm sm:text-base"
                      required
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium flex items-center gap-2 text-gray-700"
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                      </div>
                      رمز عبور
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      فراموشی رمز؟
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد کنید"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all pr-10 sm:pr-12 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 sm:p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-xs sm:text-sm">{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || !phone || !password}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span className="text-sm sm:text-base">
                        در حال ورود...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">
                        ورود به حساب کاربری
                      </span>
                      <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            {/* Demo Credentials Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-b from-blue-50 to-blue-100 border-t border-blue-200">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700 text-center">
                  حساب‌های نمونه برای تست (کلیک کنید تا فرم پر شود)
                </h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {/* Customer Account */}
                  <div 
                    onClick={() => fillDemoCredentials("09123456789", "customer123")}
                    className="p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">مشتری (علی احمدی)</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>09123456789</span>
                          <span>•</span>
                          <span>customer123</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Store Account */}
                  <div 
                    onClick={() => fillDemoCredentials("09987654321", "store123")}
                    className="p-3 bg-white rounded-lg border border-green-200 hover:border-green-400 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Store className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">فروشگاه (دیجی کالا)</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>09987654321</span>
                          <span>•</span>
                          <span>store123</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Account */}
                  <div 
                    onClick={() => fillDemoCredentials("09111111111", "admin123")}
                    className="p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 cursor-pointer transition-all hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">مدیر سیستم</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>09111111111</span>
                          <span>•</span>
                          <span>admin123</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  💡 هر حساب دارای داشبورد و امکانات متفاوت است
                </p>
              </div>
            </div>

            <CardFooter className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full space-y-3 sm:space-y-4">
                <p className="text-center text-gray-600 text-sm">
                  حساب کاربری ندارید؟{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    ثبت‌نام رایگان
                  </Link>
                </p>
                <Link
                  href="/"
                  className="flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors group"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
