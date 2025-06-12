"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Bell,
  Search,
  Menu,
  X,
  Download,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Shield,
  Wallet,
  Home,
  ShoppingBag,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FAQData = [
  {
    id: 1,
    category: "خدمات اعتباری",
    icon: CreditCard,
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        id: "credit-1",
        question: "چگونه می‌توانم از سعید پی اعتبار دریافت کنم؟",
        answer:
          "برای دریافت اعتبار، ابتدا باید در سایت ثبت‌نام کنید و مراحل احراز هویت را تکمیل نمایید. سپس به بخش درخواست اعتبار رفته و فرم مربوطه را تکمیل کنید. پس از بررسی‌های لازم، اعتبار شما در کمتر از 10 دقیقه فعال خواهد شد.",
      },
      {
        id: "credit-2",
        question: "سقف اعتبار سعید پی چقدر است؟",
        answer:
          "سقف اعتبار برای هر کاربر متفاوت است و بر اساس اعتبارسنجی انجام شده تعیین می‌شود. حداقل اعتبار 5 میلیون تومان و حداکثر آن تا 50 میلیون تومان می‌باشد. با استفاده مناسب از اعتبار و بازپرداخت به موقع اقساط، امکان افزایش سقف اعتبار وجود دارد.",
      },
      {
        id: "credit-3",
        question: "آیا برای دریافت اعتبار نیاز به ضامن یا چک دارم؟",
        answer:
          "خیر، در سعید پی نیازی به ارائه ضامن یا چک نیست. ما با استفاده از الگوریتم‌های پیشرفته اعتبارسنجی و بررسی سوابق مالی، اعتبار شما را تعیین می‌کنیم.",
      },
    ],
  },
  {
    id: 2,
    category: "خرید اقساطی",
    icon: ShoppingBag,
    color: "from-green-500 to-green-600",
    questions: [
      {
        id: "installment-1",
        question: "از چه فروشگاه‌هایی می‌توانم با اعتبار سعید پی خرید کنم؟",
        answer:
          "شما می‌توانید از تمام فروشگاه‌های طرف قرارداد سعید پی، اعم از فروشگاه‌های آنلاین و فروشگاه‌های فیزیکی، خرید اقساطی انجام دهید. لیست کامل فروشگاه‌ها در بخش 'فروشگاه‌ها' قابل مشاهده است.",
      },
      {
        id: "installment-2",
        question: "مدت زمان بازپرداخت اقساط چقدر است؟",
        answer:
          "مدت زمان بازپرداخت بسته به مبلغ خرید متفاوت است و می‌تواند از 3 تا 12 ماه متغیر باشد. در زمان خرید، گزینه‌های مختلف بازپرداخت به شما نمایش داده می‌شود و می‌توانید مناسب‌ترین گزینه را انتخاب کنید.",
      },
      {
        id: "installment-3",
        question: "آیا امکان پرداخت زودتر از موعد اقساط وجود دارد؟",
        answer:
          "بله، شما می‌توانید در هر زمان اقساط خود را زودتر از موعد پرداخت کنید. در صورت پرداخت زودتر، از تخفیف ویژه در کارمزد بهره‌مند خواهید شد.",
      },
    ],
  },
  {
    id: 3,
    category: "کیف پول",
    icon: Wallet,
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        id: "wallet-1",
        question: "چگونه می‌توانم کیف پول خود را شارژ کنم؟",
        answer:
          "برای شارژ کیف پول، به بخش 'کیف پول' رفته و گزینه 'افزایش موجودی' را انتخاب کنید. سپس مبلغ مورد نظر را وارد کرده و از طریق درگاه‌های بانکی متصل، پرداخت را انجام دهید.",
      },
      {
        id: "wallet-2",
        question: "آیا امکان برداشت وجه از کیف پول وجود دارد؟",
        answer:
          "بله، شما می‌توانید در هر زمان، موجودی کیف پول خود را به حساب بانکی متصل انتقال دهید. این فرآیند معمولاً بین 1 تا 24 ساعت کاری طول می‌کشد.",
      },
      {
        id: "wallet-3",
        question: "آیا استفاده از کیف پول سعید پی هزینه‌ای دارد؟",
        answer:
          "خیر، استفاده از کیف پول سعید پی کاملاً رایگان است و هیچ کارمزدی برای تراکنش‌های شارژ و پرداخت دریافت نمی‌شود.",
      },
    ],
  },
  {
    id: 4,
    category: "امنیت و حریم خصوصی",
    icon: Shield,
    color: "from-orange-500 to-orange-600",
    questions: [
      {
        id: "security-1",
        question: "آیا اطلاعات شخصی و مالی من در سعید پی امن است؟",
        answer:
          "بله، امنیت اطلاعات کاربران یکی از اولویت‌های اصلی ماست. تمام اطلاعات شخصی و مالی با استفاده از پروتکل‌های رمزنگاری پیشرفته محافظت می‌شوند و دسترسی به آن‌ها محدود است.",
      },
      {
        id: "security-2",
        question:
          "در صورت سرقت یا گم شدن گوشی، چگونه می‌توانم حساب خود را محافظت کنم؟",
        answer:
          "در صورت سرقت یا گم شدن گوشی، سریعاً با پشتیبانی سعید پی تماس بگیرید تا حساب شما را موقتاً مسدود کنیم. همچنین می‌توانید از طریق رایانه یا دستگاه دیگری وارد حساب خود شده و رمز عبور را تغییر دهید.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]); // اولین دسته باز باشد
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");

  const navItems = [
    { id: "dashboard", label: "داشبورد", icon: Home, href: "/dashboard" },
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

  const filteredFAQs = searchQuery
    ? FAQData.map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) =>
            q.question.includes(searchQuery) || q.answer.includes(searchQuery)
        ),
      })).filter((category) => category.questions.length > 0)
    : FAQData;

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
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
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">راهنمای کاربران</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  سوالات
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {" "}
                    متداول
                  </span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  پاسخ سوالات رایج درباره خدمات سعید پی را در این بخش بیابید
                </p>
              </div>

              <div className="mb-8 relative">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="جستجو در سوالات متداول..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 py-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-right"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                    >
                      <div
                        className={`h-2 bg-gradient-to-r ${category.color}`}
                      ></div>

                      <div
                        className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}
                          >
                            <category.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">
                              {category.category}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {category.questions.length} سوال
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 hidden sm:inline">
                            {expandedCategories.includes(category.id)
                              ? "بستن"
                              : "مشاهده"}
                          </span>
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              expandedCategories.includes(category.id)
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {expandedCategories.includes(category.id) ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                      </div>

                      {expandedCategories.includes(category.id) && (
                        <div className="px-6 pb-6">
                          <div className="space-y-3">
                            {category.questions.map((q) => (
                              <div
                                key={q.id}
                                className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50"
                              >
                                <div
                                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-white transition-colors"
                                  onClick={() => toggleQuestion(q.id)}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                      <MessageCircle className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h3 className="font-medium text-gray-800 text-right">
                                      {q.question}
                                    </h3>
                                  </div>
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                      expandedQuestions.includes(q.id)
                                        ? "bg-blue-100 text-blue-600"
                                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    }`}
                                  >
                                    {expandedQuestions.includes(q.id) ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </div>
                                </div>
                                {expandedQuestions.includes(q.id) && (
                                  <div className="px-4 pb-4">
                                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                                      <p className="text-gray-700 leading-relaxed text-right">
                                        {q.answer}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-3xl shadow-lg border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      موردی یافت نشد!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      هیچ سوالی مطابق با جستجوی شما یافت نشد. لطفاً با عبارت
                      دیگری جستجو کنید.
                    </p>
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="outline"
                      className="border-gray-300 hover:border-blue-600 hover:text-blue-600"
                    >
                      مشاهده همه سوالات
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-3">
                    پاسخ سوال خود را پیدا نکردید؟
                  </h3>
                  <p className="text-blue-700 mb-6 leading-relaxed">
                    اگر پاسخ سوال خود را در بین سوالات متداول پیدا نکردید،
                    می‌توانید با تیم پشتیبانی ما تماس بگیرید.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                        تماس با پشتیبانی
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <a href="tel:02112345678">
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-xl"
                      >
                        <Phone className="ml-2 h-4 w-4" />
                        تماس مستقیم
                      </Button>
                    </a>
                  </div>
                </div>
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
                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
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
