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
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/app-layout";
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
import { AnimatedButton } from "@/components/ui/animated-button";

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
    cardHolderName: "امیرحسین محمدی",
    expiryDate: "1404/05",
    isDefault: true,
  },
  {
    id: "2",
    bank: "saman" as BankType,
    cardNumber: "6219861987654321",
    cardHolderName: "امیرحسین محمدی",
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
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold gradient-text">
            کیف پول و حساب‌های بانکی
          </h1>
          <p className="text-secondary mt-1">
            مدیریت کیف پول، افزودن حساب‌های بانکی و انجام تراکنش‌های مالی
          </p>
        </div>

        <Tabs
          defaultValue="wallet"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full justify-start">
            <TabsTrigger value="wallet" className="gap-2">
              <Wallet size={16} /> کیف پول
            </TabsTrigger>
            <TabsTrigger value="bank-cards" className="gap-2">
              <CreditCard size={16} /> کارت‌های بانکی
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover-float card-hover shadow-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      موجودی کیف پول
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text">
                      {formatCurrency(user.walletBalance)}
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <AnimatedButton
                        onClick={() => setIsDepositDialogOpen(true)}
                        className="flex-1 gap-2"
                        animation="scale"
                      >
                        <ArrowUp size={18} /> افزایش موجودی
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        className="flex-1 gap-2"
                        animation="float"
                      >
                        <Clock size={18} /> تاریخچه تراکنش‌ها
                      </AnimatedButton>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-float card-hover shadow-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ChevronsUpDown className="h-5 w-5 text-primary" />
                      انتقال وجه سریع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-sm text-white">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-sm text-secondary">
                            انتقال به
                          </span>
                          <div className="font-medium">حساب شخصی</div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <AnimatedButton
                          className="w-full gap-2"
                          animation="scale"
                        >
                          <Banknote size={18} /> انتقال وجه به حساب
                        </AnimatedButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">تراکنش‌های اخیر</h2>
                <div className="space-y-4">
                  {MOCK_TRANSACTIONS.map((transaction) => (
                    <Card
                      key={transaction.id}
                      className="hover-float card-hover shadow-card"
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "deposit"
                                ? "bg-success/10 text-success"
                                : "bg-danger/10 text-danger"
                            }`}
                          >
                            {transaction.type === "deposit" ? (
                              <ArrowUp size={16} />
                            ) : (
                              <CreditCard size={16} />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-secondary">
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-medium ${
                            transaction.type === "deposit"
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bank-cards">
            <div className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-start gap-3 text-blue-800">
                <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800">
                    راهنمای استفاده از کارت‌های بانکی
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    از این بخش می‌توانید کارت‌های بانکی خود را مدیریت کنید. برای
                    افزودن کارت جدید روی دکمه «افزودن کارت بانکی» کلیک کنید.
                    برای مشاهده اطلاعات کامل هر کارت، روی آن کلیک کنید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary-light mx-auto flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    هنوز کارت بانکی اضافه نکرده‌اید
                  </h3>
                  <p className="mt-2 text-secondary">
                    برای افزودن کارت بانکی جدید روی دکمه بالا کلیک کنید
                  </p>
                </div>
              )}

              {copySuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-success text-white rounded-md shadow-lg animate-fade-in flex items-center gap-2">
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

                {bankCards.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">کارت بانکی</label>
                    <div className="p-3 border border-border rounded-md flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundImage: `linear-gradient(to right, var(--primary-500), var(--primary-600))`,
                        }}
                      >
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {bankCards
                            .find((card) => card.isDefault)
                            ?.cardNumber.slice(0, 4) +
                            " •••• •••• " +
                            bankCards
                              .find((card) => card.isDefault)
                              ?.cardNumber.slice(-4)}
                        </div>
                        <div className="text-xs text-secondary">
                          {
                            bankCards.find((card) => card.isDefault)
                              ?.cardHolderName
                          }
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isProcessing}
                    className="w-full"
                  >
                    {isProcessing
                      ? "در حال پردازش..."
                      : "پرداخت و افزایش موجودی"}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-success">
                    پرداخت با موفقیت انجام شد
                  </h3>
                  <p className="text-secondary mt-1">
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
    </AppLayout>
  );
}
