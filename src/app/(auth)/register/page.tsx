"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    try {
      // اعتبارسنجی ورودی‌ها
      if (password !== confirmPassword) {
        setErrorMessage("رمز عبور و تکرار آن مطابقت ندارند.");
        setLoading(false);
        return;
      }
      
      if (phone.length !== 11 || !phone.startsWith("09")) {
        setErrorMessage("شماره موبایل وارد شده صحیح نیست.");
        setLoading(false);
        return;
      }
      
      // شبیه‌سازی ثبت‌نام موفق
      setTimeout(() => {
        // در حالت واقعی، پاسخ API ثبت‌نام را دریافت می‌کنیم
        const mockUser = {
          id: "1",
          name,
          phone,
          email: "",
          nationalId: "",
          creditLimit: 0,
          walletBalance: 0,
        };
        
        registerUser(mockUser);
        router.push("/dashboard");
      }, 1500);
    } catch {
      setErrorMessage("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
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
            <CardTitle>ثبت‌نام در آرین پی</CardTitle>
            <CardDescription>
              برای استفاده از خدمات اعتباری آرین پی، ثبت‌نام کنید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام و نام خانوادگی</label>
                <Input 
                  type="text" 
                  placeholder="نام و نام خانوادگی خود را وارد کنید" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">شماره موبایل</label>
                <Input 
                  type="tel" 
                  placeholder="09123456789" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">رمز عبور</label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور خود را وارد کنید" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">تکرار رمز عبور</label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور را مجدداً وارد کنید" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              {errorMessage && (
                <div className="p-3 text-sm text-danger bg-danger-light rounded-md">
                  {errorMessage}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              حساب کاربری دارید؟{" "}
              <Link href="/login" className="text-primary hover:underline">
                وارد شوید
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 