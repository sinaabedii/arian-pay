"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ShoppingBag,
  CreditCard,
  Wallet,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Trash
} from "lucide-react";

// نمونه داده برای اعلان‌ها
const MOCK_NOTIFICATIONS = [
  { 
    id: "1", 
    title: "قسط بعدی شما", 
    description: "قسط بعدی شما تا ۳ روز دیگر سررسید می‌شود.", 
    date: "1402/08/18", 
    time: "09:15", 
    isRead: false,
    type: "reminder",
    icon: <Calendar className="h-5 w-5" />
  },
  { 
    id: "2", 
    title: "کیف پول شارژ شد", 
    description: "کیف پول شما با مبلغ ۵,۰۰۰,۰۰۰ تومان شارژ شد.", 
    date: "1402/08/15", 
    time: "14:30", 
    isRead: true,
    type: "wallet",
    icon: <Wallet className="h-5 w-5" />
  },
  { 
    id: "3", 
    title: "اعتبار تأیید شد", 
    description: "درخواست اعتبار شما به مبلغ ۱۵,۰۰۰,۰۰۰ تومان تأیید شد.", 
    date: "1402/08/10", 
    time: "11:45", 
    isRead: true,
    type: "credit",
    icon: <CreditCard className="h-5 w-5" />
  },
  { 
    id: "4", 
    title: "خرید موفق", 
    description: "خرید شما از فروشگاه دیجی کالا با موفقیت انجام شد.", 
    date: "1402/08/05", 
    time: "16:20", 
    isRead: true,
    type: "purchase",
    icon: <ShoppingBag className="h-5 w-5" />
  },
  { 
    id: "5", 
    title: "پیشنهاد ویژه", 
    description: "۲۰٪ تخفیف ویژه برای خرید از فروشگاه ایران کالا تا پایان هفته.", 
    date: "1402/08/01", 
    time: "10:00", 
    isRead: false,
    type: "offer",
    icon: <AlertCircle className="h-5 w-5" />
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  
  // تغییر وضعیت خوانده شدن اعلان
  const toggleReadStatus = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  };
  
  // حذف اعلان
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
    if (expandedNotification === id) {
      setExpandedNotification(null);
    }
  };
  
  // تغییر وضعیت نمایش جزئیات اعلان
  const toggleNotificationDetails = (id: string) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };
  
  // علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // فیلتر اعلان‌ها
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.isRead;
    return notification.type === filter;
  });
  
  // تعداد اعلان‌های خوانده نشده
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">اعلان‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت اعلان‌ها و اطلاعیه‌های سیستم</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="h-4 w-4" />
            علامت همه به عنوان خوانده شده
          </Button>
        </div>
      </div>
      
      {/* فیلترها */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => setFilter("all")}
            >
              همه ({notifications.length})
            </Button>
            <Button 
              variant={filter === "unread" ? "default" : "outline"} 
              className={filter === "unread" ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => setFilter("unread")}
            >
              خوانده نشده ({unreadCount})
            </Button>
            <Button 
              variant={filter === "reminder" ? "default" : "outline"} 
              className={filter === "reminder" ? "bg-amber-500 hover:bg-amber-600" : ""}
              onClick={() => setFilter("reminder")}
            >
              یادآوری
            </Button>
            <Button 
              variant={filter === "wallet" ? "default" : "outline"} 
              className={filter === "wallet" ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => setFilter("wallet")}
            >
              کیف پول
            </Button>
            <Button 
              variant={filter === "credit" ? "default" : "outline"} 
              className={filter === "credit" ? "bg-purple-600 hover:bg-purple-700" : ""}
              onClick={() => setFilter("credit")}
            >
              اعتبار
            </Button>
            <Button 
              variant={filter === "purchase" ? "default" : "outline"} 
              className={filter === "purchase" ? "bg-blue-600 hover:bg-blue-700" : ""}
              onClick={() => setFilter("purchase")}
            >
              خرید
            </Button>
            <Button 
              variant={filter === "offer" ? "default" : "outline"} 
              className={filter === "offer" ? "bg-red-600 hover:bg-red-700" : ""}
              onClick={() => setFilter("offer")}
            >
              پیشنهاد
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* لیست اعلان‌ها */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id} 
              className={`border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl ${!notification.isRead ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''}`}
            >
              <CardContent className="p-0">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleNotificationDetails(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.type === 'reminder' ? 'bg-amber-100 text-amber-600' :
                        notification.type === 'wallet' ? 'bg-green-100 text-green-600' :
                        notification.type === 'credit' ? 'bg-purple-100 text-purple-600' :
                        notification.type === 'purchase' ? 'bg-blue-100 text-blue-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {notification.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{notification.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{notification.description}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          {notification.date} - {notification.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <Trash className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                      >
                        {expandedNotification === notification.id ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedNotification === notification.id && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => toggleReadStatus(notification.id)}
                      >
                        {notification.isRead ? (
                          <>
                            <Clock className="h-4 w-4" />
                            علامت به عنوان خوانده نشده
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            علامت به عنوان خوانده شده
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-12 text-center bg-white rounded-xl border border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ اعلانی یافت نشد</h3>
            <p className="text-gray-500">
              در حال حاضر هیچ اعلانی برای نمایش وجود ندارد.
            </p>
            {filter !== "all" && (
              <Button
                variant="outline"
                className="mt-4 gap-1"
                onClick={() => setFilter("all")}
              >
                نمایش همه اعلان‌ها
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 