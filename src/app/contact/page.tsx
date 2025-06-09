"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Send, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // شبیه‌سازی ارسال فرم
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      
      // بعد از 3 ثانیه پیام موفقیت را پنهان کن
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">آرین پی</h1>
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
              <h1 className="text-3xl md:text-4xl font-bold text-center">تماس با ما</h1>
              <p className="mt-6 text-lg text-secondary text-center">
                برای ارتباط با ما و ارسال نظرات و پیشنهادات خود می‌توانید از راه‌های زیر اقدام نمایید.
              </p>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
                      <Phone size={24} />
                    </div>
                    <h3 className="font-medium mb-2">شماره تماس</h3>
                    <p className="text-secondary">021-12345678</p>
                    <p className="text-secondary mt-1">021-87654321</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
                      <Mail size={24} />
                    </div>
                    <h3 className="font-medium mb-2">ایمیل</h3>
                    <p className="text-secondary">info@arianpay.com</p>
                    <p className="text-secondary mt-1">support@arianpay.com</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary mb-4">
                      <MapPin size={24} />
                    </div>
                    <h3 className="font-medium mb-2">آدرس</h3>
                    <p className="text-secondary">تهران، خیابان ولیعصر، برج آرین، طبقه 10</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-12">
                <CardHeader>
                  <CardTitle>فرم تماس</CardTitle>
                  <CardDescription>
                    پیام خود را از طریق فرم زیر ارسال کنید. تیم پشتیبانی ما در اسرع وقت با شما تماس خواهد گرفت.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="p-4 bg-success/10 text-success rounded-md text-center">
                      پیام شما با موفقیت ارسال شد. با تشکر از تماس شما.
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">نام و نام خانوادگی</label>
                        <Input 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ایمیل</label>
                        <Input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">شماره تماس</label>
                        <Input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">پیام</label>
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          required
                          className="input min-h-[120px] w-full"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full gap-2"
                      >
                        {isSubmitting ? "در حال ارسال..." : (
                          <>
                            <Send size={16} /> ارسال پیام
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary-light py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">آرین پی</h3>
              <p className="text-sm text-secondary mt-1">سامانه پرداخت اعتباری</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-secondary hover:text-primary transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-sm text-primary hover:underline transition-colors">
                تماس با ما
              </Link>
              <Link href="/faq" className="text-sm text-secondary hover:text-primary transition-colors">
                سوالات متداول
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-secondary">
            © {new Date().getFullYear()} آرین پی. تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
} 