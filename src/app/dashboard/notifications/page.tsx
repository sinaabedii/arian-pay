"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Calendar,
  CreditCard,
  Info,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Settings,
  BellRing,
  Archive,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store/auth-store";

// تعریف اینترفیس برای ساختار اعلان‌ها
interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: "read" | "unread";
  icon: React.ReactNode;
  iconBg: string;
  action: {
    label: string;
    link: string;
  };
}

// نمونه داده‌های اعلان‌ها
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "سررسید قسط بعدی",
    description: "قسط بعدی شما در تاریخ ۱۵ مهر سررسید خواهد شد.",
    date: "۱۰ مهر ۱۴۰۲",
    time: "۱۰:۲۵",
    type: "reminder",
    status: "unread",
    icon: <Calendar size={16} />,
    iconBg: "bg-yellow-100 text-yellow-600",
    action: {
      label: "مشاهده اقساط",
      link: "/installments",
    },
  },
  {
    id: "2",
    title: "افزایش اعتبار تایید شد",
    description:
      "درخواست افزایش اعتبار شما تایید شد. اعتبار جدید شما: ۲۰ میلیون تومان",
    date: "۵ مهر ۱۴۰۲",
    time: "۱۵:۴۰",
    type: "credit",
    status: "read",
    icon: <CreditCard size={16} />,
    iconBg: "bg-green-100 text-green-600",
    action: {
      label: "مشاهده اعتبار",
      link: "/dashboard",
    },
  },
  {
    id: "3",
    title: "تخفیف ویژه فروشگاه دیجی کالا",
    description:
      "با استفاده از اعتبار سعید پی  در دیجی کالا از تخفیف ۱۵ درصدی بهره‌مند شوید.",
    date: "۱ مهر ۱۴۰۲",
    time: "۰۹:۱۵",
    type: "offer",
    status: "read",
    icon: <Info size={16} />,
    iconBg: "bg-blue-100 text-blue-600",
    action: {
      label: "مشاهده فروشگاه",
      link: "/stores",
    },
  },
  {
    id: "4",
    title: "پرداخت موفق",
    description:
      "پرداخت شما به مبلغ ۲,۵۰۰,۰۰۰ تومان به دیجی کالا با موفقیت انجام شد.",
    date: "۲۸ شهریور ۱۴۰۲",
    time: "۱۱:۳۰",
    type: "payment",
    status: "read",
    icon: <CheckCircle size={16} />,
    iconBg: "bg-green-100 text-green-600",
    action: {
      label: "مشاهده تراکنش",
      link: "/transactions",
    },
  },
  {
    id: "5",
    title: "هشدار پرداخت قسط",
    description:
      "تنها ۲ روز تا سررسید قسط شما باقی مانده است. لطفاً به‌موقع پرداخت کنید.",
    date: "۲۵ شهریور ۱۴۰۲",
    time: "۰۸:۴۵",
    type: "alert",
    status: "read",
    icon: <AlertTriangle size={16} />,
    iconBg: "bg-red-100 text-red-600",
    action: {
      label: "پرداخت قسط",
      link: "/installments",
    },
  },
];

// تنظیمات اعلان‌ها
const NOTIFICATION_SETTINGS = [
  {
    id: "payment_success",
    title: "پرداخت موفق",
    description: "اطلاع‌رسانی پرداخت‌های موفق",
    defaultEnabled: true,
  },
  {
    id: "payment_due",
    title: "سررسید اقساط",
    description: "یادآوری سررسید اقساط (۵ روز قبل)",
    defaultEnabled: true,
  },
  {
    id: "credit_changes",
    title: "تغییرات اعتبار",
    description: "اطلاع‌رسانی تغییرات در اعتبار شما",
    defaultEnabled: true,
  },
  {
    id: "special_offers",
    title: "پیشنهادات ویژه",
    description: "دریافت پیشنهادات و تخفیف‌های ویژه",
    defaultEnabled: true,
  },
  {
    id: "security_alerts",
    title: "هشدارهای امنیتی",
    description: "هشدارهای مربوط به امنیت حساب",
    defaultEnabled: true,
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [notificationSettings, setNotificationSettings] = useState(
    NOTIFICATION_SETTINGS.map((setting) => ({
      ...setting,
      enabled: setting.defaultEnabled,
    }))
  );

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // نشان‌گذاری یک اعلان به عنوان خوانده شده
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  // حذف یک اعلان
  const removeNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // نشان‌گذاری همه اعلان‌ها به عنوان خوانده شده
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, status: "read" }))
    );
  };

  // تغییر وضعیت تنظیم اعلان
  const toggleNotificationSetting = (id: string) => {
    setNotificationSettings(
      notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  // فیلتر اعلان‌ها بر اساس تب فعال
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return notification.status === "unread";
    return notification.type === activeTab;
  });

  // تعداد اعلان‌های خوانده نشده
  const unreadCount = notifications.filter(
    (notification) => notification.status === "unread"
  ).length;

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 max-w-7xl mx-auto">
          <div className="pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              اعلان‌ها و یادآوری‌ها
            </h1>
            <p className="text-gray-700 font-medium mt-1 text-sm sm:text-base">
              مدیریت اعلان‌ها و تنظیمات یادآوری
            </p>
          </div>

          {/* خلاصه اعلان‌ها */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BellRing className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    خلاصه اعلان‌ها
                  </h3>
                  <p className="text-sm text-gray-600">
                    مدیریت و پیگیری اعلان‌های شما
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      کل اعلان‌ها
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    {notifications.length}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Archive className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">
                      خوانده نشده
                    </span>
                  </div>
                  <span className="text-xl font-bold text-orange-600">
                    {unreadCount}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">
                      خوانده شده
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600">
                    {notifications.length - unreadCount}
                  </span>
                </div>
              </div>

              {unreadCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={markAllAsRead}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Check className="h-4 w-4" />
                    نشان‌گذاری همه به عنوان خوانده شده
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full bg-gray-100 p-1 rounded-xl gap-1">
              <TabsTrigger
                value="all"
                className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
              >
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">همه</span>
                <span className="sm:hidden">همه</span>
                {unreadCount > 0 && (
                  <span className="mr-2 text-xs bg-blue-600 text-white rounded-full w-5 h-5 inline-flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
              >
                <Archive className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">خوانده نشده</span>
                <span className="sm:hidden">جدید</span>
              </TabsTrigger>
              <TabsTrigger
                value="reminder"
                className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">یادآوری‌ها</span>
                <span className="sm:hidden">یادآوری</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
              >
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">تنظیمات</span>
                <span className="sm:hidden">تنظیمات</span>
              </TabsTrigger>
            </TabsList>

            {/* لیست اعلان‌ها */}
            {["all", "unread", "reminder"].includes(activeTab) && (
              <TabsContent value={activeTab} className="mt-6">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <NotificationCard
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onRemove={removeNotification}
                        onAction={() => router.push(notification.action.link)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                      <Bell className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      اعلانی موجود نیست
                    </h3>
                    <p className="text-gray-700 font-medium">
                      در حال حاضر اعلانی برای نمایش وجود ندارد.
                    </p>
                  </div>
                )}
              </TabsContent>
            )}

            {/* تنظیمات اعلان‌ها */}
            <TabsContent value="settings" className="mt-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                        تنظیمات اعلان‌ها
                      </h2>
                      <p className="text-sm text-gray-700 font-medium">
                        مدیریت انواع اعلان‌هایی که دریافت می‌کنید
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {setting.title}
                          </h3>
                          <p className="text-sm text-gray-700 font-medium mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Switch
                            id={`switch-${setting.id}`}
                            checked={setting.enabled}
                            onCheckedChange={() =>
                              toggleNotificationSetting(setting.id)
                            }
                          />
                          <Label
                            htmlFor={`switch-${setting.id}`}
                            className="sr-only"
                          >
                            {setting.title}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      ذخیره تنظیمات
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onAction: () => void;
}

function NotificationCard({
  notification,
  onMarkAsRead,
  onRemove,
  onAction,
}: NotificationCardProps) {
  const [expanded, setExpanded] = useState(false);

  // وقتی کارت باز می‌شود، اعلان به عنوان خوانده شده نشان‌گذاری می‌شود
  useEffect(() => {
    if (expanded && notification.status === "unread") {
      onMarkAsRead(notification.id);
    }
  }, [expanded, notification.id, notification.status, onMarkAsRead]);

  const getColorClasses = () => {
    if (notification.status === "unread") {
      return "border-blue-500 bg-blue-50";
    }
    return "border-gray-200 bg-white hover:shadow-md";
  };

  return (
    <div
      className={`rounded-xl shadow-sm transition-all overflow-hidden ${getColorClasses()}`}
    >
      <div
        className={`h-1 bg-gradient-to-r ${
          notification.status === "unread"
            ? "from-blue-500 to-blue-600"
            : "from-gray-300 to-gray-400"
        }`}
      ></div>
      
      <div className="p-4">
        <div
          className="flex items-start gap-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${notification.iconBg} flex items-center justify-center flex-shrink-0`}
          >
            {notification.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-medium text-sm sm:text-base truncate ${
                      notification.status === "unread" 
                        ? "text-blue-900" 
                        : "text-gray-900"
                    }`}
                  >
                    {notification.title}
                  </h3>
                  {notification.status === "unread" && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {notification.date} - {notification.time}
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(notification.id);
                  }}
                >
                  <Trash2 size={14} />
                </button>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {notification.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto gap-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
              onClick={onAction}
            >
              {notification.action.label}
              <ExternalLink size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}