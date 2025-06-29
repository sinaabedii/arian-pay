"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  CreditCard,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Banknote,
  User,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BankCard,
  BankType,
  AddBankCardButton,
} from "@/components/ui/bank-card";
import { AddBankCard, BankCardFormData } from "@/components/ui/add-bank-card";

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

const MOCK_BANK_CARDS = [
  {
    id: "1",
    bank: "mellat" as BankType,
    cardNumber: "6104337812345678",
    accountNumber: "12345678901",
    sheba: "123456789012345678901234",
    cardHolderName: "سینا عابدی",
    expiryDate: "1404/05",
    isDefault: true,
  },
  {
    id: "2",
    bank: "saman" as BankType,
    cardNumber: "6219861987654321",
    cardHolderName: "سینا عابدی",
    expiryDate: "1403/12",
    isDefault: false,
  },
];

type BankCardType = {
  id: string;
  bank: BankType;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  isDefault: boolean;
  accountNumber?: string;
  sheba?: string;
};

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDepositSuccess, setIsDepositSuccess] = useState(false);
  const [bankCards, setBankCards] = useState<BankCardType[]>(
    MOCK_BANK_CARDS as BankCardType[]
  );
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("wallet");
  const [copySuccess, setCopySuccess] = useState<{
    text: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  const handleDeposit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDepositSuccess(true);
      setTimeout(() => {
        setIsDepositSuccess(false);
        setIsDepositDialogOpen(false);
        setDepositAmount("");
      }, 2000);
    }, 1500);
  };

  const handleDeleteCard = (id: string) => {
    setBankCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleSetDefaultCard = (id: string) => {
    setBankCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const handleAddCard = (data: BankCardFormData) => {
    const newCard: BankCardType = {
      id: `${bankCards.length + 1}`,
      bank: data.bank,
      cardNumber: data.cardNumber,
      cardHolderName: data.cardHolderName,
      expiryDate: data.expiryDate || "",
      isDefault: bankCards.length === 0,
      ...(data.accountNumber ? { accountNumber: data.accountNumber } : {}),
      ...(data.sheba ? { sheba: data.sheba } : {}),
    };

    setBankCards((prev) => [...prev, newCard]);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess({ text, type });

    setTimeout(() => {
      setCopySuccess(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            کیف پول و حساب‌های بانکی
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            مدیریت کیف پول، افزودن حساب‌های بانکی و انجام تراکنش‌های مالی
          </p>
        </div>

        <Tabs
          defaultValue="wallet"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="wallet"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
            >
              <Wallet className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">کیف پول</span>
              <span className="sm:hidden">کیف پول</span>
            </TabsTrigger>
            <TabsTrigger
              value="bank-cards"
              className="flex-1 text-gray-600 font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">کارت‌های بانکی</span>
              <span className="sm:hidden">کارت‌ها</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="mt-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      خلاصه کیف پول
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Wallet className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            موجودی کیف پول
                          </h4>
                          <p className="text-sm text-gray-500">
                            موجودی فعلی شما
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        {formatCurrency(user.walletBalance)}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={() => setIsDepositDialogOpen(true)}
                          className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                          <ArrowUp size={18} />
                          <span className="hidden sm:inline">
                            افزایش موجودی
                          </span>
                          <span className="sm:hidden">شارژ</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 gap-2 border-gray-300 hover:border-blue-600 hover:text-blue-600"
                        >
                          <Clock size={18} />
                          <span className="hidden sm:inline">
                            تاریخچه تراکنش‌ها
                          </span>
                          <span className="sm:hidden">تاریخچه</span>
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <ChevronsUpDown className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            انتقال وجه سریع
                          </h4>
                          <p className="text-sm text-gray-500">
                            انتقال به حساب شخصی
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">
                            انتقال به
                          </span>
                          <div className="font-medium text-gray-900">
                            حساب شخصی
                          </div>
                        </div>
                      </div>
                      <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <Banknote size={18} />
                        انتقال وجه به حساب
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  تراکنش‌های اخیر
                </h2>
                <div className="space-y-4">
                  {MOCK_TRANSACTIONS.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`h-1 bg-gradient-to-r ${
                          transaction.type === "deposit"
                            ? "from-green-400 to-green-600"
                            : "from-red-400 to-red-600"
                        }`}
                      ></div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              transaction.type === "deposit"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <ArrowUp size={20} />
                            ) : (
                              <CreditCard size={20} />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-medium text-lg ${
                            transaction.type === "deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bank-cards" className="mt-6">
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900">
                      راهنمای استفاده از کارت‌های بانکی
                    </h3>
                    <p className="text-sm text-blue-700 mt-1">
                      از این بخش می‌توانید کارت‌های بانکی خود را مدیریت کنید.
                      برای افزودن کارت جدید روی دکمه «افزودن کارت بانکی» کلیک
                      کنید. برای مشاهده اطلاعات کامل هر کارت، روی آن کلیک کنید.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {bankCards.map((card) => (
                  <BankCard
                    key={card.id}
                    {...card}
                    onDelete={handleDeleteCard}
                    onSetDefault={handleSetDefaultCard}
                    onCopy={handleCopy}
                  />
                ))}

                <AddBankCardButton
                  onClick={() => setIsAddCardDialogOpen(true)}
                />
              </div>

              {bankCards.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    هنوز کارت بانکی اضافه نکرده‌اید
                  </h3>
                  <p className="text-gray-600 mt-1">
                    برای افزودن کارت بانکی جدید روی دکمه بالا کلیک کنید
                  </p>
                </div>
              )}

              {copySuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-600 text-white rounded-xl shadow-lg flex items-center gap-2 z-50">
                  <Check size={16} />
                  <span>
                    {copySuccess.type === "card" && "شماره کارت "}
                    {copySuccess.type === "sheba" && "شماره شبا "}
                    {copySuccess.type === "account" && "شماره حساب "}
                    کپی شد
                  </span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={isDepositDialogOpen}
          onOpenChange={setIsDepositDialogOpen}
        >
          <DialogContent className="rounded-2xl max-w-sm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                افزایش موجودی کیف پول
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                مبلغ مورد نظر برای شارژ کیف پول را وارد کنید
              </DialogDescription>
            </DialogHeader>

            {!isDepositSuccess ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    مبلغ (تومان)
                  </label>
                  <Input
                    type="number"
                    placeholder="مثال: 1,000,000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    disabled={isProcessing}
                    className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
                  />
                </div>

                {bankCards.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">
                      کارت بانکی
                    </label>
                    <div className="p-3 border border-gray-300 rounded-xl flex items-center gap-3 bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {bankCards
                            .find((card) => card.isDefault)
                            ?.cardNumber.slice(0, 4) +
                            " •••• •••• " +
                            bankCards
                              .find((card) => card.isDefault)
                              ?.cardNumber.slice(-4)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {
                            bankCards.find((card) => card.isDefault)
                              ?.cardHolderName
                          }
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isProcessing
                      ? "در حال پردازش..."
                      : "پرداخت و افزایش موجودی"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDepositDialogOpen(false)}
                    disabled={isProcessing}
                    className="w-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
                  >
                    انصراف
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600">
                    پرداخت با موفقیت انجام شد
                  </h3>
                  <p className="text-gray-600 mt-1">
                    موجودی کیف پول شما افزایش یافت
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AddBankCard
          open={isAddCardDialogOpen}
          onOpenChange={setIsAddCardDialogOpen}
          onSubmit={handleAddCard}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}
