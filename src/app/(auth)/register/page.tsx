"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      if (phone.length !== 11 || !phone.startsWith("09")) {
        setErrorMessage("شماره موبایل وارد شده صحیح نیست.");
        setLoading(false);
        return;
      }

      // شبیه‌سازی ارسال کد تایید
      setTimeout(() => {
        // ذخیره شماره تلفن در localStorage برای استفاده در مرحله بعد
        localStorage.setItem('registration_phone', phone);
        router.push("/register/verify");
      }, 1500);
    } catch {
      setErrorMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
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
              ثبت‌نام در
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                سعید پی
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg px-4">
              برای شروع، شماره موبایل خود را وارد کنید
            </p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    شماره موبایل
                  </label>
                  <Input
                    type="tel"
                    placeholder="09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all text-right text-sm sm:text-base"
                    required
                    dir="ltr"
                  />
                  <p className="text-xs text-gray-500">
                    کد تایید به این شماره ارسال خواهد شد
                  </p>
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
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                  disabled={loading || !phone}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span className="text-sm sm:text-base">در حال ارسال کد...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">ارسال کد تایید</span>
                      <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>

            <CardFooter className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full space-y-3 sm:space-y-4">
                <p className="text-center text-gray-600 text-xs sm:text-sm">
                  با ادامه، شما با <Link href="/terms" className="text-blue-600 hover:text-blue-800">قوانین و مقررات</Link> و <Link href="/privacy" className="text-blue-600 hover:text-blue-800">حریم خصوصی</Link> سعید پی موافقت می‌کنید.
                </p>

                <p className="text-center text-gray-600 text-sm">
                  حساب کاربری دارید؟{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    وارد شوید
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
