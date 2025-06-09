"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// ساختار گام‌های درخواست اعتبار
const CREDIT_REQUEST_STEPS = [
  {
    id: "personal-info",
    title: "اطلاعات شخصی",
    description: "اطلاعات شخصی خود را تکمیل کنید",
    fields: [
      { name: "nationalId", label: "کد ملی", type: "text", required: true },
      { name: "birthDate", label: "تاریخ تولد", type: "text", required: true, placeholder: "مثال: 1370/06/15" },
      { name: "address", label: "آدرس", type: "text", required: true },
      { name: "postalCode", label: "کد پستی", type: "text", required: true },
    ],
  },
  {
    id: "job-info",
    title: "اطلاعات شغلی",
    description: "اطلاعات شغلی و درآمد خود را وارد کنید",
    fields: [
      { name: "job", label: "شغل", type: "text", required: true },
      { name: "income", label: "درآمد ماهیانه (تومان)", type: "number", required: true },
      { name: "jobAddress", label: "آدرس محل کار", type: "text", required: true },
      { name: "jobDuration", label: "مدت اشتغال (سال)", type: "number", required: true },
    ],
  },
  {
    id: "bank-info",
    title: "اطلاعات بانکی",
    description: "اطلاعات حساب بانکی خود را وارد کنید",
    fields: [
      { name: "accountNumber", label: "شماره حساب", type: "text", required: true },
      { name: "cardNumber", label: "شماره کارت", type: "text", required: true },
      { name: "bankName", label: "نام بانک", type: "text", required: true },
      { name: "sheba", label: "شماره شبا (بدون IR)", type: "text", required: true },
    ],
  },
];

export default function CreditRequestPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditAmount, setCreditAmount] = useState<number | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    const currentStepData = CREDIT_REQUEST_STEPS[currentStep];
    const isStepValid = currentStepData.fields.every(
      (field) => !field.required || (formData[field.name] && formData[field.name].trim() !== "")
    );

    if (isStepValid) {
      if (currentStep < CREDIT_REQUEST_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      alert("لطفاً تمام فیلدهای ضروری را پر کنید.");
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    
    // شبیه‌سازی درخواست API
    setTimeout(() => {
      setIsProcessing(false);
      
      // مقدار اعتبار تخصیص داده شده (در حالت واقعی از سرور دریافت می‌شود)
      const approvedCreditAmount = 15000000; // 15 میلیون تومان
      setCreditAmount(approvedCreditAmount);
      setSuccessDialogOpen(true);
    }, 2000);
  };

  const currentStepData = CREDIT_REQUEST_STEPS[currentStep];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">درخواست اعتبار</h1>
          <p className="text-secondary mt-1">اطلاعات خود را تکمیل کنید و اعتبار خود را دریافت نمایید</p>
        </div>

        {user.creditLimit ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                اعتبار فعلی شما
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-secondary">میزان اعتبار:</span>
                <span className="text-xl font-bold">{formatCurrency(user.creditLimit)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary">وضعیت:</span>
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle size={16} />
                  فعال
                </span>
              </div>
              <Button className="w-full mt-4" onClick={() => setSuccessDialogOpen(false)}>
                درخواست افزایش اعتبار
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStepData.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-danger mr-1">*</span>}
                    </label>
                    <Input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                مرحله قبل
              </Button>
              <Button onClick={handleNextStep} disabled={isProcessing}>
                {isProcessing ? "در حال پردازش..." : 
                  currentStep === CREDIT_REQUEST_STEPS.length - 1 ? "ثبت درخواست" : "مرحله بعد"}
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="bg-secondary-light p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-medium mb-1">حفظ حریم خصوصی</h3>
              <p className="text-sm text-secondary">
                اطلاعات شما با استفاده از فناوری‌های پیشرفته رمزنگاری محافظت می‌شود و تنها برای بررسی
                صلاحیت اعتباری استفاده خواهد شد. هرگز اطلاعات شما در اختیار اشخاص ثالث قرار نخواهد گرفت.
              </p>
            </div>
          </div>
        </div>

        {/* دیالوگ موفقیت */}
        <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>درخواست شما با موفقیت ثبت شد</DialogTitle>
              <DialogDescription>
                اعتبار شما تأیید و فعال شد
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">اعتبار تخصیص داده شده:</h3>
                <p className="text-2xl font-bold text-primary mt-2">
                  {creditAmount ? formatCurrency(creditAmount) : ""}
                </p>
              </div>
              <p className="text-secondary text-sm">
                اکنون می‌توانید از این اعتبار برای خرید از فروشگاه‌های طرف قرارداد استفاده کنید.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={() => router.push("/stores")} className="w-full gap-2">
                مشاهده فروشگاه‌ها <ArrowRight size={16} />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSuccessDialogOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full"
              >
                بازگشت به داشبورد
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
} 