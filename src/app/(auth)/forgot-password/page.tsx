"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  CheckCircle,
  ArrowLeft,
  Smartphone,
  MessageCircle,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("phone");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handlePhoneSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setStep("verify");
    }, 1500);
  };

  const handleVerifySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
    <div className="min-h-screen bg-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              بازیابی
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                رمز عبور
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              {step === "phone" &&
                "برای بازیابی رمز عبور، شماره موبایل خود را وارد کنید"}
              {step === "verify" &&
                "کد تایید ارسال شده به شماره موبایل خود را وارد کنید"}
              {step === "success" && "رمز عبور جدید شما با موفقیت ارسال شد"}
            </p>
          </div>
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-8">
              {step === "phone" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-3 h-3 text-blue-600" />
                      </div>
                      شماره موبایل
                    </label>
                    <Input
                      type="tel"
                      placeholder="09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all text-right"
                      required
                      dir="ltr"
                    />
                  </div>

                  {error && (
                    <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">!</span>
                      </div>
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handlePhoneSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                    disabled={loading || !phone}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        ارسال کد تایید
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 pt-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>امنیت بانکی</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-500" />
                      <span>پیامک رایگان</span>
                    </div>
                  </div>
                </div>
              )}

              {step === "verify" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 text-blue-600" />
                      </div>
                      کد تایید
                    </label>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-sm text-blue-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>کد تایید به شماره {phone} ارسال شد</span>
                      </div>
                    </div>

                    <Input
                      type="text"
                      placeholder="کد ۵ رقمی را وارد کنید"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all text-center text-lg tracking-widest"
                      required
                      maxLength={5}
                    />

                    <div className="flex justify-between items-center text-xs mt-3">
                      <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" />
                        ارسال مجدد کد
                      </button>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>(۰۲:۰۰)</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">!</span>
                      </div>
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleVerifySubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                    disabled={loading || !verificationCode}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                        در حال بررسی...
                      </>
                    ) : (
                      <>
                        تایید و بازیابی رمز عبور
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </>
                    )}
                  </Button>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-center text-yellow-700 text-sm font-medium">
                      💡 کد تست: 12345
                    </p>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="py-6 text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto relative z-10">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-500 rounded-full blur-lg opacity-20"></div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-green-600">
                      بازیابی موفق!
                    </h3>
                    <p className="text-gray-600 text-lg">
                      رمز عبور جدید به شماره موبایل شما ارسال شد
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span>پیامک حاوی رمز عبور جدید ارسال شد</span>
                    </div>
                  </div>

                  <Link href="/login">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                      ورود به حساب کاربری
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>

            <CardFooter className="px-8 py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full flex justify-center">
                <Link
                  href="/login"
                  className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm group"
                >
                  <ArrowLeft className="h-4 w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                  بازگشت به صفحه ورود
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
