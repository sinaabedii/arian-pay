"use client";

import { useRouter } from "next/navigation";
import {
  CreditCard,
  Wallet,
  ShoppingBag,
  BarChart3,
  Zap,
  Calendar,
  Percent,
  Tag,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  QrCode,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

const MOCK_RECENT_TRANSACTIONS = [
  {
    id: "1",
    title: "خرید از دیجی کالا",
    amount: 2500000,
    type: "expense",
    date: "دیروز",
    iconBg: "bg-blue-100 text-blue-600",
    icon: <ShoppingBag size={14} />,
  },
  {
    id: "2",
    title: "شارژ کیف پول",
    amount: 5000000,
    type: "income",
    date: "۳ روز پیش",
    iconBg: "bg-green-100 text-green-600",
    icon: <Wallet size={14} />,
  },
  {
    id: "3",
    title: "پرداخت قسط",
    amount: 1500000,
    type: "expense",
    date: "هفته گذشته",
    iconBg: "bg-purple-100 text-purple-600",
    icon: <Calendar size={14} />,
  },
];

const MOCK_OFFERS = [
  {
    id: "1",
    title: "تخفیف ۲۵٪ خرید لوازم خانگی",
    store: "فروشگاه ایران کالا",
    expiresIn: "۳ روز",
  },
  {
    id: "2",
    title: "تقسیط بدون کارمزد",
    store: "فروشگاه دیجی کالا",
    expiresIn: "۵ روز",
  },
];

const MOCK_REMINDERS = [
  {
    id: "1",
    title: "پرداخت قسط بعدی",
    date: "۱۵ مهر",
    daysLeft: 3,
    amount: 2500000,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8 p-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              سلام، {user?.name || "کاربر عزیز"} 👋
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              خوش آمدید! خلاصه حساب و فعالیت‌های شما در اینجا نمایش داده می‌شود.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
              onClick={() => router.push("/dashboard/credit-request")}
            >
              <Zap size={16} className="text-amber-500" />
              <span className="hidden sm:inline">افزایش اعتبار</span>
              <span className="sm:hidden">اعتبار</span>
            </Button>
            <Button
              className="gap-1 bg-blue-600 hover:bg-blue-700"
              size="sm"
              onClick={() => router.push("/dashboard/wallet")}
            >
              <Wallet size={16} />
              <span className="hidden sm:inline">شارژ کیف پول</span>
              <span className="sm:hidden">کیف پول</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
            value={
              user?.creditLimit
                ? formatCurrency(user.creditLimit)
                : "درخواست اعتبار"
            }
            icon={<CreditCard className="h-5 w-5 text-white" />}
            trend={
              user?.creditLimit
                ? { value: "50%", isPositive: true, label: "باقیمانده" }
                : undefined
            }
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <Card className="col-span-1 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-500" />
                اقساط فعال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_REMINDERS.map((reminder) => (
                  <div key={reminder.id} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-gray-900">
                        {reminder.title}
                      </div>
                      <div
                        className={`${
                          reminder.daysLeft <= 3
                            ? "text-red-500"
                            : "text-amber-500"
                        } font-medium text-sm px-2 py-1 rounded-full ${
                          reminder.daysLeft <= 3 ? "bg-red-50" : "bg-amber-50"
                        }`}
                      >
                        {reminder.daysLeft} روز مانده
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div>تاریخ سررسید: {reminder.date}</div>
                      <div className="font-medium text-gray-900">
                        {formatCurrency(reminder.amount)}
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${((30 - reminder.daysLeft) / 30) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full gap-1 border-gray-300 hover:border-amber-600 hover:text-amber-600 mt-4"
                  onClick={() => router.push("/dashboard/installments")}
                >
                  <Calendar size={16} />
                  مشاهده همه اقساط
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                حساب‌های بانکی
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 h-8 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => router.push("/dashboard/wallet")}
              >
                <span className="hidden sm:inline">مدیریت حساب‌ها</span>
                <span className="sm:hidden">مدیریت</span>
                <ChevronRight size={16} />
              </Button>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/2">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500">کارت پیش‌فرض</div>
                  </div>
                  <div className="w-full max-w-sm mx-auto lg:mx-0">
                    <div className="w-full h-44 sm:h-48 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                      <div className="absolute top-0 right-0 w-full h-full opacity-10">
                        <div className="absolute transform rotate-45 translate-x-1/2 -translate-y-1/2 right-0 top-0 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full"></div>
                        <div className="absolute transform rotate-45 translate-x-1/3 translate-y-1/3 right-0 bottom-0 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full"></div>
                      </div>
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-semibold">
                            بانک ملت
                          </span>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <CreditCard className="h-4 w-4 sm:h-6 sm:w-6" />
                          </div>
                        </div>
                        <div className="my-4">
                          <div className="flex justify-between text-lg sm:text-xl font-mono tracking-wider">
                            <span>6104</span>
                            <span>3378</span>
                            <span>1234</span>
                            <span>5678</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-xs text-white/70">
                              دارنده کارت
                            </div>
                            <div className="font-medium text-sm sm:text-base">
                              امیرحسین محمدی
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-white/70">انقضا</div>
                            <div className="font-medium text-sm sm:text-base">
                              ۱۴۰۴/۰۵
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <div className="text-sm text-gray-500 mb-3">
                    تراکنش‌های اخیر
                  </div>
                  <div className="space-y-3">
                    {MOCK_RECENT_TRANSACTIONS.slice(0, 2).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${transaction.iconBg} flex items-center justify-center shadow-sm`}
                          >
                            {transaction.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 text-sm sm:text-base truncate">
                              {transaction.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-medium text-sm sm:text-base ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount).split(" ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="w-full gap-1 text-xs sm:text-sm border-gray-300 hover:border-blue-600 hover:text-blue-600"
                      onClick={() => router.push("/dashboard/wallet")}
                    >
                      <Wallet size={14} />
                      <span className="hidden sm:inline">کیف پول</span>
                      <span className="sm:hidden">کیف</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full gap-1 text-xs sm:text-sm border-gray-300 hover:border-blue-600 hover:text-blue-600"
                      onClick={() => router.push("/dashboard/transactions")}
                    >
                      <BarChart3 size={14} />
                      <span className="hidden sm:inline">تراکنش‌ها</span>
                      <span className="sm:hidden">تراکنش</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
            <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-purple-600" />
                پیشنهادات ویژه برای شما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-white transition-colors cursor-pointer border border-gray-100 hover:border-purple-200 hover:shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          {offer.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {offer.store}
                        </div>
                      </div>
                      <div className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full whitespace-nowrap">
                        انقضا: {offer.expiresIn}
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4 gap-1 border-gray-300 hover:border-purple-600 hover:text-purple-600"
                >
                  <Tag size={16} />
                  مشاهده همه پیشنهادات
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                سرویس‌های پرکاربرد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <ServiceCard
                  icon={<QrCode size={18} />}
                  title="پرداخت با QR"
                  description="پرداخت سریع با اسکن کد"
                  onClick={() => router.push("/dashboard/qr-payment")}
                  gradient="from-blue-600 to-blue-500"
                  iconColor="text-blue-600"
                />

                <ServiceCard
                  icon={<CreditCard size={18} />}
                  title="اقساط من"
                  description="مدیریت اقساط و پرداخت‌ها"
                  onClick={() => router.push("/dashboard/installments")}
                  gradient="from-purple-600 to-purple-500"
                  iconColor="text-purple-600"
                />

                <ServiceCard
                  icon={<ShoppingBag size={18} />}
                  title="فروشگاه‌ها"
                  description="فروشگاه‌های طرف قرارداد"
                  onClick={() => router.push("/dashboard/stores")}
                  gradient="from-green-600 to-green-500"
                  iconColor="text-green-600"
                />

                <ServiceCard
                  icon={<User size={18} />}
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

function InfoCard({
  title,
  value,
  icon,
  trend,
  badge,
  onClick,
  color = "bg-blue-600",
}: InfoCardProps) {
  return (
    <Card
      className={`border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl ${
        onClick ? "cursor-pointer hover:scale-105" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center shadow-sm`}
          >
            {icon}
          </div>

          {badge && (
            <div
              className={`px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded-full`}
            >
              {badge.label}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {value}
          </h3>

          {trend && (
            <div className="flex items-center">
              <div
                className={`text-xs font-medium flex items-center gap-1 
                ${trend.isPositive ? "text-green-600" : "text-red-500"}`}
              >
                {trend.isPositive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
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

function ServiceCard({
  icon,
  title,
  description,
  onClick,
  gradient,
  iconColor,
}: ServiceCardProps) {
  const bgColorClass = iconColor.includes("blue")
    ? "bg-blue-50"
    : iconColor.includes("purple")
    ? "bg-purple-50"
    : iconColor.includes("green")
    ? "bg-green-50"
    : iconColor.includes("amber")
    ? "bg-amber-50"
    : "bg-gray-50";

  return (
    <div
      className="rounded-xl border border-gray-100 p-3 sm:p-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div
        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bgColorClass} flex items-center justify-center mb-3`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
