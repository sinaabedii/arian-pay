"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Camera, QrCode, CreditCard, Check, X, RefreshCw, ShoppingBag, ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";

// تعریف اینترفیس برای ساختار پذیرنده
interface MerchantType {
  id: string;
  name: string;
  category: string;
  address: string;
}

export default function QRPaymentPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [merchant, setMerchant] = useState<MerchantType | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // شبیه‌سازی اسکن QR کد
  const simulateScan = () => {
    setIsScanning(true);
    setError("");
    
    // شبیه‌سازی اسکن بعد از 2 ثانیه
    setTimeout(() => {
      setIsScanning(false);
      // یک نمونه داده برای پذیرنده
      setMerchant({
        id: "123456",
        name: "فروشگاه لوازم خانگی ایران",
        category: "لوازم خانگی",
        address: "تهران، خیابان ولیعصر",
      });
    }, 2000);
  };
  
  // شبیه‌سازی پرداخت
  const simulatePayment = () => {
    if (!amount || isNaN(Number(amount))) {
      setError("لطفاً مبلغ را به درستی وارد کنید");
      return;
    }
    
    setPaymentStatus("processing");
    setError("");
    
    // شبیه‌سازی پردازش پرداخت
    setTimeout(() => {
      // 80% احتمال موفقیت
      if (Math.random() > 0.2) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("error");
        setError("خطا در پردازش پرداخت. لطفاً دوباره تلاش کنید.");
      }
    }, 2000);
  };
  
  // بازنشانی وضعیت
  const resetState = () => {
    setPaymentStatus("idle");
    setMerchant(null);
    setAmount("");
    setQrValue("");
    setError("");
  };
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return "";
    return new Intl.NumberFormat("fa-IR").format(Number(amount)) + " تومان";
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">پرداخت با QR کد</h1>
          <p className="text-secondary mt-1">پرداخت سریع و آسان در فروشگاه‌های طرف قرارداد</p>
        </div>

        {paymentStatus === "idle" ? (
          <>
            <Tabs defaultValue="scan">
              <TabsList className="w-full">
                <TabsTrigger value="scan" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  اسکن QR کد
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex-1">
                  <QrCode className="h-4 w-4 mr-2" />
                  ورود دستی کد
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="scan" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    {!merchant ? (
                      <div className="flex flex-col items-center p-4">
                        <div className="w-64 h-64 bg-secondary-light rounded-lg mb-4 flex items-center justify-center relative">
                          {isScanning ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-48 h-48 border-2 border-primary animate-pulse rounded"></div>
                              <div className="absolute">
                                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                              </div>
                            </div>
                          ) : (
                            <Camera className="h-12 w-12 text-secondary" />
                          )}
                        </div>
                        <Button 
                          onClick={simulateScan} 
                          disabled={isScanning}
                          className="mt-4"
                        >
                          {isScanning ? "در حال اسکن..." : "اسکن QR کد"}
                        </Button>
                        <p className="text-xs text-secondary mt-2">دوربین خود را به سمت QR کد فروشگاه بگیرید</p>
                      </div>
                    ) : (
                      <MerchantInfo merchant={merchant} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="manual" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium block mb-2">کد QR پذیرنده</label>
                        <Input
                          value={qrValue}
                          onChange={(e) => setQrValue(e.target.value)}
                          placeholder="کد را وارد کنید"
                        />
                        <p className="text-xs text-secondary mt-1">کد QR را از فروشگاه دریافت کنید</p>
                      </div>
                      <Button 
                        onClick={() => {
                          if (qrValue) {
                            simulateScan();
                          } else {
                            setError("لطفاً کد را وارد کنید");
                          }
                        }} 
                        disabled={isScanning || !qrValue}
                        className="w-full"
                      >
                        تایید کد
                      </Button>
                    </div>
                    
                    {merchant && (
                      <div className="mt-4">
                        <MerchantInfo merchant={merchant} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {merchant && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">مبلغ پرداخت (تومان)</label>
                      <Input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="مبلغ را وارد کنید"
                        className="text-left"
                      />
                      {amount && !isNaN(Number(amount)) && (
                        <p className="text-xs text-secondary mt-1 text-left">
                          {formatCurrency(amount)}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex justify-between pt-2 text-sm border-t border-border">
                      <span>اعتبار شما:</span>
                      <span className="font-medium">{user?.creditLimit ? formatCurrency(user.creditLimit.toString()) : "نامشخص"}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>موجودی کیف پول:</span>
                      <span className="font-medium">{user?.walletBalance ? formatCurrency(user.walletBalance.toString()) : "نامشخص"}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border pt-4">
                  <div className="w-full space-y-3">
                    {error && (
                      <div className="p-2 bg-danger-light text-danger text-sm rounded">
                        {error}
                      </div>
                    )}
                    <Button 
                      onClick={simulatePayment} 
                      className="w-full gap-2"
                      disabled={!amount || isNaN(Number(amount))}
                    >
                      <CreditCard className="h-4 w-4" />
                      پرداخت
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </>
        ) : (
          <PaymentResult 
            status={paymentStatus} 
            amount={amount} 
            merchant={merchant} 
            error={error} 
            onReset={resetState}
            onViewTransactions={() => router.push("/wallet")}
          />
        )}
      </div>
    </AppLayout>
  );
}

interface MerchantInfoProps {
  merchant: MerchantType;
}

function MerchantInfo({ merchant }: MerchantInfoProps) {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-medium">{merchant.name}</h3>
          <p className="text-xs text-secondary">{merchant.category}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-secondary">{merchant.address}</p>
        </div>
      </div>
    </div>
  );
}

interface PaymentResultProps {
  status: "processing" | "success" | "error";
  amount: string;
  merchant: MerchantType | null;
  error: string;
  onReset: () => void;
  onViewTransactions: () => void;
}

function PaymentResult({ status, amount, merchant, error, onReset, onViewTransactions }: PaymentResultProps) {
  return (
    <Card>
      <CardContent className="pt-6 pb-0">
        <div className="flex flex-col items-center text-center">
          {status === "processing" && (
            <>
              <div className="w-16 h-16 rounded-full bg-secondary-light flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              </div>
              <h2 className="text-xl font-medium mb-2">در حال پردازش</h2>
              <p className="text-secondary">لطفاً صبر کنید...</p>
            </>
          )}
          
          {status === "success" && (
            <>
              <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-xl font-medium mb-2">پرداخت موفق</h2>
              <p className="text-secondary mb-4">پرداخت با موفقیت انجام شد</p>
              
              <div className="w-full bg-secondary-light rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-secondary">مبلغ:</span>
                  <span className="font-medium">{new Intl.NumberFormat("fa-IR").format(Number(amount))} تومان</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-secondary">پذیرنده:</span>
                  <span className="font-medium">{merchant?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">شماره پیگیری:</span>
                  <span className="font-medium">{Math.floor(Math.random() * 1000000000)}</span>
                </div>
              </div>
            </>
          )}
          
          {status === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-danger-light flex items-center justify-center mb-4">
                <X className="h-8 w-8 text-danger" />
              </div>
              <h2 className="text-xl font-medium mb-2">خطا در پرداخت</h2>
              <p className="text-danger mb-4">{error}</p>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 border-t border-border mt-6 pt-4">
        {status === "success" ? (
          <>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onViewTransactions}
            >
              مشاهده تراکنش‌ها
            </Button>
            <Button 
              variant="primary" 
              className="w-full gap-2" 
              onClick={onReset}
            >
              <ArrowRight className="h-4 w-4" />
              پرداخت جدید
            </Button>
          </>
        ) : (
          <Button 
            variant={status === "error" ? "primary" : "outline"} 
            className="w-full" 
            onClick={onReset}
            disabled={status === "processing"}
          >
            {status === "error" ? "تلاش مجدد" : "لغو"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 