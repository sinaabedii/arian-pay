"use client";

import Link from "next/link";
import { 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter,
  Shield,
  Award,
  Users,
  Star
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">سعید پی</h2>
                  <p className="text-gray-400 text-sm">سیستم پرداخت اعتباری</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                راهکار مالی هوشمند برای خرید اقساطی آسان و بدون دردسر. با مجوز رسمی از بانک مرکزی.
              </p>
              <div className="flex gap-3">
                <Link href="https://instagram.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-sky-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">دسترسی سریع</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                    صفحه اصلی
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                    درباره ما
                  </Link>
                </li>
                <li>
                  <Link href="/stores" className="text-gray-300 hover:text-white transition-colors text-sm">
                    فروشگاه‌ها
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                    سوالات متداول
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                    تماس با ما
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
                    وبلاگ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">خدمات</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/credit-request" className="text-gray-300 hover:text-white transition-colors text-sm">
                    درخواست اعتبار
                  </Link>
                </li>
                <li>
                  <Link href="/installment-calculator" className="text-gray-300 hover:text-white transition-colors text-sm">
                    محاسبه‌گر اقساط
                  </Link>
                </li>
                <li>
                  <Link href="/mobile-app" className="text-gray-300 hover:text-white transition-colors text-sm">
                    اپلیکیشن موبایل
                  </Link>
                </li>
                <li>
                  <Link href="/merchant-panel" className="text-gray-300 hover:text-white transition-colors text-sm">
                    پنل فروشنده
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="text-gray-300 hover:text-white transition-colors text-sm">
                    API مطورین
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">تماس با ما</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-white text-sm font-medium">تلفن پشتیبانی</p>
                    <p className="text-gray-300 text-sm">۰۲۱-۱۲۳۴۵۶۷۸</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-white text-sm font-medium">ایمیل</p>
                    <p className="text-gray-300 text-sm">info@saeedpay.ir</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-white text-sm font-medium">آدرس</p>
                    <p className="text-gray-300 text-sm">تهران، میدان ولیعصر، برج میلاد</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-white text-sm font-medium">امنیت بانکی</p>
                  <p className="text-gray-400 text-xs">تضمین امنیت اطلاعات</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-white text-sm font-medium">مجوز رسمی</p>
                  <p className="text-gray-400 text-xs">بانک مرکزی ایران</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-white text-sm font-medium">50K+ کاربر</p>
                  <p className="text-gray-400 text-xs">کاربران فعال</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-white text-sm font-medium">امتیاز 4.9</p>
                  <p className="text-gray-400 text-xs">از 5000+ نظر</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} سعید پی. تمامی حقوق محفوظ است.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                شرایط استفاده
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                نقشه سایت
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 