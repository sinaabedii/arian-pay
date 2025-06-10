"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  CreditCardIcon, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Download, 
  Phone, 
  Mail, 
  MapIcon, 
  ArrowRight, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// دیتای سوالات متداول
const FAQData = [
  {
    id: 1,
    category: "خدمات اعتباری",
    questions: [
      {
        id: "credit-1",
        question: "چگونه می‌توانم از سعید پی  اعتبار دریافت کنم؟",
        answer: "برای دریافت اعتبار، ابتدا باید در سایت ثبت‌نام کنید و مراحل احراز هویت را تکمیل نمایید. سپس به بخش درخواست اعتبار رفته و فرم مربوطه را تکمیل کنید. پس از بررسی‌های لازم، اعتبار شما در کمتر از 10 دقیقه فعال خواهد شد."
      },
      {
        id: "credit-2",
        question: "سقف اعتبار سعید پی  چقدر است؟",
        answer: "سقف اعتبار برای هر کاربر متفاوت است و بر اساس اعتبارسنجی انجام شده تعیین می‌شود. حداقل اعتبار 5 میلیون تومان و حداکثر آن تا 50 میلیون تومان می‌باشد. با استفاده مناسب از اعتبار و بازپرداخت به موقع اقساط، امکان افزایش سقف اعتبار وجود دارد."
      },
      {
        id: "credit-3",
        question: "آیا برای دریافت اعتبار نیاز به ضامن یا چک دارم؟",
        answer: "خیر، در سعید پی  نیازی به ارائه ضامن یا چک نیست. ما با استفاده از الگوریتم‌های پیشرفته اعتبارسنجی و بررسی سوابق مالی، اعتبار شما را تعیین می‌کنیم."
      }
    ]
  },
  {
    id: 2,
    category: "خرید اقساطی",
    questions: [
      {
        id: "installment-1",
        question: "از چه فروشگاه‌هایی می‌توانم با اعتبار سعید پی  خرید کنم؟",
        answer: "شما می‌توانید از تمام فروشگاه‌های طرف قرارداد سعید پی ، اعم از فروشگاه‌های آنلاین و فروشگاه‌های فیزیکی، خرید اقساطی انجام دهید. لیست کامل فروشگاه‌ها در بخش 'فروشگاه‌ها' قابل مشاهده است."
      },
      {
        id: "installment-2",
        question: "مدت زمان بازپرداخت اقساط چقدر است؟",
        answer: "مدت زمان بازپرداخت بسته به مبلغ خرید متفاوت است و می‌تواند از 3 تا 12 ماه متغیر باشد. در زمان خرید، گزینه‌های مختلف بازپرداخت به شما نمایش داده می‌شود و می‌توانید مناسب‌ترین گزینه را انتخاب کنید."
      },
      {
        id: "installment-3",
        question: "آیا امکان پرداخت زودتر از موعد اقساط وجود دارد؟",
        answer: "بله، شما می‌توانید در هر زمان اقساط خود را زودتر از موعد پرداخت کنید. در صورت پرداخت زودتر، از تخفیف ویژه در کارمزد بهره‌مند خواهید شد."
      }
    ]
  },
  {
    id: 3,
    category: "کیف پول",
    questions: [
      {
        id: "wallet-1",
        question: "چگونه می‌توانم کیف پول خود را شارژ کنم؟",
        answer: "برای شارژ کیف پول، به بخش 'کیف پول' رفته و گزینه 'افزایش موجودی' را انتخاب کنید. سپس مبلغ مورد نظر را وارد کرده و از طریق درگاه‌های بانکی متصل، پرداخت را انجام دهید."
      },
      {
        id: "wallet-2",
        question: "آیا امکان برداشت وجه از کیف پول وجود دارد؟",
        answer: "بله، شما می‌توانید در هر زمان، موجودی کیف پول خود را به حساب بانکی متصل انتقال دهید. این فرآیند معمولاً بین 1 تا 24 ساعت کاری طول می‌کشد."
      },
      {
        id: "wallet-3",
        question: "آیا استفاده از کیف پول سعید پی  هزینه‌ای دارد؟",
        answer: "خیر، استفاده از کیف پول سعید پی  کاملاً رایگان است و هیچ کارمزدی برای تراکنش‌های شارژ و پرداخت دریافت نمی‌شود."
      }
    ]
  },
  {
    id: 4,
    category: "امنیت و حریم خصوصی",
    questions: [
      {
        id: "security-1",
        question: "آیا اطلاعات شخصی و مالی من در سعید پی  امن است؟",
        answer: "بله، امنیت اطلاعات کاربران یکی از اولویت‌های اصلی ماست. تمام اطلاعات شخصی و مالی با استفاده از پروتکل‌های رمزنگاری پیشرفته محافظت می‌شوند و دسترسی به آن‌ها محدود است."
      },
      {
        id: "security-2",
        question: "در صورت سرقت یا گم شدن گوشی، چگونه می‌توانم حساب خود را محافظت کنم؟",
        answer: "در صورت سرقت یا گم شدن گوشی، سریعاً با پشتیبانی سعید پی  تماس بگیرید تا حساب شما را موقتاً مسدود کنیم. همچنین می‌توانید از طریق رایانه یا دستگاه دیگری وارد حساب خود شده و رمز عبور را تغییر دهید."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]); // اولین دسته باز باشد
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // آیتم‌های منوی اصلی
  const navItems = [
    { id: 'dashboard', label: 'داشبورد', icon: CreditCardIcon, href: '/dashboard' },
    { id: 'credit', label: 'اعتبار', icon: CreditCardIcon, href: '/credit-request', badge: '15M' },
    { id: 'stores', label: 'فروشگاه‌ها', icon: CreditCardIcon, href: '/stores' },
    { id: 'transactions', label: 'گزارش‌ها', icon: CreditCardIcon, href: '/transactions' },
    { id: 'contact', label: 'پشتیبانی', icon: HelpCircle, href: '/contact', badge: '2' }
  ];

  // فیلتر کردن سوالات بر اساس جستجو
  const filteredFAQs = searchQuery
    ? FAQData.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.includes(searchQuery) || 
          q.answer.includes(searchQuery)
        )
      })).filter(category => category.questions.length > 0)
    : FAQData;

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

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
                      item.href === '/contact'
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
                      item.href === '/contact'
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
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">راهنمای کاربران</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">سوالات متداول</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  پاسخ سوالات رایج درباره خدمات سعید پی را در این بخش بیابید
                </p>
              </div>
              
              <div className="mt-8 relative">
                <Input
                  type="text"
                  placeholder="جستجو در سوالات متداول..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 py-6 rounded-xl border-gray-300 focus:border-blue-500"
                />
                <div className="absolute left-3 top-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(category => (
                    <Card key={category.id} className="border-0 shadow-sm rounded-xl overflow-hidden">
                      <div 
                        className="p-5 flex items-center justify-between cursor-pointer border-b border-gray-100 bg-gray-50"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                        <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-50">
                          {expandedCategories.includes(category.id) ? (
                            <ChevronUp size={20} className="text-blue-600" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-600" />
                          )}
                        </Button>
                      </div>
                      {expandedCategories.includes(category.id) && (
                        <CardContent className="p-5">
                          <div className="space-y-4">
                            {category.questions.map(q => (
                              <div key={q.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                <div 
                                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors"
                                  onClick={() => toggleQuestion(q.id)}
                                >
                                  <h3 className="font-medium text-gray-800">{q.question}</h3>
                                  <Button variant="ghost" size="sm" className="p-1">
                                    {expandedQuestions.includes(q.id) ? (
                                      <ChevronUp size={18} className="text-blue-600" />
                                    ) : (
                                      <ChevronDown size={18} className="text-gray-600" />
                                    )}
                                  </Button>
                                </div>
                                {expandedQuestions.includes(q.id) && (
                                  <div className="p-4 bg-white text-gray-600 border-t border-gray-100">
                                    {q.answer}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xl font-medium text-gray-900 mb-2">موردی یافت نشد!</p>
                    <p className="text-gray-600">
                      هیچ سوالی مطابق با جستجوی شما یافت نشد. لطفاً با عبارت دیگری جستجو کنید.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-12 bg-blue-50 p-8 rounded-2xl shadow-sm border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">پاسخ سوال خود را پیدا نکردید؟</h3>
                <p className="text-gray-600 mb-6">
                  اگر پاسخ سوال خود را در بین سوالات متداول پیدا نکردید، می‌توانید با تیم پشتیبانی ما تماس بگیرید.
                </p>
                <div>
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl">
                      تماس با پشتیبانی
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
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
                  <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
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