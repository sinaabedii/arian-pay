"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "verify" | "success">("phone");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // شبیه‌سازی ارسال کد تایید
    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1500);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // بررسی کد تایید (در حالت واقعی باید با API چک شود)
    if (verificationCode === "12345") {
      setTimeout(() => {
        setLoading(false);
        setStep("success");
      }, 1500);
    } else {
      setError("کد تایید صحیح نیست.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">سعید پی </h1>
          <p className="mt-2 text-secondary">سامانه پرداخت اعتباری</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>بازیابی رمز عبور</CardTitle>
            <CardDescription>
              {step === "phone" && "برای بازیابی رمز عبور، شماره موبایل خود را وارد کنید."}
              {step === "verify" && "کد تایید ارسال شده به شماره موبایل خود را وارد کنید."}
              {step === "success" && "رمز عبور جدید شما با موفقیت ارسال شد."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
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
                
                {error && (
                  <div className="p-3 text-sm text-danger bg-danger-light rounded-md">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "در حال ارسال..." : "ارسال کد تایید"}
                </Button>
              </form>
            )}
            
            {step === "verify" && (
              <form onSubmit={handleVerifySubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">کد تایید</label>
                  <div className="text-sm text-secondary mb-2">
                    کد تایید به شماره {phone} ارسال شد.
                  </div>
                  <Input 
                    type="text" 
                    placeholder="کد تایید را وارد کنید" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <div className="text-xs text-secondary mt-2">
                    <span className="text-primary cursor-pointer hover:underline">ارسال مجدد کد</span> (۰۲:۰۰)
                  </div>
                </div>
                
                {error && (
                  <div className="p-3 text-sm text-danger bg-danger-light rounded-md">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "در حال بررسی..." : "تایید"}
                </Button>
              </form>
            )}
            
            {step === "success" && (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-success">بازیابی موفق</h3>
                  <p className="text-secondary mt-1">
                    رمز عبور جدید به شماره موبایل شما ارسال شد.
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full mt-4">
                    ورود به حساب کاربری
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full text-center">
              بازگشت به{" "}
              <Link href="/login" className="text-primary hover:underline">
                صفحه ورود
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 