"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Smartphone, MessageCircle, ArrowRight, Shield, CheckCircle2, Award } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

// Loading component to show while suspense is active
function VerifyLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">سعید</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تایید شماره موبایل</h2>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
        
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardContent className="text-center p-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">لطفاً صبر کنید...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Main verify form component that uses useSearchParams
function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  
  const { setUser } = useAuthStore();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // 2 دقیقه
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // تنظیم تایمر
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // فرمت زمان
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      
      // حرکت به فیلد بعدی
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // حرکت به فیلد قبلی با Backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (timer === 0) {
      // در حالت واقعی، درخواست ارسال مجدد کد
      setTimer(120);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // کد را به یک رشته تبدیل می‌کنیم
    const code = verificationCode.join("");
    
    // در حالت واقعی، با API اعتبارسنجی می‌شود
    if (code === "12345") {
      setTimeout(() => {
        // شبیه‌سازی یک کاربر جدید
        const mockUser = {
          id: "1",
          name: "کاربر سعید پی ",
          phone,
          email: "",
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">سعید</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">تایید شماره موبایل</h2>
          <p className="text-gray-600">کد تایید ارسال شده به شماره {phone} را وارد کنید</p>
        </div>
        
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <MessageCircle size={16} className="text-blue-600" />
                  کد تایید را وارد کنید
                </label>
                
                <div className="flex justify-center gap-3">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      className="w-12 h-14 text-center text-lg border-gray-300 focus:border-blue-500 rounded-xl"
                    />
                  ))}
                </div>
                
                <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
                  {timer > 0 ? (
                    <>
                      <span>ارسال مجدد کد تا</span> 
                      <span className="inline-block bg-gray-100 text-blue-600 px-2 py-1 rounded-md font-medium">{formatTime(timer)}</span>
                      <span>دیگر</span>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      ارسال مجدد کد
                    </button>
                  )}
                </div>
              </div>
              
              {error && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-base" 
                disabled={loading || verificationCode.some((digit) => !digit)}
              >
                {loading ? "در حال بررسی..." : "تایید شماره موبایل"}
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>امنیت بانکی</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>تایید فوری</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-500" />
                  <span>مجوز رسمی</span>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-center">
            <Link 
              href="/login" 
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              تغییر شماره موبایل
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyForm />
    </Suspense>
  );
} 