"use client";

import { useState } from "react";
import { CreditCard, CheckCircle, Clock, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [installments, setInstallments] = useState(MOCK_INSTALLMENTS);
  const [selectedInstallment, setSelectedInstallment] = useState<
    (typeof MOCK_INSTALLMENTS)[0] | null
  >(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  const activeInstallments = installments.filter(
    (item) => item.status === "active"
  );

  const completedInstallments = installments.filter(
    (item) => item.status === "completed"
  );

  const handlePayInstallment = (installment: (typeof MOCK_INSTALLMENTS)[0]) => {
    setSelectedInstallment(installment);
    setPaymentDialogOpen(true);
  };

  const processPayment = () => {
    if (!selectedInstallment) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaymentSuccess(true);
      const updatedInstallments = installments.map((item) => {
        if (item.id === selectedInstallment.id) {
          const updatedPaidInstallments = item.paidInstallments + 1;
          const updatedRemainingAmount =
            item.remainingAmount - item.installmentAmount;
          const newStatus =
            updatedPaidInstallments >= item.totalInstallments
              ? "completed"
              : "active";

          return {
            ...item,
            paidInstallments: updatedPaidInstallments,
            remainingAmount: updatedRemainingAmount,
            status: newStatus,
            nextInstallmentDate:
              newStatus === "completed" ? null : "1402/05/15",
          };
        }
        return item;
      });

      setInstallments(updatedInstallments);

      setTimeout(() => {
        setIsPaymentSuccess(false);
        setPaymentDialogOpen(false);
        setSelectedInstallment(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            اقساط
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            مدیریت و پرداخت اقساط خریدهای اعتباری
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                خلاصه وضعیت اقساط
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center sm:text-right space-y-1">
                <p className="text-sm text-gray-500">اقساط فعال</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeInstallments.length}
                </p>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <p className="text-sm text-gray-500">اقساط پرداخت شده</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completedInstallments.length}
                </p>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <p className="text-sm text-gray-500">کل بدهی باقیمانده</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    activeInstallments.reduce(
                      (sum, item) => sum + item.remainingAmount,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            اقساط فعال
          </h2>
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
            <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                هیچ قسط فعالی ندارید
              </h3>
              <p className="text-gray-600 mt-1">
                تمام اقساط شما پرداخت شده است
              </p>
            </div>
          )}
        </div>

        {completedInstallments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              اقساط تکمیل شده
            </h2>
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
      </div>

      {paymentDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    پرداخت قسط
                  </h2>
                  {selectedInstallment && (
                    <p className="text-gray-600 text-sm mt-1">
                      {`${selectedInstallment.merchantName} - ${selectedInstallment.product}`}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setPaymentDialogOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {!isPaymentSuccess ? (
                <div className="space-y-4 py-4">
                  {selectedInstallment && (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            مبلغ قسط:
                          </span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(
                              selectedInstallment.nextInstallmentAmount
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            تاریخ سررسید:
                          </span>
                          <span className="font-medium text-gray-900">
                            {selectedInstallment.nextInstallmentDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            وضعیت پرداخت:
                          </span>
                          <span className="font-medium text-yellow-600">
                            در انتظار پرداخت
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        <Button
                          onClick={processPayment}
                          disabled={isProcessing}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          {isProcessing ? "در حال پردازش..." : "پرداخت قسط"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setPaymentDialogOpen(false)}
                          disabled={isProcessing}
                          className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
                        >
                          انصراف
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">
                      پرداخت با موفقیت انجام شد
                    </h3>
                    <p className="text-gray-600 mt-1">
                      قسط شما با موفقیت پرداخت شد
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface InstallmentCardProps {
  installment: (typeof MOCK_INSTALLMENTS)[0];
  formatCurrency: (amount: number) => string;
  onPayInstallment: () => void;
  isCompleted?: boolean;
}

function InstallmentCard({
  installment,
  formatCurrency,
  onPayInstallment,
  isCompleted = false,
}: InstallmentCardProps) {
  const progress = Math.round(
    (installment.paidInstallments / installment.totalInstallments) * 100
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div
        className={`h-1 bg-gradient-to-r ${
          isCompleted
            ? "from-green-400 to-green-600"
            : "from-orange-400 to-orange-600"
        }`}
      ></div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="font-medium text-gray-900 text-lg">
                {installment.merchantName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {installment.product}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <div className="text-green-600 flex items-center gap-1">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">تکمیل شده</span>
                </div>
              ) : (
                <div className="text-orange-600 flex items-center gap-1">
                  <Clock size={16} />
                  <span className="text-sm font-medium">
                    موعد پرداخت بعدی: {installment.nextInstallmentDate}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <span className="ml-2">پیشرفت: </span>
              <div className="w-24 sm:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isCompleted ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="mr-2">
                {installment.paidInstallments} از{" "}
                {installment.totalInstallments}
              </span>
            </div>
          </div>

          <div className="space-y-4 lg:max-w-xs lg:min-w-0">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-gray-500 mb-1">مبلغ کل</p>
                <p className="font-medium text-gray-900 text-sm">
                  {formatCurrency(installment.totalAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">مبلغ باقیمانده</p>
                <p className="font-medium text-gray-900 text-sm">
                  {formatCurrency(installment.remainingAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">مبلغ هر قسط</p>
                <p className="font-medium text-gray-900 text-sm">
                  {formatCurrency(installment.installmentAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">قسط بعدی</p>
                <p className="font-medium text-gray-900 text-sm">
                  {isCompleted
                    ? "-"
                    : formatCurrency(installment.nextInstallmentAmount)}
                </p>
              </div>
            </div>

            {!isCompleted && (
              <Button
                onClick={onPayInstallment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
              >
                پرداخت قسط
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
