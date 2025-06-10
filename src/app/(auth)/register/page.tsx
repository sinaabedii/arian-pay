"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Smartphone, Lock, ShieldCheck, Shield, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ارزیابی قدرت رمز عبور
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);

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
        router.push("/verify");
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">سعید</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ثبت‌نام در سعید پی</h2>
          <p className="text-gray-600">برای استفاده از خدمات اعتباری سعید پی، ثبت‌نام کنید</p>
        </div>

        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <User size={16} className="text-blue-600" />
                  نام و نام خانوادگی
                </label>
                <Input 
                  type="text" 
                  placeholder="نام و نام خانوادگی خود را وارد کنید" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Smartphone size={16} className="text-blue-600" />
                  شماره موبایل
                </label>
                <Input 
                  type="tel" 
                  placeholder="09123456789" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <Lock size={16} className="text-blue-600" />
                  رمز عبور
                </label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور خود را وارد کنید" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                  required
                />
                {password && (
                  <div className="mt-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === 0 ? 'w-0' :
                          passwordStrength === 1 ? 'w-1/4 bg-red-500' :
                          passwordStrength === 2 ? 'w-2/4 bg-yellow-500' :
                          passwordStrength === 3 ? 'w-3/4 bg-blue-500' :
                          'w-full bg-green-500'
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-600">
                      {passwordStrength === 0 ? 'رمز عبور ضعیف است' :
                       passwordStrength === 1 ? 'رمز عبور ضعیف است' :
                       passwordStrength === 2 ? 'رمز عبور متوسط است' :
                       passwordStrength === 3 ? 'رمز عبور خوب است' :
                       'رمز عبور قوی است'}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                  <ShieldCheck size={16} className="text-blue-600" />
                  تکرار رمز عبور
                </label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور را مجدداً وارد کنید" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`border-gray-300 focus:border-blue-500 rounded-xl py-5 ${
                    confirmPassword && password !== confirmPassword ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-600 mt-1">رمز عبور و تکرار آن مطابقت ندارند</p>
                )}
              </div>
              
              {errorMessage && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                  {errorMessage}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-base"
                disabled={loading}
              >
                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
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
              حساب کاربری دارید؟{" "}
              <Link 
                href="/login" 
                className="text-blue-600 font-medium hover:text-blue-800"
              >
                وارد شوید
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