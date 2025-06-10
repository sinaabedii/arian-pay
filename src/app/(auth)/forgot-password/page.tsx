"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Smartphone, MessageCircle, ArrowRight, Shield, Award } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">سعید</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">بازیابی رمز عبور</h2>
          <p className="text-gray-600">
            {step === "phone" && "برای بازیابی رمز عبور، شماره موبایل خود را وارد کنید"}
            {step === "verify" && "کد تایید ارسال شده به شماره موبایل خود را وارد کنید"}
            {step === "success" && "رمز عبور جدید شما با موفقیت ارسال شد"}
          </p>
        </div>
        
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
          <CardContent className="p-8">
            {step === "phone" && (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
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
                
                {error && (
                  <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl text-base" 
                  disabled={loading}
                >
                  {loading ? "در حال ارسال..." : "ارسال کد تایید"}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>امنیت بانکی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-500" />
                    <span>پیامک رایگان</span>
                  </div>
                </div>
              </form>
            )}
            
            {step === "verify" && (
              <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <MessageCircle size={16} className="text-blue-600" />
                    کد تایید
                  </label>
                  <div className="text-sm text-gray-600 mb-3">
                    کد تایید به شماره {phone} ارسال شد
                  </div>
                  <Input 
                    type="text" 
                    placeholder="کد تایید را وارد کنید" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 rounded-xl py-5"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-2 flex justify-between">
                    <span className="text-blue-600 cursor-pointer hover:text-blue-800">ارسال مجدد کد</span>
                    <span>(۰۲:۰۰)</span>
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
                  disabled={loading}
                >
                  {loading ? "در حال بررسی..." : "تایید و بازیابی رمز عبور"}
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </form>
            )}
            
            {step === "success" && (
              <div className="py-6 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={36} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-green-600">بازیابی موفق</h3>
                  <p className="text-gray-600">
                    رمز عبور جدید به شماره موبایل شما ارسال شد
                  </p>
                </div>
                <Link href="/login">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl">
                    ورود به حساب کاربری
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-center">
            <Link href="/login" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm">
              <ArrowLeft className="h-4 w-4 ml-2" />
              بازگشت به صفحه ورود
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 