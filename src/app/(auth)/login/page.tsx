"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px]">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">AP</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            آرین پی
          </h1>
          <p className="text-sm text-secondary mt-1">
            راهکار اعتباری برای خرید‌های روزمره شما
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ورود به حساب کاربری</CardTitle>
            <CardDescription>
              اطلاعات حساب کاربری خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    شماره موبایل
                  </label>
                  <Input
                    id="phone"
                    type="tel" 
                    placeholder="09123456789" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      رمز عبور
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      فراموشی رمز عبور
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password" 
                    placeholder="رمز عبور خود را وارد کنید" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {errorMessage && (
                  <div className="p-3 text-sm text-danger bg-danger-light rounded-md">
                    {errorMessage}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="px-4 py-4 flex flex-col">
            <div className="text-center w-full">
              <p className="text-sm text-secondary mb-4">
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/register"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  ثبت‌نام کنید
                </Link>
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center text-xs text-secondary hover:text-primary"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 