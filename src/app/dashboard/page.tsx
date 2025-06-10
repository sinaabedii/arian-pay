"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, ShoppingBag, BarChart3, Bell, Zap, Calendar, Percent, Tag, ChevronRight, ArrowUpRight, ArrowDownRight, Info, QrCode, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";
import { AnimatedButton } from "@/components/ui/animated-button";
import { BankCard, BankType } from "@/components/ui/bank-card";

// نمونه داده برای آخرین تراکنش‌ها
const MOCK_RECENT_TRANSACTIONS = [
  { id: "1", title: "خرید از دیجی کالا", amount: 2500000, type: "expense", date: "دیروز", iconBg: "bg-primary-light text-primary", icon: <ShoppingBag size={14} /> },
  { id: "2", title: "شارژ کیف پول", amount: 5000000, type: "income", date: "۳ روز پیش", iconBg: "bg-success-light text-success", icon: <Wallet size={14} /> },
  { id: "3", title: "پرداخت قسط", amount: 1500000, type: "expense", date: "هفته گذشته", iconBg: "bg-accent-light text-accent", icon: <Calendar size={14} /> },
];

// نمونه داده برای پیشنهادات ویژه
const MOCK_OFFERS = [
  { id: "1", title: "تخفیف ۲۵٪ خرید لوازم خانگی", store: "فروشگاه ایران کالا", expiresIn: "۳ روز" },
  { id: "2", title: "تقسیط بدون کارمزد", store: "فروشگاه دیجی کالا", expiresIn: "۵ روز" },
];

// نمونه داده برای یادآوری‌ها
const MOCK_REMINDERS = [
  { id: "1", title: "پرداخت قسط بعدی", date: "۱۵ مهر", daysLeft: 3, amount: 2500000 },
];

// دیتای نمونه برای کارت‌های بانکی
const MOCK_BANK_CARDS = [
  {
    id: "1",
    bank: "mellat" as BankType,
    cardNumber: "6104337812345678",
    accountNumber: "12345678901",
    sheba: "123456789012345678901234",
    cardHolderName: "امیرحسین محمدی",
    expiryDate: "1404/05",
    isDefault: true,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  
  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* هدر داشبورد */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold gradient-text">سلام، {user.name} 👋</h1>
            <p className="text-secondary mt-1">خوش آمدید! خلاصه حساب و فعالیت‌های شما در اینجا نمایش داده می‌شود.</p>
          </div>
          <div className="flex gap-2">
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              className="gap-1"
              animation="float"
              onClick={() => router.push("/credit-request")}
            >
              <Zap size={16} />
              افزایش اعتبار
            </AnimatedButton>
            <AnimatedButton 
              variant="gradient" 
              size="sm" 
              className="gap-1"
              animation="scale"
              onClick={() => router.push("/wallet")}
            >
              <Wallet size={16} />
              شارژ کیف پول
            </AnimatedButton>
          </div>
        </div>
        
        {/* کارت‌های اطلاعاتی اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            title="کیف پول"
            value={formatCurrency(user.walletBalance)}
            icon={<Wallet className="h-5 w-5 text-white" />}
            trend={{ value: "+12%", isPositive: true, label: "از ماه گذشته" }}
            onClick={() => router.push("/wallet")}
          />
          
          <InfoCard 
            title="اعتبار"
            value={user.creditLimit ? formatCurrency(user.creditLimit) : "درخواست اعتبار"}
            icon={<CreditCard className="h-5 w-5 text-white" />}
            trend={user.creditLimit ? { value: "50%", isPositive: true, label: "باقیمانده" } : undefined}
            onClick={() => router.push("/credit-request")}
          />
          
          <InfoCard 
            title="مجموع پرداخت‌ها"
            value={formatCurrency(4500000)}
            icon={<BarChart3 className="h-5 w-5 text-white" />}
            trend={{ value: "-5%", isPositive: false, label: "از ماه گذشته" }}
          />
          
          <InfoCard 
            title="اقساط فعال"
            value="2 قسط"
            icon={<Calendar className="h-5 w-5 text-white" />}
            badge={{ label: "قسط بعدی: 3 روز دیگر", variant: "warning" }}
            onClick={() => router.push("/installments")}
          />
        </div>
        
        {/* بخش اقساط و کارت‌های بانکی */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* کارت اقساط فعال */}
          <Card className="col-span-1 hover-float card-hover shadow-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-warning-400 to-warning-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warning" />
                اقساط فعال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_REMINDERS.map((reminder) => (
                  <div key={reminder.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{reminder.title}</div>
                      <div className={`${reminder.daysLeft <= 3 ? 'text-danger' : 'text-warning'} font-medium`}>
                        {reminder.daysLeft} روز مانده
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-secondary">
                      <div>تاریخ سررسید: {reminder.date}</div>
                      <div>{formatCurrency(reminder.amount)}</div>
                    </div>
                    <div className="w-full bg-secondary-light rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-warning-400 to-warning-500 h-2 rounded-full" 
                        style={{ width: `${((30 - reminder.daysLeft) / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <AnimatedButton variant="outline" className="w-full gap-1" animation="float" onClick={() => router.push("/installments")}>
                  <Calendar size={16} />
                  مشاهده همه اقساط
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
          
          {/* کارت حساب بانکی */}
          <Card className="col-span-1 lg:col-span-2 hover-float card-hover shadow-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary-300 to-primary-500"></div>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                حساب‌های بانکی
              </CardTitle>
              <AnimatedButton 
                variant="ghost" 
                size="sm" 
                className="gap-1 h-8" 
                animation="float"
                onClick={() => router.push("/wallet")}
              >
                مدیریت حساب‌ها
                <ChevronRight size={16} />
              </AnimatedButton>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <div className="text-sm text-secondary">کارت پیش‌فرض</div>
                  </div>
                  <div className="w-full max-w-sm">
                    <BankCard 
                      {...MOCK_BANK_CARDS[0]}
                      /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                      onCopy={(text, textType) => {
                        // در اینجا می‌توانید منطق کپی کردن را قرار دهید
                        navigator.clipboard.writeText(text);
                      }}
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div className="text-sm text-secondary mb-1">تراکنش‌های اخیر</div>
                  {MOCK_RECENT_TRANSACTIONS.slice(0, 2).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 hover:bg-secondary-50/50 p-2 rounded-md transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center shadow-sm`}>
                          {transaction.icon}
                        </div>
                        <div>
                          <div className="font-medium">{transaction.title}</div>
                          <div className="text-xs text-secondary">{transaction.date}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount).split(" ")[0]}
                      </div>
                    </div>
                  ))}
                  <AnimatedButton 
                    variant="outline" 
                    className="w-full gap-1 mt-2" 
                    animation="float"
                    onClick={() => router.push("/wallet")}
                  >
                    <Wallet size={16} />
                    مشاهده کیف پول
                  </AnimatedButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* ویجت‌های ویژه */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ویجت پیشنهادات ویژه */}
          <Card className="hover-float card-hover shadow-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-accent-400 to-accent-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-accent" />
                پیشنهادات ویژه برای شما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_OFFERS.map((offer) => (
                  <div key={offer.id} className="p-4 bg-secondary-light rounded-lg hover:bg-secondary-50 transition-colors cursor-pointer hover-float border border-secondary-300/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{offer.title}</div>
                        <div className="text-sm text-secondary mt-1">{offer.store}</div>
                      </div>
                      <div className="badge badge-accent animate-pulse-soft">
                        انقضا: {offer.expiresIn}
                      </div>
                    </div>
                  </div>
                ))}
                
                <AnimatedButton variant="outline" className="w-full mt-2 gap-1" animation="float">
                  <Tag size={16} />
                  مشاهده همه پیشنهادات
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
          
          {/* ویجت یادآوری‌ها */}
          <Card className="hover-float card-hover shadow-card overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-warning-400 to-warning-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                یادآوری‌های مهم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_REMINDERS.map((reminder) => (
                  <div key={reminder.id} className="p-4 border border-warning-200 bg-warning-50 rounded-lg hover-float shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Calendar size={16} className="text-warning" />
                          {reminder.title}
                        </div>
                        <div className="text-sm text-secondary mt-1">تاریخ: {reminder.date}</div>
                        <div className="text-sm font-medium mt-2">
                          {formatCurrency(reminder.amount)}
                        </div>
                      </div>
                      <div className="badge badge-warning animate-pulse-soft">
                        {reminder.daysLeft} روز مانده
                      </div>
                    </div>
                  </div>
                ))}
                
                <AnimatedButton 
                  variant="accent" 
                  className="w-full mt-2"
                  animation="scale"
                  onClick={() => router.push("/installments")}
                >
                  مدیریت اقساط
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* سرویس‌های پرکاربرد */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            سرویس‌های پرکاربرد
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServiceCard 
              icon={<QrCode size={20} />}
              title="پرداخت با QR"
              description="پرداخت سریع با اسکن کد QR"
              onClick={() => router.push("/qr-payment")}
              gradient="bg-gradient-to-r from-primary-600 to-primary-500"
            />
            
            <ServiceCard 
              icon={<CreditCard size={20} />}
              title="اقساط من"
              description="مدیریت اقساط و پرداخت‌ها"
              onClick={() => router.push("/installments")}
              gradient="bg-gradient-to-r from-accent-600 to-accent-500"
            />
            
            <ServiceCard 
              icon={<ShoppingBag size={20} />}
              title="فروشگاه‌ها"
              description="مشاهده فروشگاه‌های طرف قرارداد"
              onClick={() => router.push("/stores")}
              gradient="bg-gradient-to-r from-success-600 to-success-500"
            />
            
            <ServiceCard 
              icon={<User size={20} />}
              title="پروفایل من"
              description="مدیریت اطلاعات شخصی"
              onClick={() => router.push("/profile")}
              gradient="bg-gradient-to-r from-classic-blue-700 to-classic-blue-600"
            />
          </div>
        </div>

        {/* ویجت تجزیه و تحلیل مالی */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">تجزیه و تحلیل مالی</h2>
          <Card className="hover-float card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>الگوی مصرف شما</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/transactions")}>
                  مشاهده جزئیات
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* نمودار دایره‌ای دسته‌بندی هزینه‌ها */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">۸,۵۰۰,۰۰۰</div>
                        <div className="text-xs text-secondary">مجموع هزینه‌ها</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--primary-light)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--accent-light)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--secondary-light)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="var(--success-light)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="251.2"
                        strokeDashoffset="175.84"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <ExpenseCategoryItem 
                      category="خرید لوازم الکترونیکی" 
                      amount="۴,۲۰۰,۰۰۰" 
                      percentage={45} 
                      color="bg-primary-light"
                    />
                    <ExpenseCategoryItem 
                      category="خرید لوازم خانگی" 
                      amount="۲,۵۰۰,۰۰۰" 
                      percentage={30} 
                      color="bg-accent-light"
                    />
                    <ExpenseCategoryItem 
                      category="سوپرمارکت" 
                      amount="۱,۲۰۰,۰۰۰" 
                      percentage={15} 
                      color="bg-secondary-light"
                    />
                    <ExpenseCategoryItem 
                      category="سایر" 
                      amount="۶۰۰,۰۰۰" 
                      percentage={10} 
                      color="bg-success-light"
                    />
                  </div>
                </div>
                
                {/* آمار مقایسه‌ای با ماه قبل */}
                <div>
                  <h3 className="text-sm font-medium mb-3">مقایسه با ماه قبل</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <ComparisonStat 
                      title="مجموع هزینه‌ها" 
                      current="۸,۵۰۰,۰۰۰" 
                      isPositive={true}
                      percentChange="۸٪"
                    />
                    <ComparisonStat 
                      title="میانگین هر خرید" 
                      current="۱,۷۰۰,۰۰۰" 
                      isPositive={false}
                      percentChange="۱۳٪"
                    />
                    <ComparisonStat 
                      title="تعداد خریدها" 
                      current="۵" 
                      isPositive={true}
                      percentChange="۱۶٪"
                    />
                  </div>
                </div>
                
                {/* پیشنهادات بهینه‌سازی هزینه */}
                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-medium mb-2">پیشنهادات بهینه‌سازی هزینه</h3>
                  <div className="p-3 bg-secondary-light rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="p-1 rounded-full bg-accent-light text-accent mt-0.5">
                        <Info size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">صرفه‌جویی در هزینه‌های لوازم الکترونیکی</p>
                        <p className="text-xs text-secondary mt-1">
                          با خرید اقساطی از فروشگاه‌های طرف قرارداد می‌توانید تا ۱۵٪ در هزینه‌های لوازم الکترونیکی صرفه‌جویی کنید.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean; label: string };
  badge?: { label: string; variant: string };
  onClick?: () => void;
}

function InfoCard({ title, value, icon, trend, badge, onClick }: InfoCardProps) {
  return (
    <Card 
      className={`hover-float card-hover transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-soft animate-pulse-soft">
            {icon}
          </div>
          
          {badge && (
            <div className={`badge badge-${badge.variant} animate-pulse-soft`}>
              {badge.label}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-secondary">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <div className={`text-xs font-medium flex items-center gap-1 
                ${trend.isPositive ? 'text-success' : 'text-danger'}`}
              >
                {trend.isPositive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {trend.value}
              </div>
              <span className="text-xs text-secondary mr-1">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}

function ServiceCard({ icon, title, description, onClick, gradient }: ServiceCardProps) {
  return (
    <div 
      className="feature-card hover-float cursor-pointer"
      onClick={onClick}
    >
      <div className={`feature-icon ${gradient}`}>
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-secondary mt-1">{description}</p>
    </div>
  );
}

interface ExpenseCategoryItemProps {
  category: string;
  amount: string;
  percentage: number;
  color: string;
}

function ExpenseCategoryItem({ category, amount, percentage, color }: ExpenseCategoryItemProps) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{category}</span>
        <span className="text-sm">{amount}</span>
      </div>
      <div className="w-full h-2 bg-secondary-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

interface ComparisonStatProps {
  title: string;
  current: string;
  isPositive: boolean;
  percentChange: string;
}

function ComparisonStat({ title, current, isPositive, percentChange }: ComparisonStatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-secondary">{title}</span>
      <div className="flex items-center mt-1">
        <span className="text-lg font-bold">{current}</span>
        <div className={`text-xs ml-2 px-1.5 py-0.5 rounded-md flex items-center ${
          isPositive ? 'bg-success-light/30 text-success' : 'bg-danger-light/30 text-danger'
        }`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {percentChange}
        </div>
      </div>
    </div>
  );
} 