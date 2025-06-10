"use client";

import { useState } from "react";
import { 
  CreditCard, 
  Plus, 
  Wallet, 
  BarChart3, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Copy,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// نمونه داده برای تراکنش‌ها
const MOCK_TRANSACTIONS = [
  { id: "1", title: "خرید از دیجی کالا", amount: 2500000, type: "expense", date: "1402/08/15", time: "14:35", iconBg: "bg-blue-100 text-blue-600", icon: <CreditCard size={14} /> },
  { id: "2", title: "شارژ کیف پول", amount: 5000000, type: "income", date: "1402/08/10", time: "09:20", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
  { id: "3", title: "پرداخت قسط", amount: 1500000, type: "expense", date: "1402/08/05", time: "11:15", iconBg: "bg-amber-100 text-amber-600", icon: <BarChart3 size={14} /> },
  { id: "4", title: "خرید از فروشگاه ایرانی", amount: 750000, type: "expense", date: "1402/08/01", time: "16:45", iconBg: "bg-blue-100 text-blue-600", icon: <CreditCard size={14} /> },
  { id: "5", title: "شارژ کیف پول", amount: 3000000, type: "income", date: "1402/07/25", time: "10:30", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
];

// نمونه داده برای کارت‌های بانکی
const MOCK_BANK_CARDS = [
  {
    id: "1",
    bank: "mellat",
    cardNumber: "6104337812345678",
    cardHolderName: "امیرحسین محمدی",
    expiryDate: "1404/05",
    isDefault: true,
  },
  {
    id: "2",
    bank: "melli",
    cardNumber: "6037991234567890",
    cardHolderName: "امیرحسین محمدی",
    expiryDate: "1405/03",
    isDefault: false,
  },
];

export default function WalletPage() {
  const [chargeAmount, setChargeAmount] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string>(MOCK_BANK_CARDS[0].id);
  const [expandedMonth, setExpandedMonth] = useState<string>("current");
  const { toast } = useToast();
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };
  
  // مدیریت کپی شماره کارت
  const handleCopyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber);
    toast({
      title: "کپی شد!",
      description: "شماره کارت با موفقیت کپی شد.",
      duration: 3000,
    });
  };
  
  // گروه‌بندی تراکنش‌ها بر اساس ماه
  const groupTransactionsByMonth = () => {
    const currentMonth = MOCK_TRANSACTIONS.filter(t => t.date.includes("1402/08"));
    const previousMonth = MOCK_TRANSACTIONS.filter(t => t.date.includes("1402/07"));
    
    return {
      current: currentMonth,
      previous: previousMonth,
    };
  };
  
  const transactionsByMonth = groupTransactionsByMonth();
  
  // محاسبه موجودی کیف پول
  const calculateWalletBalance = () => {
    return MOCK_TRANSACTIONS.reduce((total, transaction) => {
      if (transaction.type === "income") {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
  };
  
  const walletBalance = calculateWalletBalance();
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">کیف پول</h1>
        <p className="text-gray-600 mt-1">مدیریت کیف پول و کارت‌های بانکی</p>
      </div>
      
      {/* بخش موجودی و شارژ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* کارت موجودی */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl lg:col-span-1">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Wallet className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-lg font-medium text-gray-700 mb-1">موجودی کیف پول</h2>
              <p className="text-3xl font-bold text-gray-900 mb-4">{formatCurrency(walletBalance)}</p>
              
              <div className="w-full flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open("/dashboard/qr-payment", "_self")}
                >
                  پرداخت
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">شارژ کیف پول</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* کارت شارژ کیف پول */}
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl lg:col-span-2">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              شارژ کیف پول
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
                  <Input 
                    type="text" 
                    placeholder="مثال: 500,000" 
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">کارت بانکی</label>
                  <div className="space-y-2">
                    {MOCK_BANK_CARDS.map((card) => (
                      <div 
                        key={card.id}
                        className={`p-3 rounded-lg border ${
                          selectedCard === card.id 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } cursor-pointer transition-colors`}
                        onClick={() => setSelectedCard(card.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900">
                                {card.bank === 'mellat' ? 'بانک ملت' : 'بانک ملی'}
                              </p>
                              {card.isDefault && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  پیش‌فرض
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-sm text-gray-600 font-mono tracking-wider">
                                {card.cardNumber.slice(0, 4)}-****-****-{card.cardNumber.slice(-4)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">پرداخت و شارژ کیف پول</Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-3">مبالغ پیشنهادی</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[500000, 1000000, 2000000, 5000000].map((amount) => (
                    <div 
                      key={amount}
                      className="p-2 bg-white rounded border border-gray-200 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      onClick={() => setChargeAmount(amount.toLocaleString())}
                    >
                      {formatCurrency(amount)}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">مزایای شارژ کیف پول</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      پرداخت سریع بدون نیاز به رمز پویا
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      امکان استفاده از تخفیف‌های ویژه
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      دریافت جایزه برای شارژهای بالای 1 میلیون تومان
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* کارت‌های بانکی و تراکنش‌ها */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">تراکنش‌ها</TabsTrigger>
          <TabsTrigger value="cards">کارت‌های بانکی</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                تاریخچه تراکنش‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* تراکنش‌های ماه جاری */}
                <div>
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => setExpandedMonth(expandedMonth === 'current' ? '' : 'current')}
                  >
                    <h3 className="font-medium text-gray-900">آبان ۱۴۰۲</h3>
                    <Button variant="ghost" size="sm" className="p-1">
                      {expandedMonth === 'current' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                  </div>
                  
                  {expandedMonth === 'current' && (
                    <div className="space-y-4">
                      {transactionsByMonth.current.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center`}>
                              {transaction.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{transaction.title}</div>
                              <div className="text-xs text-gray-500">
                                {transaction.date} - {transaction.time}
                              </div>
                            </div>
                          </div>
                          <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount).split(" ")[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* تراکنش‌های ماه قبل */}
                <div>
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-4"
                    onClick={() => setExpandedMonth(expandedMonth === 'previous' ? '' : 'previous')}
                  >
                    <h3 className="font-medium text-gray-900">مهر ۱۴۰۲</h3>
                    <Button variant="ghost" size="sm" className="p-1">
                      {expandedMonth === 'previous' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </Button>
                  </div>
                  
                  {expandedMonth === 'previous' && (
                    <div className="space-y-4">
                      {transactionsByMonth.previous.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center`}>
                              {transaction.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{transaction.title}</div>
                              <div className="text-xs text-gray-500">
                                {transaction.date} - {transaction.time}
                              </div>
                            </div>
                          </div>
                          <div className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                            {transaction.type === 'income' ? '+' : '-'}
                            {formatCurrency(transaction.amount).split(" ")[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cards">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                کارت‌های بانکی
              </CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-1" size="sm">
                <Plus size={16} />
                افزودن کارت جدید
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_BANK_CARDS.map((card) => (
                  <div 
                    key={card.id} 
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-medium text-gray-900">
                        {card.bank === 'mellat' ? 'بانک ملت' : 'بانک ملی'}
                      </div>
                      {card.isDefault ? (
                        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          پیش‌فرض
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          تنظیم به عنوان پیش‌فرض
                        </Button>
                      )}
                    </div>
                    
                    <div className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white shadow-md relative overflow-hidden mb-4">
                      <div className="absolute top-0 right-0 w-full h-full opacity-10">
                        <div className="absolute transform rotate-45 translate-x-1/2 -translate-y-1/2 right-0 top-0 w-40 h-40 bg-white rounded-full"></div>
                        <div className="absolute transform rotate-45 translate-x-1/3 translate-y-1/3 right-0 bottom-0 w-40 h-40 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="flex justify-between text-xl font-mono tracking-wider mb-6">
                        <span>{card.cardNumber.slice(0, 4)}</span>
                        <span>{card.cardNumber.slice(4, 8)}</span>
                        <span>{card.cardNumber.slice(8, 12)}</span>
                        <span>{card.cardNumber.slice(12, 16)}</span>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs text-white/70">دارنده کارت</div>
                          <div>{card.cardHolderName}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/70">انقضا</div>
                          <div>{card.expiryDate}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">شماره کارت:</div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{card.cardNumber}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleCopyCardNumber(card.cardNumber)}
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1 text-sm">ویرایش</Button>
                      <Button variant="destructive" className="flex-1 text-sm">حذف</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 