"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Wallet,
  ShoppingBag,
  BarChart3,
  Calendar,
  Tag,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  QrCode,
} from "lucide-react";
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

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isCustomer } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    // بررسی اینکه کاربر مشتری است
    if (!isCustomer()) {
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, isCustomer, router]);

  if (!isAuthenticated || !isCustomer() || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            سلام {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            به داشبورد شخصی خود در سعید پی خوش آمدید
          </p>
        </div>

        {/* کارت‌های اطلاعات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            title="موجودی کیف پول"
            value={`${formatCurrency(user.walletBalance || 0)} تومان`}
            icon={<Wallet className="w-6 h-6 text-white" />}
            color="bg-blue-500"
            trend={{
              value: "+۱۲٪",
              isPositive: true,
              label: "از ماه گذشته",
            }}
            onClick={() => router.push("/dashboard/wallet")}
          />

          <InfoCard
            title="سقف اعتبار"
            value={`${formatCurrency(user.creditLimit || 0)} تومان`}
            icon={<CreditCard className="w-6 h-6 text-white" />}
            color="bg-purple-500"
            onClick={() => router.push("/dashboard/credit")}
          />

          <InfoCard
            title="امتیاز شما"
            value="۱۲۸۴ امتیاز"
            icon={<Tag className="w-6 h-6 text-white" />}
            color="bg-green-500"
            badge={{ label: "طلایی", variant: "gold" }}
          />

          <InfoCard
            title="تراکنش‌های امروز"
            value="۷ تراکنش"
            icon={<BarChart3 className="w-6 h-6 text-white" />}
            color="bg-yellow-500"
            trend={{
              value: "-۳",
              isPositive: false,
              label: "از دیروز",
            }}
          />
        </div>

        {/* خدمات */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">خدمات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ServiceCard
              icon={<QrCode className="w-6 h-6" />}
              title="پرداخت با QR"
              description="پرداخت آسان و سریع"
              onClick={() => router.push("/dashboard/qr-payment")}
              iconColor="text-blue-600"
            />
            <ServiceCard
              icon={<Wallet className="w-6 h-6" />}
              title="شارژ کیف پول"
              description="افزایش موجودی"
              onClick={() => router.push("/dashboard/wallet/charge")}
              iconColor="text-green-600"
            />
            <ServiceCard
              icon={<CreditCard className="w-6 h-6" />}
              title="درخواست اعتبار"
              description="افزایش سقف اعتبار"
              onClick={() => router.push("/dashboard/credit/request")}
              iconColor="text-purple-600"
            />
            <ServiceCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="گزارشات"
              description="تحلیل تراکنش‌ها"
              onClick={() => router.push("/dashboard/reports")}
              iconColor="text-yellow-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* تراکنش‌های اخیر */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                تراکنش‌های اخیر
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/transactions")}
              >
                مشاهده همه
                <ChevronRight className="w-4 h-4 mr-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_RECENT_TRANSACTIONS.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center`}
                    >
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.title}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-medium ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)} تومان
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* پیشنهادات و یادآوری‌ها */}
          <div className="space-y-6">
            {/* پیشنهادات ویژه */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                پیشنهادات ویژه
              </h3>
              <div className="space-y-3">
                {MOCK_OFFERS.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <h4 className="font-medium text-blue-900 mb-1">
                      {offer.title}
                    </h4>
                    <p className="text-sm text-blue-700 mb-2">{offer.store}</p>
                    <p className="text-xs text-blue-600">
                      انقضا: {offer.expiresIn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* یادآوری‌ها */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                یادآوری‌ها
              </h3>
              <div className="space-y-3">
                {MOCK_REMINDERS.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <h4 className="font-medium text-yellow-900 mb-1">
                      {reminder.title}
                    </h4>
                    <p className="text-sm text-yellow-700 mb-2">
                      {formatCurrency(reminder.amount)} تومان
                    </p>
                    <p className="text-xs text-yellow-600">
                      {reminder.date} • {reminder.daysLeft} روز مانده
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  color = "bg-blue-500",
}: InfoCardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 ${
        onClick ? "cursor-pointer hover:-translate-y-1" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-sm`}
        >
          {icon}
        </div>

        {badge && (
          <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
            {badge.label}
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{value}</h3>

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
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  iconColor: string;
}

function ServiceCard({
  icon,
  title,
  description,
  onClick,
  iconColor,
}: ServiceCardProps) {
  const bgColorClass = iconColor.includes("blue")
    ? "bg-blue-50"
    : iconColor.includes("purple")
    ? "bg-purple-50"
    : iconColor.includes("green")
    ? "bg-green-50"
    : iconColor.includes("yellow")
    ? "bg-yellow-50"
    : "bg-gray-50";

  return (
    <div
      className={`${bgColorClass} border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1`}
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-lg bg-white ${iconColor} flex items-center justify-center mb-3 shadow-sm`}>
        {icon}
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
} 