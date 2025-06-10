"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronLeft } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">سعید پی </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              بازگشت به صفحه اصلی <ChevronLeft size={16} />
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-center">سوالات متداول</h1>
              <p className="mt-6 text-lg text-secondary text-center">
                پاسخ سوالات رایج درباره خدمات سعید پی  را در این بخش بیابید.
              </p>
              
              <div className="mt-8 relative">
                <Input
                  type="text"
                  placeholder="جستجو در سوالات متداول..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute left-3 top-2.5">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-secondary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>
              
              <div className="mt-8 space-y-6">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map(category => (
                    <Card key={category.id}>
                      <div 
                        className="p-4 flex items-center justify-between cursor-pointer border-b border-border"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <h2 className="text-xl font-semibold">{category.category}</h2>
                        <Button variant="ghost" size="sm" className="p-1">
                          {expandedCategories.includes(category.id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </Button>
                      </div>
                      {expandedCategories.includes(category.id) && (
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            {category.questions.map(q => (
                              <div key={q.id} className="border border-border rounded-md overflow-hidden">
                                <div 
                                  className="p-4 flex items-center justify-between cursor-pointer bg-secondary-light"
                                  onClick={() => toggleQuestion(q.id)}
                                >
                                  <h3 className="font-medium">{q.question}</h3>
                                  <Button variant="ghost" size="sm" className="p-1">
                                    {expandedQuestions.includes(q.id) ? (
                                      <ChevronUp size={18} />
                                    ) : (
                                      <ChevronDown size={18} />
                                    )}
                                  </Button>
                                </div>
                                {expandedQuestions.includes(q.id) && (
                                  <div className="p-4 text-secondary">
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
                  <div className="text-center py-10 bg-secondary-light rounded-lg">
                    <p className="text-lg font-medium">موردی یافت نشد!</p>
                    <p className="text-secondary mt-2">
                      هیچ سوالی مطابق با جستجوی شما یافت نشد. لطفاً با عبارت دیگری جستجو کنید.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-12 bg-primary-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-primary">پاسخ سوال خود را پیدا نکردید؟</h3>
                <p className="mt-2 text-secondary">
                  اگر پاسخ سوال خود را در بین سوالات متداول پیدا نکردید، می‌توانید با تیم پشتیبانی ما تماس بگیرید.
                </p>
                <div className="mt-4">
                  <Link href="/contact">
                    <Button>تماس با پشتیبانی</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary-light py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">سعید پی </h3>
              <p className="text-sm text-secondary mt-1">سامانه پرداخت اعتباری</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">
                تماس با ما
              </Link>
              <Link href="/faq" className="text-sm text-primary hover:underline transition-colors">
                سوالات متداول
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-secondary">
            © {new Date().getFullYear()} سعید پی . تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
} 