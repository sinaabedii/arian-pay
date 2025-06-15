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
  TrendingUp,
  AlertCircle,
  FileText,
  DollarSign,
  Calendar,
  Eye,
  ArrowDown,
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

const CREDIT_INCREASE_OPTIONS = [
  { value: 5000000, label: "5 میلیون تومان", recommended: false },
  { value: 10000000, label: "10 میلیون تومان", recommended: true },
  { value: 20000000, label: "20 میلیون تومان", recommended: false },
  { value: 50000000, label: "50 میلیون تومان", recommended: false },
];

const STATUS_CONFIG = {
  pending: {
    label: "در حال بررسی",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
  },
  approved: {
    label: "تأیید شده",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
  },
  rejected: {
    label: "رد شده",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: X,
  },
};

type CreditRequest = {
  id: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
  reviewDate?: string;
};

export default function CreditRequestPage() {
  const router = useRouter();
  const [user] = useState({ creditLimit: 15000000 });
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [creditAmount, setCreditAmount] = useState<number | null>(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // State برای پاپ‌آپ افزایش اعتبار
  const [creditIncreaseDialogOpen, setCreditIncreaseDialogOpen] =
    useState(false);
  const [selectedCreditAmount, setSelectedCreditAmount] = useState<
    number | null
  >(null);
  const [requestReason, setRequestReason] = useState("");
  const [isCreditIncreaseProcessing, setIsCreditIncreaseProcessing] =
    useState(false);
  const [creditIncreaseSuccess, setCreditIncreaseSuccess] = useState(false);

  // State برای لیست درخواست‌ها
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([
    {
      id: "1",
      amount: 20000000,
      reason: "خرید خودرو",
      status: "approved",
      requestDate: "1402/03/15",
      reviewDate: "1402/03/16",
    },
    {
      id: "2",
      amount: 10000000,
      reason: "خرید لوازم خانگی",
      status: "pending",
      requestDate: "1402/03/20",
    },
  ]);
  const [showAllRequests, setShowAllRequests] = useState(false);

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

  const handleCreditIncreaseRequest = () => {
    setCreditIncreaseDialogOpen(true);
  };

  const handleSubmitCreditIncrease = () => {
    if (!selectedCreditAmount || !requestReason.trim()) {
      alert("لطفاً مبلغ مورد نظر و دلیل درخواست را وارد کنید.");
      return;
    }

    setIsCreditIncreaseProcessing(true);

    setTimeout(() => {
      // اضافه کردن درخواست جدید به لیست
      const newRequest: CreditRequest = {
        id: Date.now().toString(),
        amount: selectedCreditAmount,
        reason: requestReason,
        status: "pending",
        requestDate: new Date().toLocaleDateString("fa-IR"),
      };

      setCreditRequests((prev) => [newRequest, ...prev]);
      setIsCreditIncreaseProcessing(false);
      setCreditIncreaseSuccess(true);

      setTimeout(() => {
        setCreditIncreaseSuccess(false);
        setCreditIncreaseDialogOpen(false);
        setSelectedCreditAmount(null);
        setRequestReason("");
      }, 2500);
    }, 2000);
  };

  const currentStepData = CREDIT_REQUEST_STEPS[currentStep];
  const displayedRequests = showAllRequests
    ? creditRequests
    : creditRequests.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 p-3 sm:p-4">
        <div className="text-center pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">
              درخواست اعتبار
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
            دریافت اعتبار
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {" "}
              سعید پی
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">
            اطلاعات خود را تکمیل کنید و اعتبار خود را دریافت نمایید
          </p>
        </div>

        {user.creditLimit ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>

            <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <div className="text-center sm:text-right">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                    اعتبار فعلی شما
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                    وضعیت اعتبار و جزئیات حساب
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      میزان اعتبار
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 block">
                    {formatCurrency(user.creditLimit)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      وضعیت
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm lg:text-base">
                      فعال و آماده استفاده
                    </span>
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 lg:py-4 rounded-xl text-xs sm:text-sm lg:text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
                onClick={handleCreditIncreaseRequest}
              >
                درخواست افزایش اعتبار
                <TrendingUp className="mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
                  پیشرفت درخواست
                </h3>
                <span className="text-xs sm:text-sm text-gray-500">
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
                      className={`w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-xl flex items-center justify-center mb-2 transition-all ${
                        index <= currentStep
                          ? `bg-gradient-to-br ${step.color} text-white shadow-md`
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <step.icon className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
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

              <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${currentStepData.color} rounded-xl flex items-center justify-center`}
                  >
                    <currentStepData.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="text-center sm:text-right">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                      {currentStepData.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {currentStepData.fields.map((field) => (
                    <div key={field.name} className="space-y-2 sm:space-y-3">
                      <label className="text-xs sm:text-sm font-medium flex items-center gap-2 text-gray-700">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-blue-600 rounded-full"></div>
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
                        className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 hover:bg-white transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl py-2 sm:py-3 order-2 sm:order-1 text-sm"
                  >
                    مرحله قبل
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 sm:py-3 px-4 sm:px-6 lg:px-8 font-medium shadow-sm hover:shadow-md transition-all duration-200 order-1 sm:order-2 text-sm"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                        <span className="text-xs sm:text-sm lg:text-base">
                          در حال پردازش...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs sm:text-sm lg:text-base">
                          {currentStep === CREDIT_REQUEST_STEPS.length - 1
                            ? "ثبت درخواست"
                            : "مرحله بعد"}
                        </span>
                        <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* لیست درخواست‌های افزایش اعتبار */}
        {creditRequests.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>

            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      درخواست‌های اعتبار
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      تاریخچه درخواست‌های افزایش اعتبار شما
                    </p>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {creditRequests.length} درخواست
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {displayedRequests.map((request) => {
                  const statusConfig = STATUS_CONFIG[request.status];
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={request.id}
                      className="border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-gray-900 text-sm sm:text-base">
                                {formatCurrency(request.amount)}
                              </span>
                            </div>

                            <div
                              className={`inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full border text-xs sm:text-sm font-medium ${statusConfig.color}`}
                            >
                              <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                              {statusConfig.label}
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm text-gray-600">
                            <span className="font-medium">دلیل:</span>{" "}
                            {request.reason}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>تاریخ درخواست: {request.requestDate}</span>
                            </div>
                            {request.reviewDate && (
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>تاریخ بررسی: {request.reviewDate}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {creditRequests.length > 3 && (
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllRequests(!showAllRequests)}
                    className="text-sm border-gray-300 hover:border-purple-600 hover:text-purple-600"
                  >
                    {showAllRequests ? (
                      <>
                        نمایش کمتر
                        <ArrowDown className="mr-2 h-4 w-4 rotate-180" />
                      </>
                    ) : (
                      <>
                        نمایش همه ({creditRequests.length - 3} درخواست دیگر)
                        <ArrowDown className="mr-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-200">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2 text-xs sm:text-sm lg:text-base">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                حفظ حریم خصوصی
              </h3>
              <p className="text-blue-700 leading-relaxed text-xs sm:text-sm lg:text-base">
                اطلاعات شما با استفاده از فناوری‌های پیشرفته رمزنگاری محافظت
                می‌شود و تنها برای بررسی صلاحیت اعتباری استفاده خواهد شد.
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">رمزنگاری بانکی</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">مجوز رسمی</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-blue-800">بررسی ۱۰ دقیقه‌ای</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* دیالوگ درخواست افزایش اعتبار */}
      {creditIncreaseDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      درخواست افزایش اعتبار
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      اعتبار فعلی: {formatCurrency(user.creditLimit)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCreditIncreaseDialogOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </button>
              </div>

              {!creditIncreaseSuccess ? (
                <div className="space-y-4 sm:space-y-6">
                  {/* انتخاب مبلغ */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      مبلغ افزایش اعتبار
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {CREDIT_INCREASE_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => setSelectedCreditAmount(option.value)}
                          className={`relative p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedCreditAmount === option.value
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-gray-900 text-sm sm:text-base">
                                {option.label}
                              </span>
                              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                اعتبار جدید:{" "}
                                {formatCurrency(
                                  user.creditLimit + option.value
                                )}
                              </div>
                            </div>
                            {option.recommended && (
                              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                پیشنهادی
                              </div>
                            )}
                          </div>
                          {selectedCreditAmount === option.value && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* دلیل درخواست */}
                  <div>
                    <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      دلیل درخواست افزایش اعتبار
                    </label>
                    <textarea
                      value={requestReason}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setRequestReason(e.target.value)
                      }
                      placeholder="مثلاً: نیاز به خرید لوازم خانگی، خرید خودرو، و غیره..."
                      className="w-full border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl p-3 resize-none text-sm"
                      rows={3}
                    />
                  </div>

                  {/* هشدار */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
                    <div className="flex gap-2 sm:gap-3">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900 mb-1 text-sm">
                          نکات مهم
                        </h4>
                        <ul className="text-xs sm:text-sm text-amber-800 space-y-1">
                          <li>• بررسی درخواست تا ۲۴ ساعت زمان می‌برد</li>
                          <li>
                            • افزایش اعتبار بر اساس تاریخچه پرداخت شما تعیین
                            می‌شود
                          </li>
                          <li>• ممکن است مدارک اضافی درخواست شود</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* دکمه‌ها */}
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <Button
                      onClick={handleSubmitCreditIncrease}
                      disabled={
                        !selectedCreditAmount ||
                        !requestReason.trim() ||
                        isCreditIncreaseProcessing
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 sm:py-3 text-sm"
                    >
                      {isCreditIncreaseProcessing ? (
                        <>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                          در حال بررسی...
                        </>
                      ) : (
                        <>
                          ثبت درخواست
                          <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCreditIncreaseDialogOpen(false)}
                      disabled={isCreditIncreaseProcessing}
                      className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600 py-2.5 sm:py-3 text-sm"
                    >
                      انصراف
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 sm:py-6 space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-green-600 mb-2">
                      درخواست با موفقیت ثبت شد
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
                      <p className="text-xs sm:text-sm text-blue-800 mb-2">
                        مبلغ درخواستی:
                      </p>
                      <p className="text-base sm:text-lg font-bold text-blue-900">
                        {selectedCreditAmount
                          ? formatCurrency(selectedCreditAmount)
                          : ""}
                      </p>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
                      درخواست شما در حال بررسی است. نتیجه تا ۲۴ ساعت آینده از
                      طریق پیامک و اپلیکیشن به اطلاع شما خواهد رسید.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* دیالوگ موفقیت درخواست اولیه */}
      {successDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm sm:max-w-md w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div></div>
                <button
                  onClick={() => setSuccessDialogOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  درخواست شما با موفقیت ثبت شد
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 lg:mb-8">
                  اعتبار شما تأیید و فعال شد
                </p>
              </div>

              <div className="py-3 sm:py-4 lg:py-6 text-center space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto relative z-10">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-green-600" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full blur-lg opacity-20"></div>
                </div>

                <div className="bg-blue-50 rounded-xl p-3 sm:p-4 lg:p-6 border border-blue-200">
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-blue-900 mb-2">
                    اعتبار تخصیص داده شده:
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {creditAmount ? formatCurrency(creditAmount) : ""}
                  </p>
                </div>

                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base px-2">
                  🎉 تبریک! اکنون می‌توانید از این اعتبار برای خرید از
                  فروشگاه‌های طرف قرارداد استفاده کنید.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Button
                  onClick={() => router.push("/stores")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 lg:py-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 text-xs sm:text-sm lg:text-base"
                >
                  مشاهده فروشگاه‌ها
                  <ArrowRight className="mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuccessDialogOpen(false);
                    router.push("/dashboard");
                  }}
                  className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base"
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
