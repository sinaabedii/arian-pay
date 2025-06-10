import Link from "next/link";
import { CreditCard, Shield, Clock, Phone, Mail, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold text-center">درباره سعید پی </h1>
              <p className="mt-6 text-lg text-secondary text-center">
                سعید پی  یک پلتفرم پرداخت اعتباری و خرید اقساطی آنلاین است که با هدف تسهیل فرآیند خرید اقساطی برای مشتریان و فروشگاه‌ها ایجاد شده است.
              </p>
              
              <div className="mt-12 space-y-8">
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">مأموریت ما</h2>
                  <p className="text-secondary">
                    مأموریت ما ارائه راهکارهای پرداخت اعتباری ساده، سریع و قابل اعتماد به کاربران است. ما معتقدیم که دسترسی به اعتبار منصفانه حق همه است و تلاش می‌کنیم تا فرآیند اعتبارسنجی و پرداخت اقساطی را برای همه آسان کنیم.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">تیم سعید پی </h2>
                  <p className="text-secondary mb-4">
                    تیم سعید پی  متشکل از متخصصان حوزه فین‌تک، توسعه نرم‌افزار و اعتبارسنجی است که با سال‌ها تجربه در صنعت مالی، این پلتفرم را ایجاد کرده‌اند. 
                  </p>
                  <p className="text-secondary">
                    هدف ما ایجاد یک اکوسیستم پرداخت منسجم است که به کاربران امکان می‌دهد با خیال راحت و بدون نیاز به فرآیندهای پیچیده، از خدمات اعتباری بهره‌مند شوند.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">مزایای سعید پی </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary-light text-primary mt-1">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">اعتبار آنی</h3>
                        <p className="text-sm text-secondary mt-1">دریافت اعتبار در کمتر از 10 دقیقه با احراز هویت ساده</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary-light text-primary mt-1">
                        <Shield size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">امنیت بالا</h3>
                        <p className="text-sm text-secondary mt-1">استفاده از استانداردهای امنیتی بانکی و حفظ حریم خصوصی</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary-light text-primary mt-1">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">پرداخت انعطاف‌پذیر</h3>
                        <p className="text-sm text-secondary mt-1">برنامه‌های پرداخت اقساطی متنوع متناسب با نیاز شما</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary-light text-primary mt-1">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">کیف پول یکپارچه</h3>
                        <p className="text-sm text-secondary mt-1">مدیریت اعتبار، اقساط و پول نقد در یک پلتفرم واحد</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h2 className="text-xl font-bold mb-4">تماس با ما</h2>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-primary" />
                      <span className="text-secondary">021-12345678</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-primary" />
                      <span className="text-secondary">info@arianpay.com</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-secondary">تهران، خیابان ولیعصر، برج آرین، طبقه 10</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <Link href="/register">
                  <Button size="lg">همین حالا ثبت‌نام کنید</Button>
                </Link>
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
              <Link href="/about" className="text-sm text-primary hover:underline transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-sm text-secondary hover:text-primary transition-colors">
                تماس با ما
              </Link>
              <Link href="/faq" className="text-sm text-secondary hover:text-primary transition-colors">
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