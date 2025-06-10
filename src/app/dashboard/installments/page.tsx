"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// نمونه داده برای اقساط
const MOCK_INSTALLMENTS = [
  { 
    id: "1", 
    storeName: "فروشگاه دیجی کالا", 
    productName: "لپ تاپ ایسوس",
    amount: 45000000, 
    remainingAmount: 27000000,
    totalInstallments: 12, 
    paidInstallments: 4, 
    nextDueDate: "1402/08/25",
    daysLeft: 10,
    monthly: 3750000,
    status: "active" 
  },
  { 
    id: "2", 
    storeName: "فروشگاه ایران کالا", 
    productName: "تلویزیون سامسونگ",
    amount: 28000000, 
    remainingAmount: 28000000,
    totalInstallments: 6, 
    paidInstallments: 0, 
    nextDueDate: "1402/09/15",
    daysLeft: 30,
    monthly: 4666667,
    status: "pending" 
  },
  { 
    id: "3", 
    storeName: "فروشگاه موبایل تهران", 
    productName: "گوشی آیفون",
    amount: 35000000, 
    remainingAmount: 0,
    totalInstallments: 10, 
    paidInstallments: 10, 
    nextDueDate: "-",
    daysLeft: 0,
    monthly: 3500000,
    status: "completed" 
  }
];

// نمونه داده برای تاریخچه پرداخت‌ها
const MOCK_PAYMENT_HISTORY = [
  { id: "1", date: "1402/08/05", amount: 3750000, installmentId: "1", status: "success" },
  { id: "2", date: "1402/07/05", amount: 3750000, installmentId: "1", status: "success" },
  { id: "3", date: "1402/06/05", amount: 3750000, installmentId: "1", status: "success" },
  { id: "4", date: "1402/05/05", amount: 3750000, installmentId: "1", status: "success" },
  { id: "5", date: "1402/05/15", amount: 3500000, installmentId: "3", status: "success" },
];

export default function InstallmentsPage() {
  const [expandedInstallment, setExpandedInstallment] = useState<string | null>("1");
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };
  
  // محاسبه درصد پیشرفت پرداخت
  const calculateProgress = (paid: number, total: number) => {
    return (paid / total) * 100;
  };
  
  const toggleInstallmentDetails = (id: string) => {
    setExpandedInstallment(expandedInstallment === id ? null : id);
  };
  
  // فیلتر کردن اقساط بر اساس وضعیت
  const getInstallmentsByStatus = (status: string) => {
    return MOCK_INSTALLMENTS.filter(item => item.status === status);
  };
  
  // فیلتر کردن تاریخچه پرداخت بر اساس شناسه قسط
  const getPaymentHistoryByInstallmentId = (installmentId: string) => {
    return MOCK_PAYMENT_HISTORY.filter(item => item.installmentId === installmentId);
  };
  
  const activeInstallments = getInstallmentsByStatus("active");
  const pendingInstallments = getInstallmentsByStatus("pending");
  const completedInstallments = getInstallmentsByStatus("completed");
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">مدیریت اقساط</h1>
        <p className="text-gray-600 mt-1">مشاهده و مدیریت اقساط خرید</p>
      </div>
      
      {/* کارت‌های اطلاعات کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">اقساط جاری</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{activeInstallments.length}</h3>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">قسط بعدی</div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{formatCurrency(activeInstallments[0]?.monthly || 0)}</span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  {activeInstallments[0]?.daysLeft || 0} روز مانده
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">اقساط پرداخت شده</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{completedInstallments.length}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">مجموع پرداختی</div>
              <div className="font-medium">
                {formatCurrency(MOCK_PAYMENT_HISTORY.reduce((total, item) => total + item.amount, 0))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">کل بدهی باقیمانده</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(MOCK_INSTALLMENTS.reduce((total, item) => total + item.remainingAmount, 0))}
                </h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">تعداد اقساط باقیمانده</div>
              <div className="font-medium">
                {MOCK_INSTALLMENTS.reduce((total, item) => 
                  total + (item.totalInstallments - item.paidInstallments), 0)} قسط
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* تب‌های اقساط */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active">اقساط جاری</TabsTrigger>
          <TabsTrigger value="pending">در انتظار تأیید</TabsTrigger>
          <TabsTrigger value="completed">تکمیل شده</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                اقساط جاری
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {activeInstallments.length > 0 ? (
                <div className="space-y-6">
                  {activeInstallments.map((installment) => (
                    <div key={installment.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div 
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleInstallmentDetails(installment.id)}
                      >
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                            <h3 className="font-medium text-gray-900">{installment.productName}</h3>
                            <span className="text-sm text-gray-500">{installment.storeName}</span>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
                            <div>
                              <p className="text-xs text-gray-500">مبلغ کل</p>
                              <p className="text-sm font-medium">{formatCurrency(installment.amount)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">قسط ماهانه</p>
                              <p className="text-sm font-medium">{formatCurrency(installment.monthly)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">پرداخت شده</p>
                              <p className="text-sm font-medium">{installment.paidInstallments} از {installment.totalInstallments}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">قسط بعدی</p>
                              <p className="text-sm font-medium">{installment.nextDueDate}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className="bg-amber-500 h-2 rounded-full" 
                              style={{ 
                                width: `${calculateProgress(installment.paidInstallments, installment.totalInstallments)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center mt-4 md:mt-0 ml-0 md:ml-4">
                          <div className="text-right md:text-center flex-1 md:flex-none">
                            <span className="inline-block text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full md:mb-2">
                              {installment.daysLeft} روز مانده
                            </span>
                            <div className="hidden md:block">
                              {expandedInstallment === installment.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {expandedInstallment === installment.id && (
                        <div className="bg-gray-50 p-4 border-t border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-3">تاریخچه پرداخت</h4>
                          <div className="space-y-2">
                            {getPaymentHistoryByInstallmentId(installment.id).map((payment) => (
                              <div key={payment.id} className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">پرداخت قسط</p>
                                    <p className="text-xs text-gray-500">{payment.date}</p>
                                  </div>
                                </div>
                                <div className="text-sm font-medium text-green-600">
                                  {formatCurrency(payment.amount)}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex gap-2">
                            <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                              پرداخت قسط بعدی
                            </Button>
                            <Button variant="outline" className="flex-1">
                              جزئیات کامل
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ قسط فعالی ندارید</h3>
                  <p className="text-gray-500">در حال حاضر هیچ قسط فعالی برای شما ثبت نشده است.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                اقساط در انتظار تأیید
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {pendingInstallments.length > 0 ? (
                <div className="space-y-6">
                  {pendingInstallments.map((installment) => (
                    <div key={installment.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                          <h3 className="font-medium text-gray-900">{installment.productName}</h3>
                          <span className="text-sm text-gray-500">{installment.storeName}</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block w-fit">
                            در انتظار تأیید
                          </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
                          <div>
                            <p className="text-xs text-gray-500">مبلغ کل</p>
                            <p className="text-sm font-medium">{formatCurrency(installment.amount)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">قسط ماهانه</p>
                            <p className="text-sm font-medium">{formatCurrency(installment.monthly)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">تعداد اقساط</p>
                            <p className="text-sm font-medium">{installment.totalInstallments} قسط</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">اولین قسط</p>
                            <p className="text-sm font-medium">{installment.nextDueDate}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                            مشاهده جزئیات
                          </Button>
                          <Button variant="outline" className="flex-1 text-red-500 hover:text-red-700 hover:border-red-300">
                            انصراف
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ درخواست در انتظاری ندارید</h3>
                  <p className="text-gray-500">در حال حاضر هیچ درخواست اقساطی در انتظار تأیید ندارید.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                اقساط تکمیل شده
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {completedInstallments.length > 0 ? (
                <div className="space-y-6">
                  {completedInstallments.map((installment) => (
                    <div key={installment.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                          <h3 className="font-medium text-gray-900">{installment.productName}</h3>
                          <span className="text-sm text-gray-500">{installment.storeName}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block w-fit">
                            تکمیل شده
                          </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                          <div>
                            <p className="text-xs text-gray-500">مبلغ کل</p>
                            <p className="text-sm font-medium">{formatCurrency(installment.amount)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">تعداد اقساط</p>
                            <p className="text-sm font-medium">{installment.totalInstallments} قسط</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">قسط ماهانه</p>
                            <p className="text-sm font-medium">{formatCurrency(installment.monthly)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        
                        <div className="mt-4">
                          <Button variant="outline" className="w-full">
                            مشاهده تاریخچه پرداخت
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ قسط تکمیل شده‌ای ندارید</h3>
                  <p className="text-gray-500">هنوز هیچ وامی را به طور کامل پرداخت نکرده‌اید.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 