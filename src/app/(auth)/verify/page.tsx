"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth-store";

export default function VerifyPage() {
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
          name: "کاربر آرین پی",
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
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">آرین پی</h1>
          <p className="mt-2 text-secondary">سامانه پرداخت اعتباری</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>تایید شماره موبایل</CardTitle>
            <CardDescription>
              کد تایید ارسال شده به شماره {phone} را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
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
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>
              
              <div className="text-center text-sm text-secondary">
                {timer > 0 ? (
                  <p>
                    کد جدید تا <span className="font-medium">{formatTime(timer)}</span> دیگر
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-primary hover:underline"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>
              
              {error && (
                <div className="p-3 text-sm text-danger bg-danger-light rounded-md">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || verificationCode.some((digit) => !digit)}
              >
                {loading ? "در حال بررسی..." : "تایید"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              <Link href="/login" className="text-primary hover:underline">
                تغییر شماره موبایل
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 