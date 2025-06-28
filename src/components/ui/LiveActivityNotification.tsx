"use client";

import { useState, useEffect } from "react";

interface Activity {
  name: string;
  city: string;
  amount: string;
  time: string;
}

const LiveActivityNotification = () => {
  const [recentActivity, setRecentActivity] = useState<Activity[]>([
    { name: "علی", city: "تهران", amount: "۵ میلیون", time: "۲ دقیقه پیش" },
    { name: "مریم", city: "اصفهان", amount: "۸ میلیون", time: "۵ دقیقه پیش" },
    { name: "رضا", city: "شیراز", amount: "۳ میلیون", time: "۷ دقیقه پیش" },
  ]);

  // Recent activity updater
  useEffect(() => {
    const activities = [
      { name: "علی", city: "تهران", amount: "۵ میلیون" },
      { name: "مریم", city: "اصفهان", amount: "۸ میلیون" },
      { name: "رضا", city: "شیراز", amount: "۳ میلیون" },
      { name: "زهرا", city: "مشهد", amount: "۴ میلیون" },
      { name: "حسن", city: "تبریز", amount: "۶ میلیون" },
      { name: "فاطمه", city: "کرج", amount: "۷ میلیون" },
    ];

    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity((prev) => [
        { ...randomActivity, time: "همین الان" },
        ...prev
          .slice(0, 2)
          .map((item) => ({
            ...item,
            time: item.time === "همین الان" ? "۱ دقیقه پیش" : item.time,
          })),
      ]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 space-y-2">
      {recentActivity.slice(0, 1).map((activity, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg border border-gray-100 p-3 max-w-xs animate-in slide-in-from-right-4 duration-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-sm">
              <span className="font-medium">{activity.name}</span>
              <span className="text-gray-600"> از {activity.city}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            اعتبار {activity.amount} دریافت کرد • {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveActivityNotification; 