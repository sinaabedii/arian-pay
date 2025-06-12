"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  User,
  Briefcase,
  Banknote,
  Shield,
  Award,
  Lock,
  Star,
  Clock,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CREDIT_REQUEST_STEPS = [
  {
    id: "personal-info",
    title: "اطلاعات شخصی",
    description: "اطلاعات شخصی خود را تکمیل کنید",
    icon: User,
    color: "from-blue-500 to-blue-600",
    fields: [
      { name: "nationalId", label: "کد ملی", type: "text", required: true },
      {
        name: "birthDate",
        label: "تاریخ تولد",
        type: "text",
        required: true,
        placeholder: "مثال: 1370/06/15",
      },
      { name: "address", label: "آدرس", type: "text", required: true },
      { name: "postalCode", label: "کد پستی", type: "text", required: true },
    ],
  },
  {
    id: "job-info",
    title: "اطلاعات شغلی",
    description: "اطلاعات شغلی و درآمد خود را وارد کنید",
    icon: Briefcase,
    color: "from-green-500 to-green-600",
    fields: [
      { name: "job", label: "شغل", type: "text", required: true },
      {
        name: "income",
        label: "درآمد ماهیانه (تومان)",
        type: "number",
        required: true,
      },
      {
        name: "jobAddress",
        label: "آدرس محل کار",
        type: "text",
        required: true,
      },
      {
        name: "jobDuration",
        label: "مدت اشتغال (سال)",
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "bank-info",
    title: "اطلاعات بانکی",
    description: "اطلاعات حساب بانکی خود را وارد کنید",
    icon: Banknote,
    color: "from-purple-500 to-purple-600",
    fields: [
      {
        name: "accountNumber",
        label: "شماره حساب",
        type: "text",
        required: true,
      },
      { name: "cardNumber", label: "شماره کارت", type: "text", required: true },
      { name: "bankName", label: "نام بانک", type: "text", required: true },
      {
        name: "sheba",
        label: "شماره شبا (بدون IR)",
        type: "text",
        required: true,
      },
    ],
  },
];

export default function CreditRequestPage() {
  const router = useRouter();
  const [user] = useState({ creditLimit: 15000000 });
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditAmount, setCreditAmount] = useState<number | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

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
      (field) =>
        !field.required ||
        (formData[field.name] && formData[field.name].trim() !== "")
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

    setTimeout(() => {
      setIsProcessing(false);
      const approvedCreditAmount = 15000000;
      setCreditAmount(approvedCreditAmount);
      setSuccessDialogOpen(true);
    }, 2000);
  };

  const currentStepData = CREDIT_REQUEST_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
            <CreditCard className="h-4 w-4" />
            <span className="text-sm font-medium">درخواست اعتبار</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            دریافت اعتبار
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              سعید پی
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            اطلاعات خود را تکمیل کنید و اعتبار خود را دریافت نمایید
          </p>
        </div>

        {user.creditLimit ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    اعتبار فعلی شما
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    وضعیت اعتبار و جزئیات حساب
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      میزان اعتبار
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    {formatCurrency(user.creditLimit)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 lg:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-700">
                      وضعیت
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      فعال و آماده استفاده
                    </span>
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => setSuccessDialogOpen(false)}
              >
                درخواست افزایش اعتبار
                <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  پیشرفت درخواست
                </h3>
                <span className="text-sm text-gray-500">
                  مرحله {currentStep + 1} از {CREDIT_REQUEST_STEPS.length}
                </span>
              </div>

              <div className="hidden sm:flex items-center justify-between">
                {CREDIT_REQUEST_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-2 transition-all ${
                        index <= currentStep
                          ? `bg-gradient-to-br ${step.color} text-white shadow-md`
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                    </div>
                    <span
                      className={`text-xs lg:text-sm font-medium text-center ${
                        index <= currentStep ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < CREDIT_REQUEST_STEPS.length - 1 && (
                      <div
                        className={`w-full h-0.5 mt-4 ${
                          index < currentStep ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="sm:hidden">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${currentStepData.color} text-white`}
                  >
                    <currentStepData.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {currentStepData.title}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentStep + 1) / CREDIT_REQUEST_STEPS.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className={`h-1 bg-gradient-to-r ${currentStepData.color}`}
              ></div>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${currentStepData.color} rounded-xl flex items-center justify-center`}
                  >
                    <currentStepData.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {currentStepData.title}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {currentStepData.fields.map((field) => (
                    <div key={field.name} className="space-y-3">
                      <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <Input
                        name={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 bg-gray-50 hover:bg-white transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl py-3 order-2 sm:order-1"
                  >
                    مرحله قبل
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-6 sm:px-8 font-medium shadow-sm hover:shadow-md transition-all duration-200 order-1 sm:order-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                        <span className="text-sm sm:text-base">
                          در حال پردازش...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm sm:text-base">
                          {currentStep === CREDIT_REQUEST_STEPS.length - 1
                            ? "ثبت درخواست"
                            : "مرحله بعد"}
                        </span>
                        <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                <Shield className="h-4 w-4" />
                حفظ حریم خصوصی
              </h3>
              <p className="text-blue-700 leading-relaxed text-sm sm:text-base">
                اطلاعات شما با استفاده از فناوری‌های پیشرفته رمزنگاری محافظت
                می‌شود و تنها برای بررسی صلاحیت اعتباری استفاده خواهد شد.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">رمزنگاری بانکی</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">مجوز رسمی</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">بررسی ۱۰ دقیقه‌ای</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {successDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div></div>
                <button
                  onClick={() => setSuccessDialogOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  درخواست شما با موفقیت ثبت شد
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
                  اعتبار شما تأیید و فعال شد
                </p>
              </div>

              <div className="py-4 sm:py-6 text-center space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full blur-lg opacity-20"></div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">
                    اعتبار تخصیص داده شده:
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {creditAmount ? formatCurrency(creditAmount) : ""}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                  🎉 تبریک! اکنون می‌توانید از این اعتبار برای خرید از
                  فروشگاه‌های طرف قرارداد استفاده کنید.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/stores")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
                >
                  مشاهده فروشگاه‌ها
                  <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccessDialogOpen(false);
                    router.push("/dashboard");
                  }}
                  className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl py-3 sm:py-4 text-sm sm:text-base"
                >
                  بازگشت به داشبورد
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
