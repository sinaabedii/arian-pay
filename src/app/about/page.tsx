"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronLeft, 
  ArrowRight, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Download, 
  MapIcon, 
  CreditCardIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'داشبورد', icon: CreditCard, href: '/dashboard' },
    { id: 'credit', label: 'اعتبار', icon: CreditCard, href: '/credit-request', badge: '15M' },
    { id: 'stores', label: 'فروشگاه‌ها', icon: CreditCard, href: '/stores' },
    { id: 'transactions', label: 'گزارش‌ها', icon: CreditCard, href: '/transactions' },
    { id: 'contact', label: 'پشتیبانی', icon: CreditCard, href: '/contact', badge: '2' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Web App Style Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">📞 پشتیبانی ۲۴/۷: ۰۲۱-۱۲۳۴۵۶۷۸</span>
              <span className="sm:hidden">☎️ ۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">🚀 اعتبار ۱۰ دقیقه‌ای!</span>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <CreditCardIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">سعید پی</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">سیستم پرداخت اعتباری</p>
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
                >
                  <div
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.id === 'about'
                        ? 'bg-white shadow-sm text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button - Mobile */}
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Profile Menu */}
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

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
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
                      item.id === 'about'
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
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
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 flex gap-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">ورود</Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">ثبت‌نام</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="pb-16">
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              {/* Page Title */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm font-medium">درباره ما</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">درباره سعید پی</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  سعید پی یک پلتفرم پرداخت اعتباری و خرید اقساطی آنلاین است که با هدف تسهیل فرآیند خرید اقساطی برای مشتریان و فروشگاه‌ها ایجاد شده است.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">مأموریت ما</h2>
                  <p className="text-gray-600 leading-relaxed">
                    مأموریت ما ارائه راهکارهای پرداخت اعتباری ساده، سریع و قابل اعتماد به کاربران است. ما معتقدیم که دسترسی به اعتبار منصفانه حق همه است و تلاش می‌کنیم تا فرآیند اعتبارسنجی و پرداخت اقساطی را برای همه آسان کنیم.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">تیم سعید پی</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    تیم سعید پی متشکل از متخصصان حوزه فین‌تک، توسعه نرم‌افزار و اعتبارسنجی است که با سال‌ها تجربه در صنعت مالی، این پلتفرم را ایجاد کرده‌اند. 
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    هدف ما ایجاد یک اکوسیستم پرداخت منسجم است که به کاربران امکان می‌دهد با خیال راحت و بدون نیاز به فرآیندهای پیچیده، از خدمات اعتباری بهره‌مند شوند.
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">مزایای سعید پی</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">اعتبار آنی</h3>
                        <p className="text-gray-600">دریافت اعتبار در کمتر از 10 دقیقه با احراز هویت ساده</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">امنیت بالا</h3>
                        <p className="text-gray-600">استفاده از استانداردهای امنیتی بانکی و حفظ حریم خصوصی</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">پرداخت انعطاف‌پذیر</h3>
                        <p className="text-gray-600">برنامه‌های پرداخت اقساطی متنوع متناسب با نیاز شما</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">کیف پول یکپارچه</h3>
                        <p className="text-gray-600">مدیریت اعتبار، اقساط و پول نقد در یک پلتفرم واحد</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">تماس با ما</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">شماره تماس</h3>
                        <p className="text-gray-600">021-12345678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">ایمیل</h3>
                        <p className="text-gray-600">info@saeedpay.ir</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">آدرس</h3>
                        <p className="text-gray-600">تهران، خیابان ولیعصر، برج سعید، طبقه 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium">
                    <span>همین حالا ثبت‌نام کنید</span>
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
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
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/credit-request" className="text-gray-400 hover:text-white transition-colors text-sm">
                    خدمات
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="text-gray-400 hover:text-white transition-colors text-sm">
                    فروشگاه‌ها
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
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
                  <span className="text-gray-400 text-sm">info@saeedpay.ir</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">تهران، ولیعصر، برج سعید</span>
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