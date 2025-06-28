"use client";

import { 
  CheckCircle2, 
  Smartphone, 
  Zap, 
  ShoppingBag, 
  Gift, 
  HeadphonesIcon,
  Star,
  ArrowRight,
  X
} from "lucide-react";
import { PaymentAnimation } from "@/components/ui/animation";

const FeaturesSection = () => {
  const features = [
    {
      icon: CheckCircle2,
      title: "احراز هویت آنلاین",
      description:
        "بدون مراجعه حضوری و تنها با بارگذاری مدارک، هویت شما به صورت آنلاین تأیید می‌شود.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Smartphone,
      title: "اپلیکیشن موبایل",
      description:
        "با اپلیکیشن موبایل سعید پی، به راحتی اعتبار و اقساط خود را مدیریت کنید.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "تأیید آنی اعتبار",
      description:
        "پس از تکمیل مدارک، در کمتر از ۱۰ دقیقه اعتبار شما تأیید و فعال می‌شود.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: ShoppingBag,
      title: "خرید آنلاین و حضوری",
      description:
        "از فروشگاه‌های آنلاین خرید کنید یا در فروشگاه‌های فیزیکی با اسکن QR خرید نمایید.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Gift,
      title: "کد تخفیف اختصاصی",
      description:
        "با خرید‌های منظم و پرداخت به موقع اقساط، کدهای تخفیف ویژه دریافت کنید.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: HeadphonesIcon,
      title: "پشتیبانی ۲۴/۷",
      description:
        "در هر ساعت از شبانه‌روز، کارشناسان ما آماده پاسخگویی به سؤالات شما هستند.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <>
      {/* Payment Animation Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">پرداخت هوشمند</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              پرداخت سریع و آسان
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              با سیستم پرداخت هوشمند سعید پی، پرداخت اقساط خود را به آسانی
              مدیریت کنید
            </p>
          </div>

          <div className="rounded-3xl p-8 max-w-2xl mx-auto">
            <div className="h-64 mt-80 md:mt-32 md:h-80">
              <PaymentAnimation className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">ویژگی‌های کلیدی</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              چرا سعید پی؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              راهکارهای مالی هوشمند برای تمام نیازهای خرید اقساطی شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 hover:bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-blue-200 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Feature highlight */}
                <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-4 w-4" />
                    <span>بیشتر بدانید</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              مقایسه سعید پی با روش‌های سنتی
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4">ویژگی</th>
                    <th className="text-center py-3 px-4 text-blue-600 font-bold">
                      سعید پی
                    </th>
                    <th className="text-center py-3 px-4 text-gray-600">
                      روش سنتی
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium">زمان تایید</td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        ۱۰ دقیقه
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      ۲-۳ روز
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">نیاز به ضامن</td>
                    <td className="py-3 px-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">مراجعه حضوری</td>
                    <td className="py-3 px-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">مدیریت آنلاین</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection; 