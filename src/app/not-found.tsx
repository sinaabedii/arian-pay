"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Home,
  ArrowRight,
  Search,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    document.title = "صفحه پیدا نشد - ۴۰۴ | سعید پی";
    setIsAnimated(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl text-center">
        
        {/* Main 404 Section */}
        <div className={`mb-16 transition-all duration-700 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* 404 with icon */}
          <div className="relative mb-8">
            <h1 className="text-8xl sm:text-9xl lg:text-[10rem] font-light text-transparent bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text leading-none mb-6">
              404
            </h1>
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            صفحه پیدا نشد
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
            صفحه‌ای که دنبالش می‌گردید وجود ندارد یا ممکن است جابجا شده باشد.
          </p>
        </div>

        {/* Search Section */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <form onSubmit={handleSearch}>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="جستجو در سایت..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-4 rounded-xl border-2 border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-center shadow-sm"
              />
            </div>
          </form>
        </div>

       

        {/* Bottom Actions */}
        <div className={`transition-all duration-700 delay-600 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg">
                <Home className="w-4 h-4 ml-2" />
                بازگشت به صفحه اصلی
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-white/50 backdrop-blur rounded-xl p-6 border border-blue-100">
            <p className="text-gray-600 mb-4 text-sm">
              نیاز به کمک دارید؟ تیم پشتیبانی ما آماده کمک به شماست.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </Badge>
              <Link href="/contact">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  ارسال پیام
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 