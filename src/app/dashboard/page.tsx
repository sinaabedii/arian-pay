"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  CreditCard, 
  Wallet, 
  ShoppingBag, 
  BarChart3,
  Bell, 
  Zap, 
  Calendar,
  Percent, 
  Tag, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  QrCode, 
  User 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

// نمونه داده برای آخرین تراکنش‌ها
const MOCK_RECENT_TRANSACTIONS = [
  { id: "1", title: "خرید از دیجی کالا", amount: 2500000, type: "expense", date: "دیروز", iconBg: "bg-blue-100 text-blue-600", icon: <ShoppingBag size={14} /> },
  { id: "2", title: "شارژ کیف پول", amount: 5000000, type: "income", date: "۳ روز پیش", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
  { id: "3", title: "پرداخت قسط", amount: 1500000, type: "expense", date: "هفته گذشته", iconBg: "bg-purple-100 text-purple-600", icon: <Calendar size={14} /> },
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
    bank: "mellat",
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

  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  return (
    <div className="space-y-8">
      {/* هدر داشبورد */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">سلام، {user?.name || 'کاربر عزیز'} 👋</h1>
          <p className="text-gray-600 mt-1">خوش آمدید! خلاصه حساب و فعالیت‌های شما در اینجا نمایش داده می‌شود.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={() => router.push("/dashboard/credit-request")}
          >
            <Zap size={16} className="text-amber-500" />
            افزایش اعتبار
          </Button>
          <Button 
            className="gap-1 bg-blue-600 hover:bg-blue-700" 
            size="sm"
            onClick={() => router.push("/dashboard/wallet")}
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
          value={formatCurrency(user?.walletBalance || 2500000)}
          icon={<Wallet className="h-5 w-5 text-white" />}
          trend={{ value: "+12%", isPositive: true, label: "از ماه گذشته" }}
          onClick={() => router.push("/dashboard/wallet")}
          color="bg-blue-600"
        />
        
        <InfoCard 
          title="اعتبار"
          value={user?.creditLimit ? formatCurrency(user.creditLimit) : "درخواست اعتبار"}
          icon={<CreditCard className="h-5 w-5 text-white" />}
          trend={user?.creditLimit ? { value: "50%", isPositive: true, label: "باقیمانده" } : undefined}
          onClick={() => router.push("/dashboard/credit-request")}
          color="bg-purple-600"
        />
        
        <InfoCard 
          title="مجموع پرداخت‌ها"
          value={formatCurrency(4500000)}
          icon={<BarChart3 className="h-5 w-5 text-white" />}
          trend={{ value: "-5%", isPositive: false, label: "از ماه گذشته" }}
          color="bg-emerald-600"
        />
        
        <InfoCard 
          title="اقساط فعال"
          value="2 قسط"
          icon={<Calendar className="h-5 w-5 text-white" />}
          badge={{ label: "قسط بعدی: 3 روز دیگر", variant: "warning" }}
          onClick={() => router.push("/dashboard/installments")}
          color="bg-amber-500"
        />
      </div>
      
      {/* بخش اقساط و کارت‌های بانکی */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* کارت اقساط فعال */}
        <Card className="col-span-1 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              اقساط فعال
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_REMINDERS.map((reminder) => (
                <div key={reminder.id} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{reminder.title}</div>
                    <div className={`${reminder.daysLeft <= 3 ? 'text-red-500' : 'text-amber-500'} font-medium`}>
                      {reminder.daysLeft} روز مانده
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div>تاریخ سررسید: {reminder.date}</div>
                    <div>{formatCurrency(reminder.amount)}</div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full" 
                      style={{ width: `${((30 - reminder.daysLeft) / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full gap-1" onClick={() => router.push("/dashboard/installments")}>
                <Calendar size={16} />
                مشاهده همه اقساط
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* کارت حساب بانکی */}
        <Card className="col-span-1 lg:col-span-2 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              حساب‌های بانکی
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 h-8"
              onClick={() => router.push("/dashboard/wallet")}
            >
              مدیریت حساب‌ها
              <ChevronRight size={16} />
            </Button>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="mb-4">
                  <div className="text-sm text-gray-500">کارت پیش‌فرض</div>
                </div>
                <div className="w-full max-w-sm">
                  {/* کارت بانکی */}
                  <div className="w-full h-44 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10">
                      <div className="absolute transform rotate-45 translate-x-1/2 -translate-y-1/2 right-0 top-0 w-40 h-40 bg-white rounded-full"></div>
                      <div className="absolute transform rotate-45 translate-x-1/3 translate-y-1/3 right-0 bottom-0 w-40 h-40 bg-white rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-lg font-semibold">بانک ملت</span>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <CreditCard className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between text-xl font-mono tracking-wider">
                        <span>6104</span>
                        <span>3378</span>
                        <span>1234</span>
                        <span>5678</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-white/70">دارنده کارت</div>
                        <div className="font-medium">امیرحسین محمدی</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/70">انقضا</div>
                        <div className="font-medium">۱۴۰۴/۰۵</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="text-sm text-gray-500 mb-1">تراکنش‌های اخیر</div>
                {MOCK_RECENT_TRANSACTIONS.slice(0, 2).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center shadow-sm`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.title}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount).split(" ")[0]}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    className="w-full gap-1"
                    onClick={() => router.push("/dashboard/wallet")}
                  >
                    <Wallet size={16} />
                    کیف پول
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-1"
                    onClick={() => router.push("/dashboard/transactions")}
                  >
                    <BarChart3 size={16} />
                    تراکنش‌ها
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* ویجت‌های ویژه */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ویجت پیشنهادات ویژه */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Percent className="h-5 w-5 text-purple-600" />
              پیشنهادات ویژه برای شما
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_OFFERS.map((offer) => (
                <div key={offer.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{offer.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{offer.store}</div>
                    </div>
                    <div className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
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
        
        {/* سرویس‌های پرکاربرد */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              سرویس‌های پرکاربرد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <ServiceCard 
                icon={<QrCode size={20} />}
                title="پرداخت با QR"
                description="پرداخت سریع با اسکن کد"
                onClick={() => router.push("/dashboard/qr-payment")}
                gradient="from-blue-600 to-blue-500"
                iconColor="text-blue-600"
              />
              
              <ServiceCard 
                icon={<CreditCard size={20} />}
                title="اقساط من"
                description="مدیریت اقساط و پرداخت‌ها"
                onClick={() => router.push("/dashboard/installments")}
                gradient="from-purple-600 to-purple-500"
                iconColor="text-purple-600"
              />
              
              <ServiceCard 
                icon={<ShoppingBag size={20} />}
                title="فروشگاه‌ها"
                description="فروشگاه‌های طرف قرارداد"
                onClick={() => router.push("/dashboard/stores")}
                gradient="from-green-600 to-green-500"
                iconColor="text-green-600"
              />
              
              <ServiceCard 
                icon={<User size={20} />}
                title="پروفایل من"
                description="مدیریت اطلاعات شخصی"
                onClick={() => router.push("/dashboard/profile")}
                gradient="from-amber-600 to-amber-500"
                iconColor="text-amber-600"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean; label: string };
  badge?: { label: string; variant: string };
  onClick?: () => void;
  color?: string;
}

function InfoCard({ title, value, icon, trend, badge, onClick, color = "bg-blue-600" }: InfoCardProps) {
  return (
    <Card 
      className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shadow-sm`}>
            {icon}
          </div>
          
          {badge && (
            <div className={`px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full`}>
              {badge.label}
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold mt-1 text-gray-900">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <div className={`text-xs font-medium flex items-center gap-1 
                ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}
              >
                {trend.isPositive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {trend.value}
              </div>
              <span className="text-xs text-gray-500 mr-1">{trend.label}</span>
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
  iconColor: string;
}

function ServiceCard({ icon, title, description, onClick, gradient, iconColor }: ServiceCardProps) {
  return (
    <div 
      className="rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-lg bg-${iconColor.split('-')[1]}-50 flex items-center justify-center mb-3`}>
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
} 