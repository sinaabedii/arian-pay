"use client";

import Link from "next/link";
import { 
  CreditCard, 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Award, 
  Target, 
  Sparkles, 
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";

const HeroSection = () => {
  const [liveStats, setLiveStats] = useState({
    activeUsers: 1247,
    todayApprovals: 89,
  });

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

  // Stats data
  const stats = useMemo(() => [
    { number: 500, suffix: "+", label: "فروشگاه طرف قرارداد", color: "bg-blue-500" },
    { number: 50000, suffix: "+", label: "کاربر فعال", color: "bg-green-500" },
    { number: 98, suffix: "%", label: "رضایت مشتریان", color: "bg-yellow-500" },
    { number: 10, suffix: " دقیقه", label: "فعالسازی اعتبار", color: "bg-purple-500" },
  ], []);

  // Counter Animation Component
  const CounterAnimation = ({ 
    end, 
    duration = 2000, 
    suffix = "" 
  }: { 
    end: number; 
    duration?: number; 
    suffix?: string; 
  }) => {
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

  return (
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
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-medium shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="ml-2 h-5 w-5" />
                  <span>شروع رایگان</span>
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/stores">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 px-8 py-4 rounded-xl font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                >
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
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-500" />
                <span>۹۸.۵٪ تایید</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-80 sm:w-96 h-48 sm:h-56 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-500 hover:shadow-3xl">
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

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl shadow-lg animate-bounce">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl shadow-lg">
                <Sparkles className="h-6 w-6" />
              </div>

              {/* Background decorations */}
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

        {/* Enhanced Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CounterAnimation end={stat.number} suffix={stat.suffix} />
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">
                    {stat.label}
                  </p>
                </div>
              </div>

              {/* Progress bar for visual appeal */}
              <div className="w-full bg-gray-100 rounded-full h-1 mt-3">
                <div
                  className={`h-1 rounded-full ${stat.color} transition-all duration-1000 ease-out`}
                  style={{
                    width: stat.number > 100 ? "100%" : `${stat.number}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Stats Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">۱.۲ میلیارد</div>
              <div className="text-sm text-gray-600">ریال پرداخت شده</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">۹۸.۵٪</div>
              <div className="text-sm text-gray-600">نرخ تایید</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">۴.۹</div>
              <div className="text-sm text-gray-600">امتیاز کاربران</div>
            </div>
          </div>

          {/* Live Stats Display */}
          <div className="mt-6 flex justify-center gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">کاربران آنلاین:</span>
                <span className="font-bold">{liveStats.activeUsers.toLocaleString('fa-IR')}</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">تایید امروز:</span>
                <span className="font-bold">{liveStats.todayApprovals.toLocaleString('fa-IR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 