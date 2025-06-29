"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  MessageSquare,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

export default function RegisterVerifyPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
    // گرفتن شماره تلفن از localStorage
    const registrationPhone = localStorage.getItem('registration_phone');
    if (registrationPhone) {
      setPhone(registrationPhone);
    } else {
      // اگر شماره تلفن موجود نیست، به صفحه ثبت نام برگرد
      router.push('/register');
    }
  }, [router]);

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  }, [password]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    setResendCooldown(60);
    // شبیه‌سازی ارسال مجدد کد
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const code = verificationCode.join("");
      if (!code || code.length !== 5) {
        setErrorMessage("کد تایید ۵ رقمی را وارد کنید.");
        setLoading(false);
        return;
      }

      if (!name.trim()) {
        setErrorMessage("نام و نام خانوادگی را وارد کنید.");
        setLoading(false);
        return;
      }

      if (password.length < 12) {
        setErrorMessage("رمز عبور باید حداقل ۱۲ کاراکتر باشد.");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("رمز عبور و تکرار آن مطابقت ندارند.");
        setLoading(false);
        return;
      }

      // شبیه‌سازی تایید کد و ثبت نام
      setTimeout(() => {
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
        localStorage.removeItem('registration_phone');
        router.push("/dashboard");
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
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-12 h-12 sm:w-24 sm:h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-16 sm:h-16 bg-orange-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-10 h-10 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-3 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/">
              <div className="flex justify-center mb-4 sm:mb-6 cursor-pointer">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300 p-2 sm:p-3">
                  <Image
                    src="/Logo.png"
                    alt="سعید پی"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              تایید شماره
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                تلفن
              </span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg px-4">
              کد ۵ رقمی ارسال شده به {phone} را وارد کنید
            </p>
          </div>

          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    کد تایید ۵ رقمی
                  </label>
                  
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {verificationCode.map((digit, index) => (
                      <div key={index} className="relative">
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-lg sm:text-xl font-bold text-gray-800 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl bg-gray-50 hover:bg-white transition-all"
                        />
                        {digit && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <p className="text-gray-500">
                      کد را دریافت نکردید؟
                    </p>
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={resendCooldown > 0}
                      className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
                    >
                      {resendCooldown > 0 ? `ارسال مجدد (${resendCooldown})` : 'ارسال مجدد'}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    نام و نام خانوادگی
                  </label>
                  <Input
                    type="text"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-200 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all text-sm sm:text-base"
                    required
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    رمز عبور (حداقل ۱۲ کاراکتر)
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور امن با حداقل ۱۲ کاراکتر وارد کنید"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all pr-10 sm:pr-12 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password requirements helper */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>برای امنیت بیشتر، رمز عبور باید شامل:</p>
                    <ul className="list-disc list-inside space-y-0.5 mr-2">
                      <li className={password.length >= 12 ? "text-green-600" : ""}>
                        حداقل ۱۲ کاراکتر
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                        حروف بزرگ انگلیسی
                      </li>
                      <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>
                        اعداد
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>
                        نمادهای ویژه (@#$%...)
                      </li>
                    </ul>
                  </div>

                  {password && (
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            passwordStrength === 0
                              ? "w-0"
                              : passwordStrength === 1
                              ? "w-1/4 bg-red-500"
                              : passwordStrength === 2
                              ? "w-2/4 bg-yellow-500"
                              : passwordStrength === 3
                              ? "w-3/4 bg-blue-500"
                              : "w-full bg-green-500"
                          }`}
                        ></div>
                      </div>
                      <p
                        className={`text-xs font-medium ${
                          passwordStrength <= 1
                            ? "text-red-600"
                            : passwordStrength === 2
                            ? "text-yellow-600"
                            : passwordStrength === 3
                            ? "text-blue-600"
                            : "text-green-600"
                        }`}
                      >
                        {passwordStrength === 0
                          ? "رمز عبور ضعیف است"
                          : passwordStrength === 1
                          ? "رمز عبور ضعیف است - حداقل ۱۲ کاراکتر لازم است"
                          : passwordStrength === 2
                          ? "رمز عبور متوسط است"
                          : passwordStrength === 3
                          ? "رمز عبور خوب است"
                          : "رمز عبور قوی است"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    تایید رمز عبور
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="رمز عبور را مجدداً وارد کنید"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-3 sm:py-4 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all pr-10 sm:pr-12 text-sm sm:text-base ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>

                  {confirmPassword && (
                    <div className="flex items-center gap-2">
                      {password === confirmPassword ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <p className="text-xs text-green-600 font-medium">
                            رمز عبور مطابقت دارد
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✕</span>
                          </div>
                          <p className="text-xs text-red-600 font-medium">
                            رمز عبور و تایید آن مطابقت ندارند
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="p-3 sm:p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="text-xs sm:text-sm">{errorMessage}</span>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                  disabled={
                    loading ||
                    verificationCode.some((digit) => !digit) ||
                    !name ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      <span className="text-sm sm:text-base">در حال تکمیل ثبت نام...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">تکمیل ثبت نام</span>
                      <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
                
               
              </div>
            </CardContent>

            <CardFooter className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full space-y-3 sm:space-y-4">
                <p className="text-center text-gray-600 text-sm">
                  حساب کاربری دارید؟{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    وارد شوید
                  </Link>
                </p>

                <button
                  onClick={() => router.push('/register')}
                  className="flex items-center justify-center text-xs sm:text-sm text-gray-500 hover:text-blue-600 transition-colors group w-full"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                  تغییر شماره تلفن
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 