import Link from "next/link";
import { CreditCard, ArrowRight, Shield, Sparkles, Star, Clock, CreditCardIcon, WalletIcon, MapIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentAnimation, SuccessAnimation, ScanPaperAnimation } from "@/components/ui/animation";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* هدر با استایل شیشه‌ای */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-bg w-8 h-8 rounded-md flex items-center justify-center">
              <CreditCardIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">سعید پی </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              ورود
            </Link>
            <Link href="/register">
              <Button variant="gradient" size="sm" className="hover-scale">ثبت‌نام</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* بخش قهرمان با طراحی روشن و کرم رنگ */}
        <section className="py-20 relative overflow-hidden section-cream">
          {/* شکل‌های تزئینی پس‌زمینه */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 text-center lg:text-right animate-fade-in">
                <div className="inline-block mb-4">
                  <span className="badge badge-primary py-1 px-3">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    <span>راه‌حل جدید پرداخت اقساطی</span>
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
                  <span className="gradient-text">خرید اقساطی هوشمند</span>
                  <br />
                  <span>با سعید پی </span>
                </h2>
                <p className="mt-6 text-lg text-primary/80 md:text-xl animate-slide-in-bottom" style={{animationDelay: '0.2s'}}>
                  بدون نیاز به چک و ضامن، با احراز هویت آنلاین در کمتر از ۱۰ دقیقه اعتبار بگیرید و از هزاران فروشگاه آنلاین و حضوری خرید اقساطی کنید.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
                  <Link href="/register">
                    <Button variant="gradient" size="lg" className="w-full sm:w-auto hover-scale">
                      <span>ثبت‌نام رایگان</span>
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/stores">
                    <Button variant="light" size="lg" className="w-full sm:w-auto hover-float">
                      فروشگاه‌های طرف قرارداد
                    </Button>
                  </Link>
                </div>
                
                {/* آمار */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-in-bottom" style={{animationDelay: '0.4s'}}>
                  <div className="hover-float">
                    <p className="text-3xl font-bold gradient-text">+۵۰۰</p>
                    <p className="text-primary/70">فروشگاه طرف قرارداد</p>
                  </div>
                  <div className="hover-float">
                    <p className="text-3xl font-bold gradient-text">+۵۰,۰۰۰</p>
                    <p className="text-primary/70">کاربر فعال</p>
                  </div>
                  <div className="hover-float">
                    <p className="text-3xl font-bold gradient-text">۹۸٪</p>
                    <p className="text-primary/70">رضایت مشتریان</p>
                  </div>
                  <div className="hover-float">
                    <p className="text-3xl font-bold gradient-text">۱۰ دقیقه</p>
                    <p className="text-primary/70">فعالسازی اعتبار</p>
                  </div>
                </div>
              </div>
              
              {/* انیمیشن پرداخت */}
              <div className="lg:w-1/2 flex justify-center animate-fade-in">
                <div className="w-full max-w-md h-96">
                  <PaymentAnimation className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* بخش مزایا با طراحی روشن */}
        <section className="py-16 section-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">چرا سعید پی ؟</h2>
              <p className="text-primary/70 max-w-2xl mx-auto">سیستم پرداخت اعتباری هوشمند سعید پی  مزایای بی‌نظیری را برای خریداران و فروشندگان فراهم می‌کند</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="feature-icon gradient-bg">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">اعتبار آنی</h3>
                <p className="text-primary/70">با تکمیل احراز هویت، در کمتر از 10 دقیقه اعتبار خود را دریافت کنید و بلافاصله خرید کنید.</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="badge badge-primary">بدون ضامن</span>
                  <span className="badge badge-secondary mr-2">بدون چک</span>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon accent-gradient-bg">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">امنیت پیشرفته</h3>
                <p className="text-primary/70">با استفاده از فناوری‌های رمزنگاری پیشرفته، امنیت اطلاعات شخصی و مالی شما را تضمین می‌کنیم.</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="badge badge-success">رمزنگاری بانکی</span>
                  <span className="badge badge-warning mr-2">حفظ حریم خصوصی</span>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon bg-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">انعطاف‌پذیری</h3>
                <p className="text-primary/70">برنامه‌های اقساطی متنوع با بازه‌های زمانی 3 تا 24 ماهه متناسب با نیاز و توان مالی شما.</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="badge badge-accent">پرداخت اقساطی</span>
                  <span className="badge badge-primary mr-2">تنوع طرح‌ها</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* بخش نحوه کار - با پس‌زمینه روشن */}
        <section className="py-16 section-light relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">نحوه کار سعید پی </h2>
              <p className="text-primary/70 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>در سه گام ساده، اعتبار خود را دریافت کنید و از خرید اقساطی لذت ببرید</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="relative">
                  {/* خط زمانی */}
                  <div className="absolute top-0 bottom-0 left-0 right-0 md:left-1/2 md:right-auto w-0.5 h-full bg-primary/20 md:translate-x-0 -translate-x-1/2 z-0"></div>
                  
                  <div className="space-y-12">
                    <div className="relative z-10">
                      <HowItWorksStep 
                        number={1}
                        title="ثبت‌نام و احراز هویت"
                        description="در سعید پی  ثبت‌نام کنید، اطلاعات هویتی خود را وارد کنید و فرآیند احراز هویت آنلاین را تکمیل نمایید."
                        icon={<UsersIcon className="h-6 w-6" />}
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <HowItWorksStep 
                        number={2}
                        title="دریافت اعتبار"
                        description="پس از تأیید، اعتبار خود را به صورت آنی دریافت کنید و سقف اعتبار شما مشخص می‌شود."
                        icon={<CreditCard className="h-6 w-6" />}
                        reverse
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <HowItWorksStep 
                        number={3}
                        title="خرید اقساطی"
                        description="از فروشگاه‌های طرف قرارداد به صورت آنلاین یا حضوری خرید کنید و هزینه را به صورت اقساطی پرداخت نمایید."
                        icon={<WalletIcon className="h-6 w-6" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                <div className="w-full max-w-md h-96">
                  <SuccessAnimation className="w-full h-full" />
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link href="/register">
                <Button variant="primary" className="hover-scale">
                  همین حالا شروع کنید
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* بخش قابلیت‌های ویژه */}
        <section className="py-16 section-cream">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">قابلیت‌های ویژه سعید پی </h2>
              <p className="text-primary/70 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>با امکانات متنوع و هوشمند سعید پی ، تجربه خرید اقساطی را به سطح جدیدی ببرید</p>
            </div>
            
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-16">
              <div className="lg:w-1/2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureCard 
                    title="کیف پول هوشمند" 
                    description="مدیریت موجودی، اقساط و تراکنش‌ها در یک کیف پول دیجیتال یکپارچه"
                    icon={<WalletIcon />}
                  />
                  
                  <FeatureCard 
                    title="افزایش اعتبار" 
                    description="با بازپرداخت به موقع اقساط، سقف اعتبار خود را تا ۵۰ میلیون تومان افزایش دهید"
                    icon={<ArrowRight />}
                  />
                  
                  <FeatureCard 
                    title="پرداخت با QR" 
                    description="در فروشگاه‌های فیزیکی با اسکن کد QR به سرعت خرید اقساطی انجام دهید"
                    icon={<Sparkles />}
                  />
                  
                  <FeatureCard 
                    title="فروشگاه‌های نزدیک" 
                    description="با نقشه هوشمند، نزدیک‌ترین فروشگاه‌های طرف قرارداد را پیدا کنید"
                    icon={<MapIcon />}
                  />
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center animate-fade-in">
                <div className="w-full max-w-md h-96">
                  <ScanPaperAnimation className="w-full h-full" loop={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* بخش نظرات مشتریان */}
        <section className="py-16 section-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">نظرات کاربران</h2>
              <p className="text-primary/70 max-w-2xl mx-auto">آنچه مشتریان درباره تجربه استفاده از سعید پی  می‌گویند</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard 
                name="علی محمدی"
                title="کاربر سعید پی "
                testimonial="با سعید پی  توانستم بدون دردسر ضامن و چک، لپ‌تاپ مورد نیازم را به صورت اقساطی تهیه کنم. فرآیند احراز هویت بسیار سریع بود و کمتر از ۱۰ دقیقه اعتبارم فعال شد."
                rating={5}
              />
              
              <TestimonialCard 
                name="مریم حسینی"
                title="صاحب فروشگاه"
                testimonial="به عنوان یک فروشگاه طرف قرارداد، سعید پی  به ما کمک کرد تا فروش محصولاتمان را افزایش دهیم. مشتریان از امکان خرید اقساطی بدون پیچیدگی استقبال کرده‌اند."
                rating={5}
              />
              
              <TestimonialCard 
                name="محمد رضایی"
                title="کاربر سعید پی "
                testimonial="کیف پول دیجیتال سعید پی  واقعاً کاربردی است. می‌توانم به راحتی اقساط را مدیریت کنم و از وضعیت اعتبارم مطلع باشم. رابط کاربری ساده و کاربرپسند است."
                rating={4}
              />
            </div>
          </div>
        </section>
        
        {/* بخش دعوت به عمل با رنگ آبی */}
        <section className="py-16 bg-primary text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">همین امروز به جمع کاربران سعید پی  بپیوندید</h2>
              <p className="mb-8 text-white/80">
                تنها با چند کلیک ثبت‌نام کنید، اعتبار خود را دریافت کنید و از خرید اقساطی آسان لذت ببرید.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button variant="accent" size="lg" className="hover-scale">
                    ثبت‌نام رایگان
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 border-white/20 text-white hover-float">
                    درباره سعید پی 
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="gradient-bg w-8 h-8 rounded-md flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold gradient-text">سعید پی </h3>
              </div>
              <p className="text-sm text-primary/70 mt-1">سامانه پرداخت اعتباری</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-primary hover:text-primary-hover transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="text-sm text-primary hover:text-primary-hover transition-colors">
                تماس با ما
              </Link>
              <Link href="/faq" className="text-sm text-primary hover:text-primary-hover transition-colors">
                سوالات متداول
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-primary/70">
            © {new Date().getFullYear()} سعید پی . تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}

// کامپوننت مراحل نحوه کار
interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  reverse?: boolean;
}

function HowItWorksStep({ number, title, description, icon, reverse = false }: HowItWorksStepProps) {
  return (
    <div className={`flex items-center ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}>
      <div className={`relative md:w-12 md:mx-6 mb-4 md:mb-0 ${reverse ? 'md:order-1' : ''}`}>
        <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold shadow-lg animate-pulse-soft z-20 relative">
          {number}
        </div>
        <div className="hidden md:block absolute top-0 left-0 right-0 bottom-0 bg-card rounded-full transform scale-150 opacity-20 animate-pulse z-10"></div>
      </div>
      <div className={`bg-card border border-border shadow-card rounded-xl p-6 w-full md:w-1/2 hover-float ${reverse ? 'text-right animate-slide-in-right' : 'text-right md:text-left animate-slide-in-left'}`} style={{ animationDelay: `${0.2 * number}s` }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-sm text-white">
            {icon}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-primary/70">{description}</p>
      </div>
    </div>
  );
}

// کامپوننت کارت قابلیت‌های ویژه
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-border hover-float card-hover text-center">
      <div className="w-12 h-12 rounded-full gradient-bg mx-auto flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-primary/70 text-sm">{description}</p>
    </div>
  );
}

// کامپوننت کارت نظرات مشتریان
interface TestimonialCardProps {
  name: string;
  title: string;
  testimonial: string;
  rating: number;
}

function TestimonialCard({ name, title, testimonial, rating }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-border hover-float card-hover">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-accent' : 'text-secondary-light'}`} />
        ))}
      </div>
      <p className="text-primary/70 mb-4">{testimonial}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-primary/60">{title}</p>
        </div>
      </div>
    </div>
  );
}
