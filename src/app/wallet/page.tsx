"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet, CreditCard, ArrowUp, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// دیتای نمونه برای تراکنش‌های کیف پول
const MOCK_TRANSACTIONS = [
  {
    id: "1",
    type: "deposit",
    amount: 1000000,
    date: "1402/03/15",
    description: "شارژ کیف پول",
    status: "success",
  },
  {
    id: "2",
    type: "withdraw",
    amount: 450000,
    date: "1402/03/10",
    description: "پرداخت قسط",
    status: "success",
  },
  {
    id: "3",
    type: "deposit",
    amount: 2000000,
    date: "1402/02/25",
    description: "شارژ کیف پول",
    status: "success",
  },
];

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDepositSuccess, setIsDepositSuccess] = useState(false);

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  const handleDeposit = () => {
    // شبیه‌سازی درخواست به درگاه پرداخت
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDepositSuccess(true);
      // بعد از چند ثانیه دیالوگ را ببندد
      setTimeout(() => {
        setIsDepositSuccess(false);
        setIsDepositDialogOpen(false);
        setDepositAmount("");
      }, 2000);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">کیف پول</h1>
          <p className="text-secondary mt-1">مدیریت کیف پول و شارژ حساب</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              موجودی کیف پول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(user.walletBalance)}</div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setIsDepositDialogOpen(true)}
                className="flex-1 gap-2"
              >
                <Plus size={18} /> افزایش موجودی
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 gap-2"
              >
                <RefreshCw size={18} /> تاریخچه تراکنش‌ها
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">تراکنش‌های اخیر</h2>
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "deposit" 
                        ? "bg-success/10 text-success" 
                        : "bg-danger/10 text-danger"
                    }`}>
                      {transaction.type === "deposit" ? <ArrowUp size={16} /> : <CreditCard size={16} />}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-secondary">{transaction.date}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === "deposit" ? "text-success" : "text-danger"
                  }`}>
                    {transaction.type === "deposit" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* دیالوگ افزایش موجودی */}
        <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>افزایش موجودی کیف پول</DialogTitle>
              <DialogDescription>
                مبلغ مورد نظر برای شارژ کیف پول را وارد کنید
              </DialogDescription>
            </DialogHeader>
            
            {!isDepositSuccess ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">مبلغ (تومان)</label>
                  <Input
                    type="number"
                    placeholder="مثال: 1,000,000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleDeposit} 
                    disabled={!depositAmount || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? "در حال پردازش..." : "پرداخت و افزایش موجودی"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDepositDialogOpen(false)}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor" 
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-success">پرداخت با موفقیت انجام شد</h3>
                  <p className="text-secondary mt-1">موجودی کیف پول شما افزایش یافت</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
} 