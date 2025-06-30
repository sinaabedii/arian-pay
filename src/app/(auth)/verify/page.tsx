"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowLeft,
  Smartphone,
  MessageCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

function VerifyLoading() {
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
              تایید شماره
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                موبایل
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg px-4">در حال بارگذاری...</p>
          </div>
          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="text-center p-4 sm:p-6 lg:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">لطفاً صبر کنید...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const { setUser } = useAuthStore();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // 2 دقیقه
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(120);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const code = verificationCode.join("");

    if (code === "12345") {
      setTimeout(() => {
        const mockUser = {
          id: "1",
          name: "کاربر سعید پی ",
          phone,
          email: "",
          role: "customer" as const,
          nationalId: "",
          creditLimit: 0,
          walletBalance: 0,
        };

        setUser(mockUser);
        router.push(redirectTo);
      }, 1500);
    } else {
      setError("کد تایید صحیح نیست. لطفاً دوباره تلاش کنید.");
      setLoading(false);
    }
  };

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
              تایید شماره
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                موبایل
              </span>
            </h1>

            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 sm:px-4 py-2 mb-2 text-sm sm:text-base">
              <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
              <span className="text-blue-700 font-medium">{phone}</span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base px-4">کد تایید ارسال شده را وارد کنید</p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    کد تایید ۵ رقمی
                  </label>

                  <div className="flex justify-center gap-2 sm:gap-3">
                    {verificationCode.map((digit, index) => (
                      <div key={index} className="relative">
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          className="w-12 h-14 sm:w-14 text-gray-800 sm:h-16 text-center text-lg sm:text-xl font-bold border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl bg-gray-50 hover:bg-white transition-all"
                        />
                        {digit && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    {timer > 0 ? (
                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 flex-wrap">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>ارسال مجدد کد تا</span>
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-lg font-bold text-xs sm:text-sm">
                          {formatTime(timer)}
                        </span>
                        <span>دیگر</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendCode}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mx-auto bg-blue-50 hover:bg-blue-100 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        ارسال مجدد کد
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 sm:p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-xs sm:text-sm">{error}</span>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                  disabled={loading || verificationCode.some((digit) => !digit)}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span className="text-sm sm:text-base">در حال بررسی...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">تایید شماره موبایل</span>
                      <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-center text-yellow-700 text-xs sm:text-sm font-medium">
                    💡 کد تست: 12345
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full flex justify-center">
                <Link
                  href="/login"
                  className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-xs sm:text-sm group"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                  تغییر شماره موبایل
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyForm />
    </Suspense>
  );
}
