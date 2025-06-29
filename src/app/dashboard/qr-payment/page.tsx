"use client";

import { useState } from "react";
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
  Phone,
} from "lucide-react";

export default function QrPaymentPage() {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);

  const handleScan = () => {
    setIsCameraActive(true);
    setTimeout(() => {
      setIsCameraActive(false);
      setPaymentComplete(true);
    }, 2000);
  };

  const handleGenerateQR = () => {
    if (!amount) return;
    setQrGenerated(true);
  };

  const handleCopyLink = () => {
    alert("لینک پرداخت کپی شد!");
  };

  const handleShare = () => {
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

  const handleTabChange = () => {
    setQrGenerated(false);
    setPaymentComplete(false);
    setIsCameraActive(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 sm:space-y-8 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            پرداخت با QR
          </h1>
          <p className="text-gray-700 font-medium mt-1 text-sm sm:text-base">
            پرداخت سریع با اسکن یا نمایش کد QR
          </p>
        </div>
        <Tabs
          defaultValue="scan"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl mb-4">
            <TabsTrigger
              value="scan"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <Scan className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">اسکن کد QR</span>
              <span className="sm:hidden">اسکن</span>
            </TabsTrigger>
            <TabsTrigger
              value="show"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <QrCode className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">نمایش کد QR</span>
              <span className="sm:hidden">نمایش</span>
            </TabsTrigger>
            <TabsTrigger
              value="request"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg text-xs sm:text-sm"
            >
              <Send className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">درخواست پرداخت</span>
              <span className="sm:hidden">درخواست</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="scan">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Scan className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    اسکن کد QR
                  </h3>
                </div>

                {!paymentComplete ? (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full max-w-xs sm:max-w-md aspect-square bg-gray-100 rounded-xl mb-4 sm:mb-6 flex items-center justify-center relative">
                      {isCameraActive ? (
                        <div className="animate-pulse">
                          <RefreshCw className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 animate-spin" />
                        </div>
                      ) : (
                        <>
                          <Camera className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                          <div className="absolute inset-0 border-2 border-blue-500 rounded-xl"></div>
                        </>
                      )}
                    </div>

                    <p className="text-gray-700 font-medium mb-4 sm:mb-6 text-sm sm:text-base px-4">
                      دوربین خود را روی کد QR نشانه بگیرید تا به صورت خودکار
                      اسکن شود.
                    </p>

                    <Button
                      className="gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                      onClick={handleScan}
                      disabled={isCameraActive}
                    >
                      <Scan className="h-4 w-4 sm:h-5 sm:w-5" />
                      {isCameraActive ? "در حال اسکن..." : "شروع اسکن"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      پرداخت با موفقیت انجام شد
                    </h3>
                    <p className="text-gray-700 font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                      مبلغ ۱۵,۰۰۰ تومان به دیجی کالا پرداخت شد.
                    </p>

                    <div className="w-full max-w-md space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">شماره پیگیری:</span>
                          <span className="font-medium">۱۲۳۴۵۶۷۸۹۰</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium">تاریخ و زمان:</span>
                          <span className="font-medium">
                            ۱۴۰۲/۰۸/۲۰ - ۱۵:۳۰
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">وضعیت:</span>
                          <span className="font-medium text-green-600">
                            موفق
                          </span>
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="show">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <QrCode className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    نمایش کد QR
                  </h3>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-xs sm:max-w-md aspect-square bg-white border-2 border-blue-200 rounded-xl mb-4 sm:mb-6 flex items-center justify-center p-4">
                    <div className="w-full h-full bg-white p-4 flex items-center justify-center">
                      <div className="w-full aspect-square bg-[url('/qr-code-sample.png')] bg-contain bg-no-repeat bg-center">
                        <div className="w-full h-full flex items-center justify-center">
                          <QrCode className="h-24 w-24 sm:h-32 sm:w-32 text-blue-900" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 sm:mb-6 w-full max-w-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        کد اختصاصی کیف پول شما
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <p>
                        با نمایش این کد به پذیرنده، می‌توانید پرداخت سریع انجام
                        دهید.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                    <Button
                      variant="outline"
                      className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                    >
                      <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">شارژ کیف پول</span>
                    </Button>
                    <Button
                      className="gap-1 bg-blue-600 hover:bg-blue-700"
                      onClick={handleShare}
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">اشتراک‌گذاری</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="request">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <Send className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    درخواست پرداخت
                  </h3>
                </div>

                {!qrGenerated ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                          مبلغ (تومان)
                        </label>
                        <Input
                          type="text"
                          placeholder="مثال: 500,000"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                          توضیحات (اختیاری)
                        </label>
                        <Input
                          type="text"
                          placeholder="مثال: پرداخت قبض"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
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

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h3 className="font-medium text-gray-900 mb-3">
                        مبالغ پیشنهادی
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {[100000, 200000, 500000, 1000000].map((value) => (
                          <div
                            key={value}
                            className="p-2 sm:p-3 bg-white rounded-lg border border-gray-200 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors text-xs sm:text-sm"
                            onClick={() => setAmount(value.toLocaleString())}
                          >
                            {new Intl.NumberFormat("fa-IR").format(value)} تومان
                          </div>
                        ))}
                      </div>

                      <h3 className="font-medium text-gray-900 mb-3">
                        راهنمای درخواست پرداخت
                      </h3>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          مبلغ مورد نظر را وارد کنید
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          کد QR تولید شده را به پرداخت‌کننده نشان دهید
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          یا لینک پرداخت را برای پرداخت‌کننده ارسال کنید
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full max-w-xs sm:max-w-md aspect-square bg-white border-2 border-blue-200 rounded-xl mb-4 sm:mb-6 flex items-center justify-center p-4">
                      <div className="w-full h-full bg-white p-4 flex items-center justify-center">
                        <div className="w-full aspect-square bg-[url('/qr-code-sample.png')] bg-contain bg-no-repeat bg-center">
                          <div className="w-full h-full flex items-center justify-center">
                            <QrCode className="h-24 w-24 sm:h-32 sm:w-32 text-blue-900" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 sm:mb-6 w-full max-w-md">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900 text-sm sm:text-base">
                          درخواست پرداخت
                        </div>
                        <div className="font-bold text-blue-700 text-sm sm:text-base">
                          {amount} تومان
                        </div>
                      </div>
                      <div className="mt-2 text-xs sm:text-sm text-gray-700 font-medium">
                        <p>توضیحات: {description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md">
                      <Button
                        variant="outline"
                        className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                        onClick={() => setQrGenerated(false)}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span className="hidden sm:inline">شروع مجدد</span>
                        <span className="sm:hidden">مجدد</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">کپی لینک</span>
                        <span className="sm:hidden">کپی</span>
                      </Button>
                      <Button
                        className="gap-1 bg-blue-600 hover:bg-blue-700"
                        onClick={handleShare}
                      >
                        <Send className="h-4 w-4" />
                        <span className="hidden sm:inline">اشتراک‌گذاری</span>
                        <span className="sm:hidden">اشتراک</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <CreditCard className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                راهنمای پرداخت با QR
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Scan className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  اسکن کد QR
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  با استفاده از قابلیت اسکن، کد QR فروشگاه‌ها را اسکن کرده و به
                  سرعت پرداخت کنید.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  نمایش کد QR
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  کد QR اختصاصی خود را نمایش دهید تا دیگران بتوانند به شما
                  پرداخت کنند.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                  درخواست پرداخت
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  با ایجاد کد QR برای مبلغ مورد نظر، به راحتی از دیگران درخواست
                  پرداخت کنید.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
