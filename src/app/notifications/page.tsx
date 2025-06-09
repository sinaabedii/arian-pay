"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Calendar, CreditCard, Info, CheckCircle, AlertTriangle, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";

// تعریف اینترفیس برای ساختار اعلان‌ها
interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  status: 'read' | 'unread';
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
    iconBg: "bg-accent-light text-accent",
    action: {
      label: "مشاهده اقساط",
      link: "/installments",
    },
  },
  {
    id: "2",
    title: "افزایش اعتبار تایید شد",
    description: "درخواست افزایش اعتبار شما تایید شد. اعتبار جدید شما: ۲۰ میلیون تومان",
    date: "۵ مهر ۱۴۰۲",
    time: "۱۵:۴۰",
    type: "credit",
    status: "read",
    icon: <CreditCard size={16} />,
    iconBg: "bg-success-light text-success",
    action: {
      label: "مشاهده اعتبار",
      link: "/dashboard",
    },
  },
  {
    id: "3",
    title: "تخفیف ویژه فروشگاه دیجی کالا",
    description: "با استفاده از اعتبار آرین پی در دیجی کالا از تخفیف ۱۵ درصدی بهره‌مند شوید.",
    date: "۱ مهر ۱۴۰۲",
    time: "۰۹:۱۵",
    type: "offer",
    status: "read",
    icon: <Info size={16} />,
    iconBg: "bg-primary-light text-primary",
    action: {
      label: "مشاهده فروشگاه",
      link: "/stores",
    },
  },
  {
    id: "4",
    title: "پرداخت موفق",
    description: "پرداخت شما به مبلغ ۲,۵۰۰,۰۰۰ تومان به دیجی کالا با موفقیت انجام شد.",
    date: "۲۸ شهریور ۱۴۰۲",
    time: "۱۱:۳۰",
    type: "payment",
    status: "read",
    icon: <CheckCircle size={16} />,
    iconBg: "bg-success-light text-success",
    action: {
      label: "مشاهده تراکنش",
      link: "/transactions",
    },
  },
  {
    id: "5",
    title: "هشدار پرداخت قسط",
    description: "تنها ۲ روز تا سررسید قسط شما باقی مانده است. لطفاً به‌موقع پرداخت کنید.",
    date: "۲۵ شهریور ۱۴۰۲",
    time: "۰۸:۴۵",
    type: "alert",
    status: "read",
    icon: <AlertTriangle size={16} />,
    iconBg: "bg-warning-light text-warning",
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
    NOTIFICATION_SETTINGS.map(setting => ({
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
      notifications.map(notification =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  // حذف یک اعلان
  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // نشان‌گذاری همه اعلان‌ها به عنوان خوانده شده
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, status: "read" }))
    );
  };

  // تغییر وضعیت تنظیم اعلان
  const toggleNotificationSetting = (id: string) => {
    setNotificationSettings(
      notificationSettings.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  // فیلتر اعلان‌ها بر اساس تب فعال
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return notification.status === "unread";
    return notification.type === activeTab;
  });

  // تعداد اعلان‌های خوانده نشده
  const unreadCount = notifications.filter(
    notification => notification.status === "unread"
  ).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">اعلان‌ها و یادآوری‌ها</h1>
            <p className="text-secondary mt-1">مدیریت اعلان‌ها و تنظیمات یادآوری</p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                نشان‌گذاری همه به عنوان خوانده شده
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              همه
              {unreadCount > 0 && (
                <span className="mr-2 text-xs bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">
              خوانده نشده
            </TabsTrigger>
            <TabsTrigger value="reminder" className="flex-1">
              یادآوری‌ها
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              تنظیمات
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
                <div className="text-center py-16 bg-secondary-light rounded-lg">
                  <Bell className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">اعلانی موجود نیست</h3>
                  <p className="text-secondary">در حال حاضر اعلانی برای نمایش وجود ندارد.</p>
                </div>
              )}
            </TabsContent>
          )}
          
          {/* تنظیمات اعلان‌ها */}
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">تنظیمات اعلان‌ها</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notificationSettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{setting.title}</h3>
                        <p className="text-sm text-secondary">{setting.description}</p>
                      </div>
                      <div className="flex items-center">
                        <Switch
                          id={`switch-${setting.id}`}
                          checked={setting.enabled}
                          onCheckedChange={() => toggleNotificationSetting(setting.id)}
                        />
                        <Label htmlFor={`switch-${setting.id}`} className="sr-only">
                          {setting.title}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-4 flex justify-end">
                <Button variant="primary">ذخیره تنظیمات</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onAction: () => void;
}

function NotificationCard({ notification, onMarkAsRead, onRemove, onAction }: NotificationCardProps) {
  const [expanded, setExpanded] = useState(false);

  // وقتی کارت باز می‌شود، اعلان به عنوان خوانده شده نشان‌گذاری می‌شود
  useEffect(() => {
    if (expanded && notification.status === "unread") {
      onMarkAsRead(notification.id);
    }
  }, [expanded, notification.id, notification.status, onMarkAsRead]);

  return (
    <Card className={`overflow-hidden transition-all ${notification.status === 'unread' ? 'border-primary-light' : 'border-border'}`}>
      <CardContent className="p-0">
        <div className="p-4">
          <div 
            className="flex items-start gap-3 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className={`w-8 h-8 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0 mt-1`}>
              {notification.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className={`font-medium ${notification.status === 'unread' ? 'text-primary' : ''}`}>
                  {notification.title}
                  {notification.status === 'unread' && (
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2 align-middle"></span>
                  )}
                </h3>
                <button 
                  className="text-secondary hover:text-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(notification.id);
                  }}
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-secondary mt-1">{notification.date} - {notification.time}</p>
            </div>
            <ChevronDown 
              size={18} 
              className={`text-secondary transition-transform ${expanded ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {expanded && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm mb-4">{notification.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-1"
                onClick={onAction}
              >
                {notification.action.label}
                <ExternalLink size={14} />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 