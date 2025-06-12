"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Bell,
  Search,
  Menu,
  X,
  Download,
  Send,
  MessageCircle,
  User,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navItems = [
    { id: "dashboard", label: "داشبورد", icon: CreditCard, href: "/dashboard" },
    {
      id: "credit",
      label: "اعتبار",
      icon: CreditCard,
      href: "/credit-request",
      badge: "15M",
    },
    { id: "stores", label: "فروشگاه‌ها", icon: CreditCard, href: "/stores" },
    {
      id: "transactions",
      label: "گزارش‌ها",
      icon: CreditCard,
      href: "/transactions",
    },
    {
      id: "contact",
      label: "پشتیبانی",
      icon: CreditCard,
      href: "/contact",
      badge: "2",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                📞 پشتیبانی ۲۴/۷: ۰۲۱-۱۲۳۴۵۶۷۸
              </span>
              <span className="sm:hidden">☎️ ۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">🚀 اعتبار ۱۰ دقیقه‌ای!</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">سعید پی</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    سیستم پرداخت اعتباری
                  </p>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center bg-gray-100 rounded-xl p-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none"
                >
                  <div
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.id === "contact"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>

              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    ورود
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    ثبت‌نام
                  </Button>
                </Link>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.id === "contact"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="mr-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    ورود
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    ثبت‌نام
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pb-16">
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">تماس با ما</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  در خدمت شما هستیم
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  برای ارتباط با ما و ارسال نظرات و پیشنهادات خود می‌توانید از
                  راه‌های زیر اقدام نمایید.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    شماره تماس
                  </h3>
                  <p className="text-gray-600 mb-1">021-12345678</p>
                  <p className="text-gray-600">021-87654321</p>
                  <div className="mt-3 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-block">
                    پشتیبانی ۲۴/۷
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    ایمیل
                  </h3>
                  <p className="text-gray-600 mb-1">info@saeedpay.ir</p>
                  <p className="text-gray-600">support@saeedpay.ir</p>
                  <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                    پاسخ در کمتر از ۲۴ ساعت
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    آدرس دفتر
                  </h3>
                  <p className="text-gray-600">تهران، خیابان ولیعصر</p>
                  <p className="text-gray-600">برج سعید، طبقه 10</p>
                  <div className="mt-3 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full inline-block">
                    ساعت کاری: ۸ الی ۲۰
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    فرم تماس
                  </h2>
                  <p className="text-gray-600">
                    پیام خود را از طریق فرم زیر ارسال کنید. تیم پشتیبانی ما در
                    اسرع وقت با شما تماس خواهد گرفت.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">
                      پیام شما ارسال شد!
                    </h3>
                    <p className="text-gray-600">
                      با تشکر از تماس شما. تیم پشتیبانی ما به زودی با شما تماس
                      خواهد گرفت.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                          <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="w-3 h-3 text-blue-600" />
                          </div>
                          نام و نام خانوادگی
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="نام کامل خود را وارد کنید"
                          className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                          <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-3 h-3 text-blue-600" />
                          </div>
                          ایمیل
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                        <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-3 h-3 text-blue-600" />
                        </div>
                        شماره تماس
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="09123456789"
                        className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all text-right"
                        required
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                        <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-3 h-3 text-blue-600" />
                        </div>
                        پیام شما
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="پیام خود را اینجا بنویسید..."
                        rows={5}
                        className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl py-4 px-4 bg-gray-50 hover:bg-white transition-all resize-none"
                        required
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-200"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                          در حال ارسال...
                        </>
                      ) : (
                        <>
                          ارسال پیام
                          <Send className="mr-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    نیاز به پاسخ سریع دارید؟
                  </h3>
                  <p className="text-blue-700 mb-6">
                    تیم پشتیبانی ما آماده پاسخگویی به سوالات شما است
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:02112345678">
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        <Phone className="ml-2 h-4 w-4" />
                        تماس مستقیم
                      </Button>
                    </a>
                    <a href="mailto:support@saeedpay.ir">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Mail className="ml-2 h-4 w-4" />
                        ارسال ایمیل
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium"
                  >
                    <span>همین حالا ثبت‌نام کنید</span>
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">سعید پی</h3>
                  <p className="text-sm text-gray-400">سامانه پرداخت اعتباری</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                اولین و پیشرفته‌ترین سیستم پرداخت اعتباری ایران
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">دسترسی سریع</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link
                    href="/credit-request"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    خدمات
                  </Link>
                </li>
                <li>
                  <Link
                    href="/stores"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    فروشگاه‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    سوالات متداول
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-lg">تماس با ما</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">021-12345678</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">
                    info@saeedpay.ir
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">
                    تهران، ولیعصر، برج سعید
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} سعید پی. تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}
