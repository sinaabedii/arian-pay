"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Shield,
  Zap
} from "lucide-react";

export default function CreditRequestPage() {
  const [requestAmount, setRequestAmount] = useState<number>(15000000);
  const [installmentMonths, setInstallmentMonths] = useState<number>(12);
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };
  
  // محاسبه مبلغ هر قسط
  const calculateMonthlyPayment = (amount: number, months: number) => {
    // 4% کارمزد سالیانه
    const annualInterestRate = 0.04;
    const monthlyInterestRate = annualInterestRate / 12;
    
    const monthlyPayment = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / 
      (Math.pow(1 + monthlyInterestRate, months) - 1);
    
    return Math.round(monthlyPayment);
  };
  
  const monthlyPayment = calculateMonthlyPayment(requestAmount, installmentMonths);
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">درخواست اعتبار</h1>
        <p className="text-gray-600 mt-1">دریافت اعتبار خرید و پرداخت اقساطی</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* فرم درخواست اعتبار */}
        <Card className="lg:col-span-2 border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              فرم درخواست اعتبار
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">مبلغ اعتبار درخواستی</h3>
                <div className="mb-4">
                  <Slider 
                    value={[requestAmount]} 
                    min={5000000} 
                    max={50000000} 
                    step={1000000} 
                    onValueChange={(value) => setRequestAmount(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">۵ میلیون تومان</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(requestAmount)}</span>
                    <span className="text-sm text-gray-500">۵۰ میلیون تومان</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">مدت زمان بازپرداخت</h3>
                <div className="mb-4">
                  <Slider 
                    value={[installmentMonths]} 
                    min={3} 
                    max={24} 
                    step={3} 
                    onValueChange={(value) => setInstallmentMonths(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">۳ ماهه</span>
                    <span className="text-lg font-bold text-blue-600">{installmentMonths} ماهه</span>
                    <span className="text-sm text-gray-500">۲۴ ماهه</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-medium text-gray-900 mb-3">جزئیات پرداخت</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">مبلغ اعتبار:</span>
                    <span className="font-medium">{formatCurrency(requestAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">تعداد اقساط:</span>
                    <span className="font-medium">{installmentMonths} قسط</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">کارمزد سالانه:</span>
                    <span className="font-medium">۴٪</span>
                  </div>
                  <div className="border-t border-blue-200 my-2 pt-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">مبلغ هر قسط:</span>
                    <span className="text-blue-700">{formatCurrency(monthlyPayment)}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
                  <Input placeholder="09123456789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
                  <Input placeholder="0123456789" />
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                ثبت درخواست اعتبار
              </Button>
              
              <div className="text-xs text-gray-500 text-center">
                با ثبت درخواست، 
                <a href="#" className="text-blue-600 mx-1 hover:underline">قوانین و مقررات</a>
                سعید پی را می‌پذیرم.
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* اطلاعات تکمیلی */}
        <div className="space-y-6">
          {/* کارت مراحل دریافت اعتبار */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                مراحل دریافت اعتبار
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    ۱
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">تکمیل فرم درخواست</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      فرم درخواست اعتبار را تکمیل کنید.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    ۲
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">احراز هویت</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      اطلاعات شما بررسی و هویت شما احراز می‌شود.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    ۳
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">تأیید اعتبار</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      پس از بررسی‌ها، اعتبار شما فعال می‌شود.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                    ۴
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">خرید اقساطی</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      از فروشگاه‌های طرف قرارداد خرید کنید.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
          
          {/* کارت مزایا */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                مزایای سعید پی
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">بدون نیاز به ضامن</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      برای دریافت اعتبار نیازی به ضامن یا چک ندارید.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">اعتبارسنجی آنی</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      اعتبارسنجی در کمتر از ۱۰ دقیقه انجام می‌شود.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">اقساط منعطف</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      امکان انتخاب دوره بازپرداخت از ۳ تا ۲۴ ماه.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">کارمزد رقابتی</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      کارمزد سالانه فقط ۴٪، کمتر از سایر روش‌های اعتباری.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 