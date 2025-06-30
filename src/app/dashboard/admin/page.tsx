"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Store,
  TrendingUp,
  Shield,
  Settings,
  BarChart3,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Activity,
  CreditCard,
  UserCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth-store";

// داده‌های نمونه برای ادمین
const MOCK_SYSTEM_STATS = {
  totalUsers: 15847,
  totalStores: 482,
  totalTransactions: 125847,
  totalRevenue: 5420000000, // 5.42 میلیارد تومان
  activeUsers: 8965,
  monthlyGrowth: 12.5,
  systemUptime: 99.8,
  pendingApprovals: 23,
};

const MOCK_RECENT_ACTIVITIES = [
  {
    id: "activity_001",
    type: "user_registration",
    description: "کاربر جدید ثبت‌نام کرد",
    user: "محمد حسینی",
    time: "۵ دقیقه پیش",
    status: "success",
  },
  {
    id: "activity_002",
    type: "store_approval",
    description: "فروشگاه جدید تایید شد",
    user: "فروشگاه تکنو مارکت",
    time: "۱۵ دقیقه پیش",
    status: "success",
  },
  {
    id: "activity_003",
    type: "transaction_failed",
    description: "تراکنش ناموفق",
    user: "علی رضایی",
    time: "۳۰ دقیقه پیش",
    status: "error",
  },
  {
    id: "activity_004",
    type: "security_alert",
    description: "تلاش ورود غیرمجاز",
    user: "سیستم امنیتی",
    time: "۱ ساعت پیش",
    status: "warning",
  },
];

const MOCK_PENDING_APPROVALS = [
  {
    id: "approval_001",
    type: "store_verification",
    title: "تایید فروشگاه اسمارت شاپ",
    description: "درخواست تایید فروشگاه با مدارک کامل",
    submittedBy: "مدیر فروشگاه اسمارت شاپ",
    date: "۱۴۰۳/۰۷/۱۵",
    priority: "high",
  },
  {
    id: "approval_002",
    type: "credit_increase",
    title: "افزایش سقف اعتبار",
    description: "درخواست افزایش سقف اعتبار به ۵۰ میلیون",
    submittedBy: "احمد محمدی",
    date: "۱۴۰۳/۰۷/۱۴",
    priority: "medium",
  },
  {
    id: "approval_003",
    type: "user_verification",
    title: "تایید هویت کاربر",
    description: "ارسال مدارک هویتی برای تایید",
    submittedBy: "سارا احمدی",
    date: "۱۴۰۳/۰۷/۱۳",
    priority: "low",
  },
];

const MOCK_SYSTEM_ALERTS = [
  {
    id: "alert_001",
    type: "performance",
    title: "کاهش سرعت سیستم",
    message: "پاسخگویی سیستم ۲۰٪ کاهش یافته",
    severity: "warning",
    time: "۲ ساعت پیش",
  },
  {
    id: "alert_002",
    type: "security",
    title: "تلاش حمله DDoS",
    message: "شناسایی ترافیک مشکوک از IP خارجی",
    severity: "high",
    time: "۴ ساعت پیش",
  },
  {
    id: "alert_003",
    type: "backup",
    title: "تکمیل پشتیبان‌گیری",
    message: "پشتیبان‌گیری روزانه با موفقیت انجام شد",
    severity: "info",
    time: "۶ ساعت پیش",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isAdmin } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    
    // بررسی اینکه کاربر ادمین است
    if (!isAdmin()) {
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin() || !user) {
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
                <Shield className="h-4 w-4" />
                پنل مدیریت سیستم سعید پی
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <Activity className="h-4 w-4" />
                آنلاین ({MOCK_SYSTEM_STATS.systemUptime}%)
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/admin/settings")}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                تنظیمات سیستم
              </Button>
            </div>
          </div>
        </div>

        {/* آمار کلی سیستم */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminInfoCard
            title="کل کاربران"
            value={`${formatCurrency(MOCK_SYSTEM_STATS.totalUsers)} نفر`}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-blue-500"
            trend={{
              value: "+۲۵۷",
              isPositive: true,
              label: "این ماه",
            }}
          />

          <AdminInfoCard
            title="فروشگاه‌ها"
            value={`${formatCurrency(MOCK_SYSTEM_STATS.totalStores)} فروشگاه`}
            icon={<Store className="w-6 h-6 text-white" />}
            color="bg-green-500"
            trend={{
              value: "+۱۸",
              isPositive: true,
              label: "این ماه",
            }}
          />

          <AdminInfoCard
            title="کل تراکنش‌ها"
            value={`${formatCurrency(MOCK_SYSTEM_STATS.totalTransactions)}`}
            icon={<CreditCard className="w-6 h-6 text-white" />}
            color="bg-purple-500"
            trend={{
              value: "+۱۲٪",
              isPositive: true,
              label: "از ماه قبل",
            }}
          />

          <AdminInfoCard
            title="درآمد کل"
            value={`${formatCurrency(MOCK_SYSTEM_STATS.totalRevenue)} تومان`}
            icon={<DollarSign className="w-6 h-6 text-white" />}
            color="bg-orange-500"
            trend={{
              value: `+${MOCK_SYSTEM_STATS.monthlyGrowth}٪`,
              isPositive: true,
              label: "رشد ماهانه",
            }}
          />
        </div>

        {/* خدمات مدیریت */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">مدیریت سیستم</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdminServiceCard
              icon={<Users className="w-6 h-6" />}
              title="مدیریت کاربران"
              description="مشاهده و مدیریت کاربران"
              onClick={() => router.push("/dashboard/admin/users")}
              iconColor="text-blue-600"
              badge={MOCK_SYSTEM_STATS.activeUsers.toString()}
            />
            <AdminServiceCard
              icon={<Store className="w-6 h-6" />}
              title="مدیریت فروشگاه‌ها"
              description="تایید و مدیریت فروشگاه‌ها"
              onClick={() => router.push("/dashboard/admin/stores")}
              iconColor="text-green-600"
              badge={MOCK_SYSTEM_STATS.pendingApprovals.toString()}
            />
            <AdminServiceCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="گزارشات مالی"
              description="تحلیل درآمد و تراکنش‌ها"
              onClick={() => router.push("/dashboard/admin/reports")}
              iconColor="text-purple-600"
            />
            <AdminServiceCard
              icon={<Shield className="w-6 h-6" />}
              title="امنیت سیستم"
              description="مانیتورینگ و امنیت"
              onClick={() => router.push("/dashboard/admin/security")}
              iconColor="text-red-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* فعالیت‌های اخیر */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                فعالیت‌های اخیر سیستم
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard/admin/activities")}
              >
                مشاهده همه
                <ChevronRight className="w-4 h-4 mr-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {MOCK_RECENT_ACTIVITIES.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === "success" 
                        ? "bg-green-100 text-green-600"
                        : activity.status === "error"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {activity.status === "success" && <CheckCircle size={16} />}
                      {activity.status === "error" && <XCircle size={16} />}
                      {activity.status === "warning" && <AlertTriangle size={16} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === "success" 
                      ? "bg-green-100 text-green-600"
                      : activity.status === "error"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {activity.status === "success" && "موفق"}
                    {activity.status === "error" && "خطا"}
                    {activity.status === "warning" && "هشدار"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* تاییدیه‌های در انتظار و هشدارها */}
          <div className="space-y-6">
            {/* تاییدیه‌های در انتظار */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                تاییدیه‌های در انتظار ({MOCK_SYSTEM_STATS.pendingApprovals})
              </h3>
              <div className="space-y-3">
                {MOCK_PENDING_APPROVALS.map((approval) => (
                  <div
                    key={approval.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      approval.priority === "high"
                        ? "bg-red-50 border-red-400"
                        : approval.priority === "medium"
                        ? "bg-yellow-50 border-yellow-400"
                        : "bg-blue-50 border-blue-400"
                    }`}
                  >
                    <h4 className="font-medium text-gray-900 text-sm">
                      {approval.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {approval.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {approval.submittedBy} • {approval.date}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => router.push("/dashboard/admin/approvals")}
              >
                مشاهده همه تاییدیه‌ها
              </Button>
            </div>

            {/* هشدارهای سیستم */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                هشدارهای سیستم
              </h3>
              <div className="space-y-3">
                {MOCK_SYSTEM_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.severity === "high"
                        ? "bg-red-50 border-red-400"
                        : alert.severity === "warning"
                        ? "bg-yellow-50 border-yellow-400"
                        : "bg-blue-50 border-blue-400"
                    }`}
                  >
                    <h4 className="font-medium text-gray-900 text-sm">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {alert.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* آمار سریع اضافی */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">کاربران فعال</h3>
                <p className="text-sm text-gray-500">در ۲۴ ساعت گذشته</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(MOCK_SYSTEM_STATS.activeUsers)}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">آپتایم سیستم</h3>
                <p className="text-sm text-gray-500">در این ماه</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600">{MOCK_SYSTEM_STATS.systemUptime}%</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">رشد ماهانه</h3>
                <p className="text-sm text-gray-500">کاربران جدید</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600">+{MOCK_SYSTEM_STATS.monthlyGrowth}%</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">در انتظار تایید</h3>
                <p className="text-sm text-gray-500">درخواست‌ها</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-orange-600">{MOCK_SYSTEM_STATS.pendingApprovals}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdminInfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean; label: string };
  color?: string;
}

function AdminInfoCard({
  title,
  value,
  icon,
  trend,
  color = "bg-blue-500",
}: AdminInfoCardProps) {
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

interface AdminServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  iconColor: string;
  badge?: string;
}

function AdminServiceCard({
  icon,
  title,
  description,
  onClick,
  iconColor,
  badge,
}: AdminServiceCardProps) {
  const bgColorClass = iconColor.includes("blue")
    ? "bg-blue-50"
    : iconColor.includes("purple")
    ? "bg-purple-50"
    : iconColor.includes("green")
    ? "bg-green-50"
    : iconColor.includes("red")
    ? "bg-red-50"
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