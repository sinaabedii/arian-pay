"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Smartphone } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-secondary-300/20 blur-3xl" />
      
      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8 animate-slide-in-top" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-classic-blue to-classic-blue-700 rounded-2xl shadow-lg flex items-center justify-center hover-float">
              <span className="text-white text-2xl font-bold">AP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">
            سعید پی 
          </h1>
          <p className="text-sm text-secondary mt-2">
            راهکار اعتباری برای خرید‌های روزمره شما
          </p>
        </div>

        <Card className="border-0 shadow-card animate-slide-in-bottom overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="h-2 bg-gradient-to-l from-classic-blue-300 to-classic-blue-700"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">ورود به حساب کاربری</CardTitle>
            <CardDescription className="text-center">
              اطلاعات حساب کاربری خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Smartphone size={16} className="text-primary/70" />
                    شماره موبایل
                  </label>
                  <Input
                    id="phone"
                    type="tel" 
                    placeholder="09123456789" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-secondary-300 focus:border-primary"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock size={16} className="text-primary/70" />
                      رمز عبور
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-link"
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
                    className="border-secondary-300 focus:border-primary"
                    required
                  />
                </div>
                
                {errorMessage && (
                  <div className="p-4 text-sm text-danger bg-danger-light/50 rounded-lg border border-danger-200 animate-pulse-soft">
                    {errorMessage}
                  </div>
                )}

                <AnimatedButton 
                  type="submit" 
                  disabled={loading} 
                  variant="gradient" 
                  fullWidth 
                  size="lg"
                  animation="scale"
                >
                  {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
                </AnimatedButton>
              </div>
            </form>
          </CardContent>
          <CardFooter className="px-6 py-4 flex flex-col">
            <div className="text-center w-full">
              <p className="text-sm text-secondary mb-4">
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/register"
                  className="text-link font-medium"
                >
                  ثبت‌نام کنید
                </Link>
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center text-xs text-secondary hover:text-primary transition-colors"
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