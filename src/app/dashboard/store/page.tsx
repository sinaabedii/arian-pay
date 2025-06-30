"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  DollarSign,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Bell,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

// داده‌های نمونه برای فروشگاه
const MOCK_STORE_STATS = {
  todaySales: 45600000, // 45.6 میلیون تومان
  todayOrders: 127,
  monthlyRevenue: 1250000000, // 1.25 میلیارد تومان
  totalCustomers: 3542,
  averageOrderValue: 850000, // 850 هزار تومان
  conversionRate: 3.2, // 3.2 درصد
  inventory: 1847,
  lowStockItems: 23,
};

const MOCK_RECENT_SALES = [
  {
    id: "sale_001",
    customerName: "احمد رضایی",
    items: "گوشی موبایل + کاور",
    amount: 25000000,
    status: "completed",
    time: "۱۰ دقیقه پیش",
    paymentMethod: "سعید پی",
  },
  {
    id: "sale_002",
    customerName: "مریم احمدی",
    items: "لپ تاپ",
    amount: 45000000,
    status: "pending",
    time: "۲۵ دقیقه پیش",
    paymentMethod: "کیف پول",
  },
  {
    id: "sale_003",
    customerName: "علی محمدی",
    items: "هدفون بلوتوث",
    amount: 2500000,
    status: "completed",
    time: "۱ ساعت پیش",
    paymentMethod: "اعتبار",
  },
];

const MOCK_TOP_PRODUCTS = [
  {
    id: "prod_001",
    name: "گوشی موبایل سامسونگ A55",
    sold: 45,
    revenue: 585000000,
    growth: 15.2,
  },
  {
    id: "prod_002", 
    name: "هدفون بی‌سیم ایرپاد پرو",
    sold: 32,
    revenue: 320000000,
    growth: -2.1,
  },
  {
    id: "prod_003",
    name: "لپ تاپ لنوو ThinkPad",
    sold: 18,
    revenue: 810000000,
    growth: 8.7,
  },
];

const MOCK_NOTIFICATIONS = [
  {
    id: "notif_001",
    type: "stock",
    title: "موجودی کم",
    message: "گوشی آیفون 15 کمتر از 5 عدد موجود است",
    time: "۳۰ دقیقه پیش",
    priority: "high",
  },
  {
    id: "notif_002",
    type: "order",
    title: "سفارش جدید",
    message: "سفارش جدیدی از مشتری VIP دریافت شد",
    time: "۱ ساعت پیش",
    priority: "medium",
  },
  {
    id: "notif_003",
    type: "payment",
    title: "پرداخت موفق",
    message: "پرداخت ۲۵ میلیون تومانی انجام شد",
    time: "۲ ساعت پیش",
    priority: "low",
  },
];

export default function StoreDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isStore } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    // بررسی اینکه کاربر فروشگاه است
    if (!isStore()) {
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, isStore, router]);

  if (!isAuthenticated || !isStore() || !user) {
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
        {/* هدر داشبورد */}
        <div className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                سلام {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <Store className="h-4 w-4" />
                داشبورد فروشگاه {user.storeName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user.isVerified && (
                <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4 fill-current" />
                  تایید شده
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/store/settings")}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                تنظیمات فروشگاه
              </Button>
            </div>
          </div>
        </div>

        {/* آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StoreInfoCard
            title="فروش امروز"
            value={`${formatCurrency(MOCK_STORE_STATS.todaySales)} تومان`}
            icon={<DollarSign className="w-6 h-6 text-white" />}
            color="bg-green-500"
            trend={{
              value: "+۱۸٪",
              isPositive: true,
              label: "از دیروز",
            }}
          />

          <StoreInfoCard
            title="سفارشات امروز"
            value={`${MOCK_STORE_STATS.todayOrders} سفارش`}
            icon={<ShoppingCart className="w-6 h-6 text-white" />}
            color="bg-blue-500"
            trend={{
              value: "+۱۲",
              isPositive: true,
              label: "از دیروز",
            }}
          />

          <StoreInfoCard
            title="درآمد این ماه"
            value={`${formatCurrency(MOCK_STORE_STATS.monthlyRevenue)} تومان`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-purple-500"
            trend={{
              value: "+۲۵٪",
              isPositive: true,
              label: "از ماه گذشته",
            }}
          />

          <StoreInfoCard
            title="مشتریان"
            value={`${formatCurrency(MOCK_STORE_STATS.totalCustomers)} نفر`}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-orange-500"
            trend={{
              value: "+۱۵٪",
              isPositive: true,
              label: "از ماه گذشته",
            }}
          />
        </div>

        {/* خدمات فروشگاه */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">مدیریت فروشگاه</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StoreServiceCard
              icon={<Package className="w-6 h-6" />}
              title="مدیریت محصولات"
              description="افزودن و ویرایش محصولات"
              onClick={() => router.push("/dashboard/store/products")}
              iconColor="text-blue-600"
              badge={MOCK_STORE_STATS.inventory.toString()}
            />
            <StoreServiceCard
              icon={<ShoppingCart className="w-6 h-6" />}
              title="مدیریت سفارشات"
              description="بررسی و پردازش سفارشات"
              onClick={() => router.push("/dashboard/store/orders")}
              iconColor="text-green-600"
              badge={MOCK_STORE_STATS.todayOrders.toString()}
            />
            <StoreServiceCard
              icon={<Users className="w-6 h-6" />}
              title="مشتریان"
              description="مدیریت اطلاعات مشتریان"
              onClick={() => router.push("/dashboard/store/customers")}
              iconColor="text-purple-600"
            />
            <StoreServiceCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="گزارشات فروش"
              description="تحلیل عملکرد فروش"
              onClick={() => router.push("/dashboard/store/analytics")}
              iconColor="text-yellow-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* فروش‌های اخیر */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                فروش‌های اخیر
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/store/sales")}
              >
                مشاهده همه
                <ChevronRight className="w-4 h-4 mr-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_RECENT_SALES.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <ShoppingCart size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{sale.customerName}</p>
                      <p className="text-sm text-gray-500">{sale.items}</p>
                      <p className="text-xs text-gray-400">{sale.time} • {sale.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-green-600">
                      {formatCurrency(sale.amount)} تومان
                    </p>
                    <div className={`text-xs px-2 py-1 rounded-full text-center mt-1 ${
                      sale.status === "completed" 
                        ? "bg-green-100 text-green-600" 
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {sale.status === "completed" ? "تکمیل شده" : "در انتظار"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* محصولات پرفروش و اعلان‌ها */}
          <div className="space-y-6">
            {/* محصولات پرفروش */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                محصولات پرفروش
              </h3>
              <div className="space-y-3">
                {MOCK_TOP_PRODUCTS.map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sold} فروش</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.revenue)}
                      </p>
                      <div className={`text-xs flex items-center gap-1 ${
                        product.growth > 0 ? "text-green-600" : "text-red-500"
                      }`}>
                        {product.growth > 0 ? (
                          <ArrowUpRight size={10} />
                        ) : (
                          <ArrowDownRight size={10} />
                        )}
                        {Math.abs(product.growth)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* اعلان‌ها */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                اعلان‌ها
              </h3>
              <div className="space-y-3">
                {MOCK_NOTIFICATIONS.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.priority === "high"
                        ? "bg-red-50 border-red-400"
                        : notification.priority === "medium"
                        ? "bg-yellow-50 border-yellow-400"
                        : "bg-blue-50 border-blue-400"
                    }`}
                  >
                    <h4 className="font-medium text-gray-900 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* آمار کلیدی اضافی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">نرخ تبدیل</h3>
                <p className="text-sm text-gray-500">از بازدید به خرید</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{MOCK_STORE_STATS.conversionRate}%</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">میانگین سفارش</h3>
                <p className="text-sm text-gray-500">ارزش هر سفارش</p>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900">
              {formatCurrency(MOCK_STORE_STATS.averageOrderValue)} تومان
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">موجودی کم</h3>
                <p className="text-sm text-gray-500">نیاز به تامین</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-red-600">{MOCK_STORE_STATS.lowStockItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StoreInfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean; label: string };
  color?: string;
}

function StoreInfoCard({
  title,
  value,
  icon,
  trend,
  color = "bg-blue-500",
}: StoreInfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
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

interface StoreServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  iconColor: string;
  badge?: string;
}

function StoreServiceCard({
  icon,
  title,
  description,
  onClick,
  iconColor,
  badge,
}: StoreServiceCardProps) {
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
      className={`${bgColorClass} border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 relative`}
      onClick={onClick}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
          {badge}
        </div>
      )}
      <div className={`w-10 h-10 rounded-lg bg-white ${iconColor} flex items-center justify-center mb-3 shadow-sm`}>
        {icon}
      </div>
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
} 