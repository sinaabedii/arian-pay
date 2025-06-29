"use client";

import Link from "next/link";
import { 
  FileText, 
  CreditCard, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "ثبت‌نام و احراز هویت",
      description:
        "اطلاعات شخصی و مدارک هویتی خود را بارگذاری کنید",
      icon: FileText,
      color: "bg-blue-500",
      time: "۵ دقیقه",
    },
    {
      step: 2,
      title: "دریافت اعتبار",
      description:
        "در کمتر از ۱۰ دقیقه اعتبار شما تایید و فعال می‌شود",
      icon: CreditCard,
      color: "bg-green-500",
      time: "۱۰ دقیقه",
    },
    {
      step: 3,
      title: "خرید اقساطی",
      description:
        "از فروشگاه‌های طرف قرارداد به صورت اقساطی خرید کنید",
      icon: ShoppingBag,
      color: "bg-purple-500",
      time: "آنی",
    },
  ];

  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">فرآیند ساده</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            نحوه کار
          </h2>
          <p className="text-lg text-gray-600">
            تنها در ۳ مرحله ساده به اعتبار خود برسید
          </p>
        </div>

        {/* Steps Section */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
          
          {/* Mobile Timeline */}
          <div className="lg:hidden absolute right-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                {/* Mobile Timeline Node */}
                <div className="lg:hidden absolute right-0 top-6 w-6 h-6 bg-white border-4 border-blue-500 rounded-full transform translate-x-1/2 z-10"></div>

                {/* Step Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative z-10 h-full group ml-6 lg:ml-0">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {item.step}
                    </div>
                    <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.time}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                    <item.icon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center lg:text-right group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-center lg:text-right">
                    {item.description}
                  </p>

                  {/* Step Progress Indicator */}
                  <div className="mt-4 flex justify-center lg:justify-start">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((stepNum) => (
                        <div
                          key={stepNum}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            stepNum <= item.step
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mobile Step Connector */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-3 right-0 w-6 flex justify-center transform translate-x-1/2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {/* Desktop Timeline Node */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="ml-2 h-5 w-5" />
              شروع کنید
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 