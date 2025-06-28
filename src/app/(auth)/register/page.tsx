"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Smartphone,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
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

      if (phone.length !== 11 || !phone.startsWith("09")) {
        setErrorMessage("شماره موبایل وارد شده صحیح نیست.");
        setLoading(false);
        return;
      }

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
              ثبت‌نام در
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {" "}
                سعید پی
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              برای استفاده از خدمات اعتباری سعید پی، ثبت‌نام کنید
            </p>
          </div>
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-600" />
                    </div>
                    نام و نام خانوادگی
                  </label>
                  <Input
                    type="text"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all"
                    required
                  />
                </div>
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
                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-3 h-3 text-blue-600" />
                    </div>
                    رمز عبور (حداقل ۱۲ کاراکتر)
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور امن با حداقل ۱۲ کاراکتر وارد کنید"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
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

                <div className="space-y-3">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                    </div>
                    تکرار رمز عبور
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="رمز عبور را مجدداً وارد کنید"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all pr-12 ${
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
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
                            رمز عبور و تکرار آن مطابقت ندارند
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">!</span>
                    </div>
                    {errorMessage}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                  
                  disabled={
                    loading ||
                    !name ||
                    !phone ||
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      در حال ثبت‌نام...
                    </>
                  ) : (
                    <>
                      ثبت‌نام رایگان
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>

            <CardFooter className="px-8 py-6 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
              <div className="w-full space-y-4">
                <p className="text-center text-gray-600">
                  حساب کاربری دارید؟{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    وارد شوید
                  </Link>
                </p>

                <Link
                  href="/"
                  className="flex items-center justify-center text-sm text-gray-500 hover:text-blue-600 transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
