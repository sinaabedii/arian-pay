"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Smartphone, Shield, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">سعید</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ورود به حساب کاربری</h2>
          <p className="text-gray-600">وارد حساب خود شوید و از خدمات اعتباری استفاده کنید</p>
        </div>

        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Smartphone size={16} className="text-blue-600" />
                  شماره موبایل
                </label>
                <Input
                  id="phone"
                  type="tel" 
                  placeholder="09123456789" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <Lock size={16} className="text-blue-600" />
                    رمز عبور
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-blue-600 hover:text-blue-800"
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
                  className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                  required
                />
              </div>
              
              {errorMessage && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                  {errorMessage}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-base"
              >
                {loading ? "در حال ورود..." : "ورود به حساب کاربری"}
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mt-4">
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
          <CardFooter className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-4">
            <p className="text-center text-gray-600">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                ثبت‌نام کنید
              </Link>
            </p>
            <Link
              href="/"
              className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 