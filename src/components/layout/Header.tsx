"use client";

import Link from "next/link";
import { 
  CreditCardIcon, 
  Menu, 
  X, 
  Timer, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Home, 
  CreditCard, 
  ShoppingBag, 
  BarChart3, 
  HelpCircle,
  ArrowRight
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
  const [liveStats, setLiveStats] = useState({
    activeUsers: 1247,
    todayApprovals: 89,
  });
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
      id: "contact",
      label: "پشتیبانی",
      icon: HelpCircle,
      href: "/contact",
      badge: "2",
    },
  ];

  // Live stats updater
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
        todayApprovals: prev.todayApprovals + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      {/* Simplified Top Banner with Urgency */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              📞 پشتیبانی ۲۴/۷: ۰۲۱-۱۲۳۴۵۶۷۸
            </span>
            <span className="sm:hidden">☎️ ۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 animate-pulse" />
              <span className="text-xs">
                پیشنهاد ویژه: 
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <span className="hidden sm:inline">🚀 اعتبار ۱۰ دقیقه‌ای!</span>
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
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  ورود
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                >
                  <Sparkles className="h-4 w-4 ml-1" />
                  ثبت‌نام رایگان
                </Button>
              </Link>
            </div>

            <Button
              variant="outline"
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
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700">
                  <Sparkles className="h-4 w-4 ml-1" />
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