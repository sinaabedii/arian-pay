"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  Wallet,
  BarChart3,
  CalendarIcon,
  FilterIcon,
  SearchIcon,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ShoppingBag,
  Calendar
} from "lucide-react";
import { useRouter } from "next/navigation";

// نمونه داده برای تراکنش‌ها
const MOCK_TRANSACTIONS = [
  { id: "1", title: "خرید از دیجی کالا", amount: 2500000, type: "expense", date: "1402/08/15", time: "14:35", category: "خرید", iconBg: "bg-blue-100 text-blue-600", icon: <ShoppingBag size={14} /> },
  { id: "2", title: "شارژ کیف پول", amount: 5000000, type: "income", date: "1402/08/10", time: "09:20", category: "شارژ کیف پول", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
  { id: "3", title: "پرداخت قسط", amount: 1500000, type: "expense", date: "1402/08/05", time: "11:15", category: "اقساط", iconBg: "bg-amber-100 text-amber-600", icon: <Calendar size={14} /> },
  { id: "4", title: "خرید از فروشگاه ایرانی", amount: 750000, type: "expense", date: "1402/08/01", time: "16:45", category: "خرید", iconBg: "bg-blue-100 text-blue-600", icon: <ShoppingBag size={14} /> },
  { id: "5", title: "شارژ کیف پول", amount: 3000000, type: "income", date: "1402/07/25", time: "10:30", category: "شارژ کیف پول", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
  { id: "6", title: "خرید از فروشگاه آنلاین", amount: 1200000, type: "expense", date: "1402/07/20", time: "18:15", category: "خرید", iconBg: "bg-blue-100 text-blue-600", icon: <ShoppingBag size={14} /> },
  { id: "7", title: "پرداخت قسط", amount: 1500000, type: "expense", date: "1402/07/05", time: "11:30", category: "اقساط", iconBg: "bg-amber-100 text-amber-600", icon: <Calendar size={14} /> },
  { id: "8", title: "برداشت از کیف پول", amount: 2000000, type: "expense", date: "1402/06/28", time: "14:20", category: "برداشت", iconBg: "bg-red-100 text-red-600", icon: <Wallet size={14} /> },
  { id: "9", title: "شارژ کیف پول", amount: 10000000, type: "income", date: "1402/06/15", time: "09:45", category: "شارژ کیف پول", iconBg: "bg-green-100 text-green-600", icon: <Wallet size={14} /> },
  { id: "10", title: "خرید از سوپرمارکت آنلاین", amount: 850000, type: "expense", date: "1402/06/10", time: "16:30", category: "خرید", iconBg: "bg-blue-100 text-blue-600", icon: <ShoppingBag size={14} /> },
];

// دسته‌بندی‌های تراکنش
const TRANSACTION_CATEGORIES = [
  "همه",
  "خرید",
  "شارژ کیف پول",
  "برداشت",
  "اقساط",
];

// بازه‌های زمانی
const TIME_PERIODS = [
  "همه",
  "30 روز گذشته",
  "3 ماه گذشته",
  "6 ماه گذشته",
  "1 سال گذشته",
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("همه");
  const [selectedTransactionType, setSelectedTransactionType] = useState<string>("همه");
  const router = useRouter();
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };
  
  // فیلتر تراکنش‌ها بر اساس معیارهای جستجو
  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    // فیلتر بر اساس متن جستجو
    const matchesSearch = searchQuery === "" || 
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // فیلتر بر اساس دسته‌بندی
    const matchesCategory = selectedCategory === "همه" || 
      transaction.category === selectedCategory;
    
    // فیلتر بر اساس نوع تراکنش
    const matchesType = selectedTransactionType === "همه" || 
      (selectedTransactionType === "دریافتی" && transaction.type === "income") ||
      (selectedTransactionType === "پرداختی" && transaction.type === "expense");
    
    // می‌توان فیلتر بر اساس بازه زمانی را نیز اضافه کرد
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  // گروه‌بندی تراکنش‌ها بر اساس ماه
  const groupTransactionsByMonth = () => {
    const groups: { [key: string]: typeof MOCK_TRANSACTIONS } = {};
    
    filteredTransactions.forEach(transaction => {
      const [year, month] = transaction.date.split('/');
      const key = `${year}/${month}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      
      groups[key].push(transaction);
    });
    
    return groups;
  };
  
  const transactionsByMonth = groupTransactionsByMonth();
  
  // محاسبه جمع دریافتی‌ها و پرداختی‌ها
  const calculateTotals = () => {
    const income = filteredTransactions
      .filter(t => t.type === "income")
      .reduce((total, t) => total + t.amount, 0);
      
    const expense = filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((total, t) => total + t.amount, 0);
      
    return { income, expense, balance: income - expense };
  };
  
  const totals = calculateTotals();
  
  // تبدیل کلید ماه به نام فارسی ماه
  const getPersianMonthName = (monthKey: string) => {
    const [year, month] = monthKey.split('/');
    
    const persianMonths: { [key: string]: string } = {
      '01': 'فروردین',
      '02': 'اردیبهشت',
      '03': 'خرداد',
      '04': 'تیر',
      '05': 'مرداد',
      '06': 'شهریور',
      '07': 'مهر',
      '08': 'آبان',
      '09': 'آذر',
      '10': 'دی',
      '11': 'بهمن',
      '12': 'اسفند',
    };
    
    return `${persianMonths[month]} ${year}`;
  };
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">تاریخچه تراکنش‌ها</h1>
        <p className="text-gray-600 mt-1">مشاهده و مدیریت تراکنش‌های کیف پول</p>
      </div>
      
      {/* کارت‌های اطلاعات کلی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">مجموع دریافتی‌ها</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(totals.income)}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-red-400 to-red-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">مجموع پرداختی‌ها</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(totals.expense)}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">موجودی کیف پول</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(totals.balance)}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* جستجو و فیلتر */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="جستجو در تراکنش‌ها..." 
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {TRANSACTION_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {TIME_PERIODS.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  value={selectedTransactionType}
                  onChange={(e) => setSelectedTransactionType(e.target.value)}
                >
                  <option value="همه">همه تراکنش‌ها</option>
                  <option value="دریافتی">دریافتی‌ها</option>
                  <option value="پرداختی">پرداختی‌ها</option>
                </select>
                <ChevronDown className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              {filteredTransactions.length} تراکنش یافت شد
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-1 text-sm">
                <Download className="h-4 w-4" />
                دریافت گزارش
              </Button>
              <Button 
                className="gap-1 text-sm bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/dashboard/wallet")}
              >
                <Wallet className="h-4 w-4" />
                مدیریت کیف پول
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* لیست تراکنش‌ها */}
      <div className="space-y-6">
        {Object.keys(transactionsByMonth).length > 0 ? (
          Object.keys(transactionsByMonth)
            .sort((a, b) => b.localeCompare(a)) // مرتب‌سازی معکوس بر اساس تاریخ
            .map(monthKey => (
              <Card key={monthKey} className="border-0 shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    {getPersianMonthName(monthKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {transactionsByMonth[monthKey].map((transaction) => (
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
                </CardContent>
              </Card>
            ))
        ) : (
          <div className="py-12 text-center bg-white rounded-xl border border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ تراکنشی یافت نشد</h3>
            <p className="text-gray-500">
              با تغییر معیارهای جستجو، تراکنش‌های بیشتری را مشاهده کنید.
            </p>
            <Button
              variant="outline"
              className="mt-4 gap-1"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("همه");
                setSelectedPeriod("همه");
                setSelectedTransactionType("همه");
              }}
            >
              <FilterIcon className="h-4 w-4" />
              حذف فیلترها
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 