"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  QrCode,
  Send,
  Scan,
  CreditCard,
  Wallet,
  Camera,
  Copy,
  CheckCircle,
  RefreshCw,
  Phone
} from "lucide-react";

export default function QrPaymentPage() {
  const [activeTab, setActiveTab] = useState<string>("scan");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
  
  // شبیه‌سازی روند اسکن و پرداخت
  const handleScan = () => {
    setIsCameraActive(true);
    // در یک محیط واقعی، اینجا کد اسکن QR قرار می‌گیرد
    setTimeout(() => {
      setIsCameraActive(false);
      setPaymentComplete(true);
    }, 2000);
  };
  
  // ایجاد QR کد پرداخت
  const handleGenerateQR = () => {
    if (!amount) return;
    setQrGenerated(true);
  };
  
  // کپی کردن لینک پرداخت
  const handleCopyLink = () => {
    // در محیط واقعی، لینک پرداخت کپی می‌شود
    alert("لینک پرداخت کپی شد!");
  };
  
  // شبیه‌سازی اشتراک‌گذاری لینک پرداخت
  const handleShare = () => {
    // در محیط واقعی، منوی اشتراک‌گذاری باز می‌شود
    if (navigator.share) {
      navigator.share({
        title: "درخواست پرداخت سعید پی",
        text: `درخواست پرداخت به مبلغ ${amount} تومان`,
        url: "https://saeedpay.ir/payment/123456",
      });
    } else {
      alert("قابلیت اشتراک‌گذاری در مرورگر شما پشتیبانی نمی‌شود.");
    }
  };
  
  // تغییر وضعیت تب فعال
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setQrGenerated(false);
    setPaymentComplete(false);
    setIsCameraActive(false);
  };
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">پرداخت با QR</h1>
        <p className="text-gray-600 mt-1">پرداخت سریع با اسکن یا نمایش کد QR</p>
      </div>
      
      {/* تب‌های پرداخت */}
      <Tabs 
        defaultValue="scan" 
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="scan">اسکن کد QR</TabsTrigger>
          <TabsTrigger value="show">نمایش کد QR</TabsTrigger>
          <TabsTrigger value="request">درخواست پرداخت</TabsTrigger>
        </TabsList>
        
        {/* تب اسکن کد QR */}
        <TabsContent value="scan">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Scan className="h-5 w-5 text-blue-600" />
                اسکن کد QR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!paymentComplete ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-md aspect-square bg-gray-100 rounded-xl mb-6 flex items-center justify-center relative">
                    {isCameraActive ? (
                      <div className="animate-pulse">
                        <RefreshCw className="h-10 w-10 text-blue-600 animate-spin" />
                      </div>
                    ) : (
                      <>
                        <Camera className="h-12 w-12 text-gray-400" />
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl"></div>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    دوربین خود را روی کد QR نشانه بگیرید تا به صورت خودکار اسکن شود.
                  </p>
                  
                  <Button 
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={handleScan}
                    disabled={isCameraActive}
                  >
                    <Scan className="h-5 w-5" />
                    {isCameraActive ? "در حال اسکن..." : "شروع اسکن"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">پرداخت با موفقیت انجام شد</h3>
                  <p className="text-gray-600 mb-6">
                    مبلغ ۱۵,۰۰۰ تومان به دیجی کالا پرداخت شد.
                  </p>
                  
                  <div className="w-full max-w-md space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">شماره پیگیری:</span>
                        <span className="font-medium">۱۲۳۴۵۶۷۸۹۰</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500">تاریخ و زمان:</span>
                        <span className="font-medium">۱۴۰۲/۰۸/۲۰ - ۱۵:۳۰</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">وضعیت:</span>
                        <span className="font-medium text-green-600">موفق</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setPaymentComplete(false)}
                    >
                      اسکن جدید
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تب نمایش کد QR */}
        <TabsContent value="show">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                نمایش کد QR
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-md aspect-square bg-white border-2 border-blue-200 rounded-xl mb-6 flex items-center justify-center p-4">
                  {/* نمایش کد QR کیف پول کاربر */}
                  <div className="w-full h-full bg-white p-4 flex items-center justify-center">
                    <div className="w-full aspect-square bg-[url('/qr-code-sample.png')] bg-contain bg-no-repeat bg-center">
                      {/* در محیط واقعی، اینجا تصویر QR قرار می‌گیرد */}
                      <div className="w-full h-full flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-blue-900" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 w-full max-w-md">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">کد اختصاصی کیف پول شما</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>با نمایش این کد به پذیرنده، می‌توانید پرداخت سریع انجام دهید.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  <Button variant="outline" className="gap-1">
                    <Wallet className="h-5 w-5" />
                    شارژ کیف پول
                  </Button>
                  <Button 
                    className="gap-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleShare}
                  >
                    <Send className="h-5 w-5" />
                    اشتراک‌گذاری
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تب درخواست پرداخت */}
        <TabsContent value="request">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-600" />
                درخواست پرداخت
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {!qrGenerated ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
                      <Input 
                        type="text" 
                        placeholder="مثال: 500,000" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات (اختیاری)</label>
                      <Input 
                        type="text" 
                        placeholder="مثال: پرداخت قبض" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handleGenerateQR}
                      disabled={!amount}
                    >
                      ایجاد کد QR
                    </Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-3">مبالغ پیشنهادی</h3>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[100000, 200000, 500000, 1000000].map((value) => (
                        <div 
                          key={value}
                          className="p-2 bg-white rounded border border-gray-200 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          onClick={() => setAmount(value.toLocaleString())}
                        >
                          {new Intl.NumberFormat("fa-IR").format(value)} تومان
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="font-medium text-gray-900 mb-3">راهنمای درخواست پرداخت</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        مبلغ مورد نظر را وارد کنید
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        کد QR تولید شده را به پرداخت‌کننده نشان دهید
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        یا لینک پرداخت را برای پرداخت‌کننده ارسال کنید
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-md aspect-square bg-white border-2 border-blue-200 rounded-xl mb-6 flex items-center justify-center p-4">
                    {/* نمایش کد QR درخواست پرداخت */}
                    <div className="w-full h-full bg-white p-4 flex items-center justify-center">
                      <div className="w-full aspect-square bg-[url('/qr-code-sample.png')] bg-contain bg-no-repeat bg-center">
                        {/* در محیط واقعی، اینجا تصویر QR قرار می‌گیرد */}
                        <div className="w-full h-full flex items-center justify-center">
                          <QrCode className="h-32 w-32 text-blue-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 w-full max-w-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-900">درخواست پرداخت</div>
                      <div className="font-bold text-blue-700">{amount} تومان</div>
                    </div>
                    {description && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>توضیحات: {description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md">
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => setQrGenerated(false)}
                    >
                      <RefreshCw className="h-5 w-5" />
                      شروع مجدد
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-1"
                      onClick={handleCopyLink}
                    >
                      <Copy className="h-5 w-5" />
                      کپی لینک
                    </Button>
                    <Button 
                      className="gap-1 bg-blue-600 hover:bg-blue-700"
                      onClick={handleShare}
                    >
                      <Send className="h-5 w-5" />
                      اشتراک‌گذاری
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* کارت راهنمای پرداخت */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
        <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-600"></div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-purple-600" />
            راهنمای پرداخت با QR
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Scan className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">اسکن کد QR</h3>
              <p className="text-sm text-gray-600">
                با استفاده از قابلیت اسکن، کد QR فروشگاه‌ها را اسکن کرده و به سرعت پرداخت کنید.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <QrCode className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">نمایش کد QR</h3>
              <p className="text-sm text-gray-600">
                کد QR اختصاصی خود را نمایش دهید تا دیگران بتوانند به شما پرداخت کنند.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">درخواست پرداخت</h3>
              <p className="text-sm text-gray-600">
                با ایجاد کد QR برای مبلغ مورد نظر، به راحتی از دیگران درخواست پرداخت کنید.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 