"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, PiggyBank, ShoppingBag, BarChart3, Bell, Zap, Calendar, Percent, Tag, ChevronRight, ArrowUpRight, ArrowDownRight, Info, QrCode, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";

const MOCK_CHART_DATA = [
  { month: "فروردین", amount: 1200000 },
  { month: "اردیبهشت", amount: 1800000 },
  { month: "خرداد", amount: 1500000 },
  { month: "تیر", amount: 2200000 },
  { month: "مرداد", amount: 2500000 },
  { month: "شهریور", amount: 1800000 },
];

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">سلام، {user.name} 👋</h1>
            <p className="text-secondary mt-1">خوش آمدید! خلاصه حساب و فعالیت‌های شما در اینجا نمایش داده می‌شود.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => router.push("/credit-request")}
            >
              <Zap size={16} />
              افزایش اعتبار
            </Button>
            <Button 
              variant="accent" 
              size="sm" 
              className="gap-1"
              onClick={() => router.push("/wallet")}
            >
              <Wallet size={16} />
              شارژ کیف پول
            </Button>
          </div>
        </div>
        
        {/* کارت‌های اطلاعاتی اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard 
            title="کیف پول"
            value={formatCurrency(user.walletBalance)}
            icon={<Wallet className="h-5 w-5 text-primary" />}
            trend={{ value: "+12%", isPositive: true, label: "از ماه گذشته" }}
            onClick={() => router.push("/wallet")}
          />
          
          <InfoCard 
            title="اعتبار"
            value={user.creditLimit ? formatCurrency(user.creditLimit) : "درخواست اعتبار"}
            icon={<CreditCard className="h-5 w-5 text-accent" />}
            trend={user.creditLimit ? { value: "50%", isPositive: true, label: "باقیمانده" } : undefined}
            onClick={() => router.push("/credit-request")}
          />
          
          <InfoCard 
            title="مجموع پرداخت‌ها"
            value={formatCurrency(4500000)}
            icon={<BarChart3 className="h-5 w-5 text-success" />}
            trend={{ value: "-5%", isPositive: false, label: "از ماه گذشته" }}
          />
          
          <InfoCard 
            title="اقساط فعال"
            value="2 قسط"
            icon={<Calendar className="h-5 w-5 text-secondary" />}
            badge={{ label: "قسط بعدی: 3 روز دیگر", variant: "warning" }}
            onClick={() => router.push("/installments")}
          />
        </div>
        
        {/* نمودار و تراکنش‌های اخیر */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* کارت نمودار */}
          <Card className="col-span-1 lg:col-span-2 hover-float card-hover">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                روند مصرف اعتبار
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8">هفتگی</Button>
                <Button variant="primary" size="sm" className="h-8">ماهانه</Button>
                <Button variant="outline" size="sm" className="h-8">سالانه</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] mt-3">
                {/* نمایش نمودار ساده */}
                <div className="relative h-full flex items-end">
                  {MOCK_CHART_DATA.map((item, index) => {
                    // محاسبه ارتفاع بار برای نمودار
                    const maxAmount = Math.max(...MOCK_CHART_DATA.map(d => d.amount));
                    const height = (item.amount / maxAmount) * 100;
                    
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full max-w-[40px] rounded-t-md ${index === 4 ? 'bg-primary' : 'bg-primary/40'}`} 
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-secondary mt-2">{item.month}</div>
                        <div className="text-xs font-medium mt-1">{formatCurrency(item.amount).split(" ")[0]}</div>
                      </div>
                    );
                  })}
                  
                  {/* خط افقی */}
                  <div className="absolute left-0 right-0 bottom-[40px] border-t border-dashed border-border"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* کارت تراکنش‌های اخیر */}
          <Card className="hover-float card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  آخرین تراکنش‌ها
                </div>
                <Button variant="ghost" size="sm" className="gap-1 h-8" onClick={() => router.push("/wallet")}>
                  مشاهده همه
                  <ChevronRight size={16} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_RECENT_TRANSACTIONS.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${transaction.iconBg} flex items-center justify-center`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.title}</div>
                        <div className="text-xs text-secondary">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount).split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* ویجت‌های ویژه */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ویجت پیشنهادات ویژه */}
          <Card className="hover-float card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-accent" />
                پیشنهادات ویژه برای شما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_OFFERS.map((offer) => (
                  <div key={offer.id} className="p-3 bg-secondary-light rounded-lg hover:bg-secondary-light/70 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{offer.title}</div>
                        <div className="text-sm text-secondary">{offer.store}</div>
                      </div>
                      <div className="badge badge-accent">
                        انقضا: {offer.expiresIn}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2 gap-1">
                  <Tag size={16} />
                  مشاهده همه پیشنهادات
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* ویجت یادآوری‌ها */}
          <Card className="hover-float card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                یادآوری‌های مهم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_REMINDERS.map((reminder) => (
                  <div key={reminder.id} className="p-4 border border-warning/20 bg-warning/5 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{reminder.title}</div>
                        <div className="text-sm text-secondary">تاریخ: {reminder.date}</div>
                        <div className="text-sm text-secondary mt-1">مبلغ: {formatCurrency(reminder.amount)}</div>
                      </div>
                      <div className="badge badge-warning">
                        {reminder.daysLeft} روز مانده
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="accent" size="sm" className="w-full gap-1">
                        پرداخت قسط
                      </Button>
                    </div>
                  </div>
                ))}
                
                {MOCK_REMINDERS.length === 0 && (
                  <div className="p-6 text-center">
                    <div className="text-secondary">یادآوری فعالی وجود ندارد</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* بخش خدمات */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4">خدمات آرین پی</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServiceCard
              icon={<ShoppingBag className="h-6 w-6" />}
              title="خرید آنلاین"
              description="خرید از فروشگاه‌های آنلاین با استفاده از اعتبار"
              onClick={() => router.push("/stores")}
              gradient="gradient-bg"
            />
            
            <ServiceCard
              icon={<QrCode className="h-6 w-6" />}
              title="پرداخت با QR"
              description="پرداخت سریع در فروشگاه‌های فیزیکی با اسکن QR کد"
              onClick={() => router.push("/qr-payment")}
              gradient="accent-gradient-bg"
            />
            
            <ServiceCard
              icon={<PiggyBank className="h-6 w-6" />}
              title="اقساط"
              description="مدیریت و پرداخت اقساط خریدهای اعتباری"
              onClick={() => router.push("/installments")}
              gradient="bg-primary"
            />
            
            <ServiceCard
              icon={<CreditCard className="h-6 w-6" />}
              title="درخواست اعتبار"
              description="افزایش یا درخواست اعتبار جدید"
              onClick={() => router.push("/credit-request")}
              gradient="bg-secondary"
            />
            
            <ServiceCard
              icon={<ShoppingBag className="h-6 w-6" />}
              title="فروشگاه‌های حضوری"
              description="مشاهده فروشگاه‌های فیزیکی نزدیک شما"
              onClick={() => router.push("/stores?tab=physical")}
              gradient="bg-accent"
            />
            
            <ServiceCard
              icon={<Bell className="h-6 w-6" />}
              title="اعلان‌ها و یادآوری‌ها"
              description="مدیریت اعلان‌ها و یادآوری‌های مهم"
              onClick={() => router.push("/notifications")}
              gradient="bg-warning"
            />
            
            <ServiceCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="تاریخچه تراکنش‌ها"
              description="مشاهده و مدیریت تمامی تراکنش‌های شما"
              onClick={() => router.push("/transactions")}
              gradient="bg-success"
            />
            
            <ServiceCard
              icon={<User className="h-6 w-6" />}
              title="پروفایل"
              description="مشاهده و ویرایش اطلاعات شخصی"
              onClick={() => router.push("/profile")}
              gradient="gradient-elegant"
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
    <Card className={`hover-float ${onClick ? 'cursor-pointer' : ''} card-hover`} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-full bg-primary-light">{icon}</div>
          {badge && (
            <div className={`badge badge-${badge.variant}`}>
              {badge.label}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-secondary">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {trend && (
            <div className="flex items-center text-xs">
              <span className={trend.isPositive ? "text-success flex items-center" : "text-danger flex items-center"}>
                {trend.isPositive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                {trend.value}
              </span>
              <span className="text-secondary mr-1">{trend.label}</span>
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
    <Card className="hover-scale cursor-pointer card-hover" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={`p-3 rounded-full ${gradient} text-white mb-4`}>
          {icon}
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-xs text-secondary">{description}</p>
      </CardContent>
    </Card>
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
    <div className="flex items-start gap-2">
      <div className={`w-3 h-3 rounded-full ${color} mt-1.5`}></div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-sm font-medium">{category}</span>
          <span className="text-sm">{percentage}%</span>
        </div>
        <p className="text-xs text-secondary">{amount} تومان</p>
        <div className="w-full bg-secondary-light rounded-full h-1.5 mt-1">
          <div className={`h-1.5 rounded-full ${color.replace('light', '')}`} style={{ width: `${percentage}%` }}></div>
        </div>
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
    <div className="p-3 bg-secondary-light rounded-lg">
      <p className="text-xs text-secondary mb-1">{title}</p>
      <p className="font-medium">{current}</p>
      <div className="flex items-center mt-1 text-xs">
        <span className={isPositive ? "text-success flex items-center" : "text-danger flex items-center"}>
          {isPositive ? <ArrowDownRight size={12} className="mr-1" /> : <ArrowUpRight size={12} className="mr-1" />}
          {percentChange}
        </span>
        <span className="text-secondary mr-1">از ماه قبل</span>
      </div>
    </div>
  );
} 