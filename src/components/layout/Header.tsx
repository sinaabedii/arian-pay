"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Menu, 
  X, 
  Timer, 
  Sparkles, 
  Home, 
  CreditCard, 
  ShoppingBag, 
  BarChart3, 
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  active?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  const navItems: NavItem[] = [
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
      id: "news",
      label: "اخبار",
      icon: BookOpen,
      href: "/news",
      badge: "جدید",
    },
    {
      id: "contact",
      label: "پشتیبانی",
      icon: HelpCircle,
      href: "/contact",
      badge: "2",
    },
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Mobile-Optimized Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden md:inline">
              📞 پشتیبانی ۲۴/۷: ۰۲۱-۱۲۳۴۵۶۷۸
            </span>
            <span className="md:hidden">☎️ ۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Timer className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
              <span className="text-xs">
                <span className="hidden sm:inline">پیشنهاد ویژه: </span>
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <span className="hidden sm:inline">🚀 اعتبار ۱۰ دقیقه‌ای!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-3 sm:px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section - Mobile Optimized */}
          <Link href="/">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-lg p-1 sm:p-1.5">
                <Image
                  src="/Logo.png"
                  alt="سعید پی"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">سعید پی</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  سیستم پرداخت اعتباری
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-gray-100 rounded-xl p-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="focus:outline-none"
                onClick={() => setActiveTab(item.id)}
              >
                <div
                  className={`relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
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

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-sm">
                  ورود
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg text-sm"
                >
                  <Sparkles className="h-4 w-4 ml-1" />
                  <span className="hidden lg:inline">ثبت‌نام رایگان</span>
                  <span className="lg:hidden">ثبت‌نام</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden p-2"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === item.id 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className={`font-medium ${
                    activeTab === item.id ? "text-blue-600" : "text-gray-900"
                  }`}>
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  ورود به حساب کاربری
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles className="h-4 w-4 ml-2" />
                  ثبت‌نام رایگان
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 