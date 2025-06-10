"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Smartphone, Lock, ShieldCheck } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-secondary-300/20 blur-3xl" />
      
      <div className="w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-6 animate-slide-in-top" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-classic-blue to-classic-blue-700 rounded-xl shadow-lg flex items-center justify-center hover-float">
              <span className="text-white text-xl font-bold">AP</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold gradient-text">
            سعید پی 
          </h1>
          <p className="text-sm text-secondary mt-1">
            راهکار اعتباری برای خرید‌های روزمره شما
          </p>
        </div>

        <Card className="border-0 shadow-card animate-slide-in-bottom overflow-hidden" style={{ animationDelay: '0.2s' }}>
          <div className="h-2 bg-gradient-to-l from-classic-blue-300 to-classic-blue-700"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">ثبت‌نام در سعید پی </CardTitle>
            <CardDescription className="text-center">
              برای استفاده از خدمات اعتباری سعید پی ، ثبت‌نام کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User size={16} className="text-primary/70" />
                  نام و نام خانوادگی
                </label>
                <Input 
                  type="text" 
                  placeholder="نام و نام خانوادگی خود را وارد کنید" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="border-secondary-300 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Smartphone size={16} className="text-primary/70" />
                  شماره موبایل
                </label>
                <Input 
                  type="tel" 
                  placeholder="09123456789" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-secondary-300 focus:border-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock size={16} className="text-primary/70" />
                  رمز عبور
                </label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور خود را وارد کنید" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-secondary-300 focus:border-primary"
                  required
                />
                {password && (
                  <div className="mt-1">
                    <div className="w-full h-1.5 bg-secondary-200 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === 0 ? 'w-0' :
                          passwordStrength === 1 ? 'w-1/4 bg-danger' :
                          passwordStrength === 2 ? 'w-2/4 bg-warning' :
                          passwordStrength === 3 ? 'w-3/4 bg-accent' :
                          'w-full bg-success'
                        }`}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-secondary">
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
                <label className="text-sm font-medium flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary/70" />
                  تکرار رمز عبور
                </label>
                <Input 
                  type="password" 
                  placeholder="رمز عبور را مجدداً وارد کنید" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`border-secondary-300 focus:border-primary ${
                    confirmPassword && password !== confirmPassword ? 'border-danger focus:border-danger' : ''
                  }`}
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-danger mt-1">رمز عبور و تکرار آن مطابقت ندارند</p>
                )}
              </div>
              
              {errorMessage && (
                <div className="p-4 text-sm text-danger bg-danger-light/50 rounded-lg border border-danger-200 animate-pulse-soft">
                  {errorMessage}
                </div>
              )}
              
              <AnimatedButton 
                type="submit" 
                variant="gradient"
                fullWidth
                size="lg"
                animation="scale"
                disabled={loading}
              >
                {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
              </AnimatedButton>
            </form>
          </CardContent>
          <CardFooter className="px-6 py-4">
            <div className="w-full text-center flex flex-col gap-3">
              <p>
                حساب کاربری دارید؟{" "}
                <Link href="/login" className="text-link font-medium">
                  وارد شوید
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