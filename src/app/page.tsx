"use client";

import Link from "next/link";
import {
  CreditCard,
  ArrowRight,
  Shield,
  Star,
  Clock,
  CreditCardIcon,
  MapIcon,
  CheckCircle2,
  Smartphone,
  Zap,
  ShoppingBag,
  Gift,
  Users,
  Award,
  Play,
  Menu,
  X,
  Phone,
  Mail,
  Download,
  FileText,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Home,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PaymentAnimation } from "@/components/ui/animation";

export default function WebAppStyleHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeStore, setActiveStore] = useState(0);

  const testimonials = [
    {
      name: "رضا محمدی",
      role: "خرید گوشی موبایل",
      content:
        "تجربه فوق‌العاده‌ای بود. در کمتر از 15 دقیقه اعتبارم تایید شد و توانستم گوشی موردنظرم را به صورت اقساطی خریداری کنم.",
      rating: 5,
      avatar: "ر",
      date: "۲ ماه پیش",
    },
    {
      name: "مریم اکبری",
      role: "خرید لپ‌تاپ",
      content:
        "بدون نیاز به ضامن و چک توانستم لپ‌تاپ موردنیازم را خریداری کنم. اقساط منعطف و متناسب با بودجه من تنظیم شد.",
      rating: 4,
      avatar: "م",
      date: "۱ ماه پیش",
    },
    {
      name: "علی رضایی",
      role: "خرید لوازم خانگی",
      content:
        "برای جهیزیه نیاز به خرید چند قلم لوازم خانگی داشتم. با سعید پی توانستم همه را یکجا خریداری کنم و در اقساط 12 ماهه پرداخت کنم.",
      rating: 5,
      avatar: "ع",
      date: "۳ هفته پیش",
    },
  ];

  const partnerStores = [
    {
      name: "دیجی‌کالا",
      category: "فروشگاه آنلاین",
      logo: "🛒",
      discount: "تا ۱۵٪ تخفیف",
    },
    {
      name: "بامیلو",
      category: "مد و پوشاک",
      logo: "👕",
      discount: "تا ۲۰٪ تخفیف",
    },
    {
      name: "ایران خودرو",
      category: "خودرو",
      logo: "🚗",
      discount: "اقساط ۶۰ ماهه",
    },
    {
      name: "سامسونگ",
      category: "موبایل و لپ‌تاپ",
      logo: "📱",
      discount: "اقساط ۲۴ ماهه",
    },
    {
      name: "ال جی",
      category: "لوازم خانگی",
      logo: "🏠",
      discount: "اقساط ۳۶ ماهه",
    },
    {
      name: "طلای مهر",
      category: "جواهرات",
      logo: "💍",
      discount: "تا ۱۰٪ تخفیف",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStore((prev) => (prev + 1) % partnerStores.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [partnerStores.length]);

  const goToPrevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevStore = () => {
    setActiveStore((prev) =>
      prev === 0 ? partnerStores.length - 1 : prev - 1
    );
  };

  const goToNextStore = () => {
    setActiveStore((prev) => (prev + 1) % partnerStores.length);
  };

  interface CounterAnimationProps {
    end: number;
    duration?: number;
    suffix?: string;
  }

  const CounterAnimation = ({
    end,
    duration = 2000,
    suffix = "",
  }: CounterAnimationProps) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
      if (!hasStarted) return;

      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < end) {
            return Math.min(prev + increment, end);
          }
          clearInterval(timer);
          return end;
        });
      }, 16);

      return () => clearInterval(timer);
    }, [hasStarted, end, duration]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(`counter-${end}`);
      if (element) observer.observe(element);

      return () => observer.disconnect();
    }, [end]);

    return (
      <span
        id={`counter-${end}`}
        className="font-bold text-2xl sm:text-3xl text-blue-600"
      >
        {Math.floor(count).toLocaleString("fa-IR")}
        {suffix}
      </span>
    );
  };

  const navItems = [
    {
      id: "dashboard",
      label: "داشبورد",
      icon: Home,
      href: "/dashboard",
      active: true,
    },
    {
      id: "credit",
      label: "اعتبار",
      icon: CreditCard,
      href: "/credit-request",
      badge: "15M",
    },
    { id: "stores", label: "فروشگاه‌ها", icon: ShoppingBag, href: "/stores" },
    {
      id: "transactions",
      label: "گزارش‌ها",
      icon: BarChart3,
      href: "/transactions",
    },
    {
      id: "contact",
      label: "پشتیبانی",
      icon: HelpCircle,
      href: "/contact",
      badge: "2",
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: "احراز هویت آنلاین",
      description:
        "بدون مراجعه حضوری و تنها با بارگذاری مدارک، هویت شما به صورت آنلاین تأیید می‌شود.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Smartphone,
      title: "اپلیکیشن موبایل",
      description:
        "با اپلیکیشن موبایل سعید پی، به راحتی اعتبار و اقساط خود را مدیریت کنید.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "تأیید آنی اعتبار",
      description:
        "پس از تکمیل مدارک، در کمتر از ۱۰ دقیقه اعتبار شما تأیید و فعال می‌شود.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: ShoppingBag,
      title: "خرید آنلاین و حضوری",
      description:
        "از فروشگاه‌های آنلاین خرید کنید یا در فروشگاه‌های فیزیکی با اسکن QR خرید نمایید.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Gift,
      title: "کد تخفیف اختصاصی",
      description:
        "با خرید‌های منظم و پرداخت به موقع اقساط، کدهای تخفیف ویژه دریافت کنید.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: HeadphonesIcon,
      title: "پشتیبانی ۲۴/۷",
      description:
        "در هر ساعت از شبانه‌روز، کارشناسان ما آماده پاسخگویی به سؤالات شما هستند.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "فروشگاه طرف قرارداد",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      number: 50000,
      suffix: "+",
      label: "کاربر فعال",
      icon: Users,
      color: "bg-green-500",
    },
    {
      number: 98,
      suffix: "%",
      label: "رضایت مشتریان",
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      number: 10,
      suffix: " دقیقه",
      label: "فعالسازی اعتبار",
      icon: Clock,
      color: "bg-purple-500",
    },
  ];

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCardIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">سعید پی</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  سیستم پرداخت اعتباری
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center bg-gray-100 rounded-xl p-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="focus:outline-none"
                  onClick={() => setActiveTab(item.id)}
                >
                  <div
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
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
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <div
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
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
        <section className="px-4 py-8 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-right space-y-6">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    🚀 سیستم آنلاین و فعال
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                      خرید اقساطی
                    </span>
                    <br />
                    <span className="text-gray-900">هوشمند و آسان</span>
                  </h1>
                </div>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  بدون نیاز به چک و ضامن، در کمتر از
                  <span className="font-bold text-blue-600"> ۱۰ دقیقه </span>
                  اعتبار بگیرید و از هزاران فروشگاه خرید اقساطی کنید.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium"
                    >
                      <span>شروع رایگان</span>
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <Link href="/stores">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-300 px-8 py-4 rounded-xl font-medium"
                    >
                      <Play className="ml-2 h-5 w-5" />
                      مشاهده دمو
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
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
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="relative w-80 sm:w-96 h-48 sm:h-56 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>

                    <div className="p-6 sm:p-8 text-white relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white/80 text-sm">اعتبار موجود</p>
                          <p className="text-xl sm:text-2xl font-bold">
                            ۱۵,۰۰۰,۰۰۰ ریال
                          </p>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">شماره کارت</span>
                          <span className="font-mono">**** **** **** ۱۲۳۴</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">نام دارنده</span>
                          <span>کاربر سعید پی</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/80">اعتبار تا</span>
                          <span>۱۴۰۳/۱۲</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg animate-bounce">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-xl shadow-lg">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-4 right-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                    <div
                      className="absolute bottom-8 left-4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CounterAnimation
                        end={stat.number}
                        suffix={stat.suffix}
                      />
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">پرداخت هوشمند</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                پرداخت سریع و آسان
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                با سیستم پرداخت هوشمند سعید پی، پرداخت اقساط خود را به آسانی
                مدیریت کنید
              </p>
            </div>

            <div className="rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="h-64 md:h-80">
                <PaymentAnimation className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Continue with rest of sections... */}
        <section className="px-4 py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">ویژگی‌های کلیدی</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                چرا سعید پی؟
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                راهکارهای مالی هوشمند برای تمام نیازهای خرید اقساطی شما
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 hover:bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                نحوه کار
              </h2>
              <p className="text-lg text-gray-600">
                تنها در ۳ مرحله ساده به اعتبار خود برسید
              </p>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    step: 1,
                    title: "ثبت‌نام و احراز هویت",
                    description:
                      "اطلاعات شخصی و مدارک هویتی خود را بارگذاری کنید",
                    icon: FileText,
                    color: "bg-blue-500",
                  },
                  {
                    step: 2,
                    title: "دریافت اعتبار",
                    description:
                      "در کمتر از ۱۰ دقیقه اعتبار شما تایید و فعال می‌شود",
                    icon: CreditCard,
                    color: "bg-green-500",
                  },
                  {
                    step: 3,
                    title: "خرید اقساطی",
                    description:
                      "از فروشگاه‌های طرف قرارداد به صورت اقساطی خرید کنید",
                    icon: ShoppingBag,
                    color: "bg-purple-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative z-10 h-full">
                      <div
                        className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto lg:mr-0 lg:ml-auto`}
                      >
                        {item.step}
                      </div>
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mr-0 lg:ml-auto">
                        <item.icon className="h-8 w-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center lg:text-right">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-center lg:text-right">
                        {item.description}
                      </p>
                    </div>
                    <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-20"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl"
              >
                شروع کنید
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-sm font-medium">شرکای تجاری</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                فروشگاه‌های طرف قرارداد
              </h2>
              <p className="text-lg text-gray-600">
                از بیش از ۵۰۰ فروشگاه معتبر خرید اقساطی کنید
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10">
                <div className="relative h-80">
                  {partnerStores.map((store, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex flex-col md:flex-row items-center transition-opacity duration-500 ${
                        index === activeStore
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
                      }`}
                    >
                      <div className="md:w-1/2 p-8 flex justify-center items-center">
                        <div className="text-8xl md:text-9xl">{store.logo}</div>
                      </div>
                      <div className="md:w-1/2 p-8 text-center md:text-right bg-gray-50 h-full flex flex-col justify-center">
                        <div className="inline-block mb-4 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {store.discount}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {store.name}
                        </h3>
                        <p className="text-gray-600 mb-6">{store.category}</p>
                        <Link
                          href={`/stores/${store.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          <Button
                            variant="outline"
                            className="mx-auto md:mr-0 md:ml-auto border-gray-300 hover:border-blue-600 hover:text-blue-600"
                          >
                            مشاهده محصولات
                            <ArrowRight className="mr-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 border-t border-gray-100 p-4 flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPrevStore}
                    className="p-2 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </Button>

                  <div className="flex gap-2">
                    {partnerStores.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveStore(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === activeStore
                            ? "bg-blue-600"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to store ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNextStore}
                    className="p-2 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                {partnerStores.map((store, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 hover:bg-white rounded-2xl p-4 lg:p-6 transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-200 group"
                  >
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl mb-3">
                        {store.logo}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base group-hover:text-blue-600 transition-colors">
                        {store.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {store.category}
                      </p>
                      <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {store.discount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link href="/stores">
                  <Button
                    variant="outline"
                    className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
                  >
                    مشاهده همه فروشگاه‌ها
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full mb-4">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">نظرات کاربران</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                تجربه کاربران ما
              </h2>
              <p className="text-lg text-gray-600">
                آنچه کاربران درباره سعید پی می‌گویند
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto overflow-hidden">
              <div className="relative h-96">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 right-0 w-full transition-opacity duration-500 ${
                      index === currentTestimonial
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-lg text-center mb-6 leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= testimonial.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xl ml-4">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-gray-400">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8 gap-4">
                <button
                  onClick={goToPrevTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-blue-600" />
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial
                          ? "bg-blue-600 scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 text-white" />
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
                  <MapIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
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
