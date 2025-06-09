"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// دیتای نمونه برای اقساط
const MOCK_INSTALLMENTS = [
  {
    id: "1",
    merchantName: "دیجی کالا",
    product: "گوشی موبایل سامسونگ Galaxy S21",
    totalAmount: 30000000,
    remainingAmount: 21000000,
    installmentAmount: 3000000,
    totalInstallments: 10,
    paidInstallments: 3,
    nextInstallmentDate: "1402/04/15",
    nextInstallmentAmount: 3000000,
    status: "active",
  },
  {
    id: "2",
    merchantName: "هایپر استار",
    product: "یخچال ساید بای ساید ال جی",
    totalAmount: 45000000,
    remainingAmount: 45000000,
    installmentAmount: 5000000,
    totalInstallments: 9,
    paidInstallments: 0,
    nextInstallmentDate: "1402/04/10",
    nextInstallmentAmount: 5000000,
    status: "active",
  },
  {
    id: "3",
    merchantName: "ایرانیان مال",
    product: "مبلمان راحتی",
    totalAmount: 18000000,
    remainingAmount: 0,
    installmentAmount: 3000000,
    totalInstallments: 6,
    paidInstallments: 6,
    nextInstallmentDate: null,
    nextInstallmentAmount: 0,
    status: "completed",
  },
];

export default function InstallmentsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [installments, setInstallments] = useState(MOCK_INSTALLMENTS);
  const [selectedInstallment, setSelectedInstallment] = useState<typeof MOCK_INSTALLMENTS[0] | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  // فیلتر کردن اقساط فعال
  const activeInstallments = installments.filter(item => item.status === "active");
  
  // فیلتر کردن اقساط تکمیل شده
  const completedInstallments = installments.filter(item => item.status === "completed");

  const handlePayInstallment = (installment: typeof MOCK_INSTALLMENTS[0]) => {
    setSelectedInstallment(installment);
    setPaymentDialogOpen(true);
  };

  const processPayment = () => {
    if (!selectedInstallment) return;
    
    setIsProcessing(true);
    // شبیه‌سازی پرداخت
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
      
      // بروزرسانی وضعیت قسط
      const updatedInstallments = installments.map(item => {
        if (item.id === selectedInstallment.id) {
          const updatedPaidInstallments = item.paidInstallments + 1;
          const updatedRemainingAmount = item.remainingAmount - item.installmentAmount;
          const newStatus = updatedPaidInstallments >= item.totalInstallments ? "completed" : "active";
          
          return {
            ...item,
            paidInstallments: updatedPaidInstallments,
            remainingAmount: updatedRemainingAmount,
            status: newStatus,
            nextInstallmentDate: newStatus === "completed" ? null : "1402/05/15", // تاریخ قسط بعدی در حالت واقعی محاسبه می‌شود
          };
        }
        return item;
      });
      
      setInstallments(updatedInstallments);
      
      // بستن دیالوگ بعد از چند ثانیه
      setTimeout(() => {
        setIsPaymentSuccess(false);
        setPaymentDialogOpen(false);
        setSelectedInstallment(null);
      }, 2000);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">اقساط</h1>
          <p className="text-secondary mt-1">مدیریت و پرداخت اقساط خریدهای اعتباری</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              خلاصه وضعیت اقساط
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-secondary">اقساط فعال</p>
              <p className="text-2xl font-bold">{activeInstallments.length}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-secondary">اقساط پرداخت شده</p>
              <p className="text-2xl font-bold">{completedInstallments.length}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-secondary">کل بدهی باقیمانده</p>
              <p className="text-2xl font-bold">
                {formatCurrency(
                  activeInstallments.reduce((sum, item) => sum + item.remainingAmount, 0)
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">اقساط فعال</h2>
          {activeInstallments.length > 0 ? (
            <div className="space-y-4">
              {activeInstallments.map((installment) => (
                <InstallmentCard 
                  key={installment.id} 
                  installment={installment} 
                  formatCurrency={formatCurrency}
                  onPayInstallment={() => handlePayInstallment(installment)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-secondary-light rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-medium">هیچ قسط فعالی ندارید</h3>
              <p className="text-secondary mt-1">تمام اقساط شما پرداخت شده است</p>
            </div>
          )}
        </div>

        {completedInstallments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">اقساط تکمیل شده</h2>
            <div className="space-y-4">
              {completedInstallments.map((installment) => (
                <InstallmentCard 
                  key={installment.id} 
                  installment={installment} 
                  formatCurrency={formatCurrency}
                  onPayInstallment={() => {}}
                  isCompleted
                />
              ))}
            </div>
          </div>
        )}

        {/* دیالوگ پرداخت قسط */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>پرداخت قسط</DialogTitle>
              <DialogDescription>
                {selectedInstallment && `پرداخت قسط ${selectedInstallment.merchantName} - ${selectedInstallment.product}`}
              </DialogDescription>
            </DialogHeader>
            
            {!isPaymentSuccess ? (
              <div className="space-y-4 py-4">
                {selectedInstallment && (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary">مبلغ قسط:</span>
                        <span className="font-medium">{formatCurrency(selectedInstallment.nextInstallmentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary">تاریخ سررسید:</span>
                        <span className="font-medium">{selectedInstallment.nextInstallmentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-secondary">وضعیت پرداخت:</span>
                        <span className="font-medium text-warning">در انتظار پرداخت</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex flex-col gap-2">
                      <Button 
                        onClick={processPayment} 
                        disabled={isProcessing}
                        className="w-full"
                      >
                        {isProcessing ? "در حال پردازش..." : "پرداخت قسط"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setPaymentDialogOpen(false)}
                        disabled={isProcessing}
                        className="w-full"
                      >
                        انصراف
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-success">پرداخت با موفقیت انجام شد</h3>
                  <p className="text-secondary mt-1">قسط شما با موفقیت پرداخت شد</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

interface InstallmentCardProps {
  installment: typeof MOCK_INSTALLMENTS[0];
  formatCurrency: (amount: number) => string;
  onPayInstallment: () => void;
  isCompleted?: boolean;
}

function InstallmentCard({ installment, formatCurrency, onPayInstallment, isCompleted = false }: InstallmentCardProps) {
  const progress = Math.round((installment.paidInstallments / installment.totalInstallments) * 100);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium">{installment.merchantName}</h3>
              <p className="text-sm text-secondary">{installment.product}</p>
            </div>
            
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <div className="text-success flex items-center gap-1">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">تکمیل شده</span>
                </div>
              ) : (
                <div className="text-warning flex items-center gap-1">
                  <Clock size={16} />
                  <span className="text-sm font-medium">
                    موعد پرداخت بعدی: {installment.nextInstallmentDate}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center text-sm text-secondary">
              <span>پیشرفت: </span>
              <div className="w-32 h-2 bg-secondary-light rounded-full mx-2 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{installment.paidInstallments} از {installment.totalInstallments}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-xs text-secondary">مبلغ کل</p>
                <p className="font-medium">{formatCurrency(installment.totalAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">مبلغ باقیمانده</p>
                <p className="font-medium">
                  {formatCurrency(installment.remainingAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-secondary">مبلغ هر قسط</p>
                <p className="font-medium">{formatCurrency(installment.installmentAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">قسط بعدی</p>
                <p className="font-medium">
                  {isCompleted ? "-" : formatCurrency(installment.nextInstallmentAmount)}
                </p>
              </div>
            </div>
            
            {!isCompleted && (
              <Button
                onClick={onPayInstallment}
                className="w-full"
              >
                پرداخت قسط
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 