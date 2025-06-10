"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Download, Filter, Search, ArrowDownRight, ArrowUpRight, Calendar, CreditCard, ShoppingBag, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";

// تعریف اینترفیس برای ساختار تراکنش‌ها
interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income" | "credit";
  category: string;
  date: string;
  time: string;
  status: string;
  iconBg: string;
  icon: React.ReactNode;
  merchant: string;
  description: string;
  reference: string;
}

// نمونه داده‌های تراکنش
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tr-1001",
    title: "خرید از دیجی کالا",
    amount: 2500000,
    type: "expense",
    category: "خرید",
    date: "1402/06/15",
    time: "14:30",
    status: "completed",
    iconBg: "bg-primary-light",
    icon: <ShoppingBag size={14} />,
    merchant: "دیجی کالا",
    description: "خرید لپ تاپ اقساطی",
    reference: "DKC-87654321",
  },
  {
    id: "tr-1002",
    title: "شارژ کیف پول",
    amount: 5000000,
    type: "income",
    category: "شارژ",
    date: "1402/06/10",
    time: "10:15",
    status: "completed",
    iconBg: "bg-success-light",
    icon: <Wallet size={14} />,
    merchant: "بانک ملت",
    description: "انتقال از حساب بانکی",
    reference: "MB-12345678",
  },
  {
    id: "tr-1003",
    title: "پرداخت قسط",
    amount: 1500000,
    type: "expense",
    category: "قسط",
    date: "1402/06/05",
    time: "09:45",
    status: "completed",
    iconBg: "bg-accent-light",
    icon: <Calendar size={14} />,
    merchant: "سعید پی ",
    description: "پرداخت قسط ماه شهریور",
    reference: "INS-43219876",
  },
  {
    id: "tr-1004",
    title: "خرید از فروشگاه ایران‌مال",
    amount: 1800000,
    type: "expense",
    category: "خرید",
    date: "1402/06/01",
    time: "16:20",
    status: "completed",
    iconBg: "bg-primary-light",
    icon: <ShoppingBag size={14} />,
    merchant: "ایران‌مال",
    description: "خرید لوازم خانگی",
    reference: "IRM-87654322",
  },
  {
    id: "tr-1005",
    title: "افزایش اعتبار",
    amount: 10000000,
    type: "credit",
    category: "اعتبار",
    date: "1402/05/25",
    time: "11:30",
    status: "completed",
    iconBg: "bg-warning-light",
    icon: <CreditCard size={14} />,
    merchant: "سعید پی ",
    description: "افزایش اعتبار پس از بررسی درخواست",
    reference: "CR-98765432",
  },
];

// انواع فیلترهای موجود
const FILTER_OPTIONS = {
  type: [
    { label: "همه", value: "all" },
    { label: "دریافتی", value: "income" },
    { label: "پرداختی", value: "expense" },
    { label: "اعتبار", value: "credit" },
  ],
  category: [
    { label: "همه", value: "all" },
    { label: "خرید", value: "خرید" },
    { label: "شارژ", value: "شارژ" },
    { label: "قسط", value: "قسط" },
    { label: "اعتبار", value: "اعتبار" },
  ],
  timeRange: [
    { label: "همه", value: "all" },
    { label: "امروز", value: "today" },
    { label: "هفته اخیر", value: "week" },
    { label: "ماه اخیر", value: "month" },
    { label: "سه ماه اخیر", value: "quarter" },
  ],
};

export default function TransactionsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    timeRange: "all",
  });
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // فیلتر کردن تراکنش‌ها بر اساس جستجو و فیلترهای انتخاب شده
  useEffect(() => {
    let result = [...MOCK_TRANSACTIONS];

    // فیلتر بر اساس نوع
    if (filters.type !== "all") {
      result = result.filter(transaction => transaction.type === filters.type);
    }

    // فیلتر بر اساس دسته‌بندی
    if (filters.category !== "all") {
      result = result.filter(transaction => transaction.category === filters.category);
    }

    // فیلتر بر اساس جستجو
    if (searchQuery) {
      result = result.filter(
        transaction =>
          transaction.title.includes(searchQuery) ||
          transaction.merchant.includes(searchQuery) ||
          transaction.reference.includes(searchQuery)
      );
    }

    // فیلتر بر اساس تب فعال
    if (activeTab !== "all") {
      result = result.filter(transaction => transaction.type === activeTab);
    }

    setFilteredTransactions(result);
  }, [searchQuery, filters, activeTab]);

  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  // نمایش جزئیات تراکنش
  const showTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">تاریخچه تراکنش‌ها</h1>
            <p className="text-secondary mt-1">مشاهده و مدیریت تمامی تراکنش‌های شما</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download size={16} />
              دریافت گزارش
            </Button>
          </div>
        </div>

        {/* فیلترها و جستجو */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-secondary" />
            <Input
              type="text"
              placeholder="جستجو در تراکنش‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
          
          <div className="flex gap-2">
            <FilterDropdown 
              title="نوع تراکنش" 
              options={FILTER_OPTIONS.type} 
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            />
            <FilterDropdown 
              title="دسته‌بندی" 
              options={FILTER_OPTIONS.category} 
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
            />
            <FilterDropdown 
              title="بازه زمانی" 
              options={FILTER_OPTIONS.timeRange} 
              value={filters.timeRange}
              onChange={(value) => setFilters({ ...filters, timeRange: value })}
            />
          </div>
        </div>

        {/* تب‌ها */}
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              همه تراکنش‌ها
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-1">
              <ArrowDownRight className="h-4 w-4 text-success mr-1" />
              دریافتی‌ها
            </TabsTrigger>
            <TabsTrigger value="expense" className="flex-1">
              <ArrowUpRight className="h-4 w-4 text-danger mr-1" />
              پرداختی‌ها
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <TransactionsList 
              transactions={filteredTransactions} 
              formatCurrency={formatCurrency} 
              onSelect={showTransactionDetails}
            />
          </TabsContent>
          
          <TabsContent value="income" className="mt-6">
            <TransactionsList 
              transactions={filteredTransactions} 
              formatCurrency={formatCurrency} 
              onSelect={showTransactionDetails}
            />
          </TabsContent>
          
          <TabsContent value="expense" className="mt-6">
            <TransactionsList 
              transactions={filteredTransactions} 
              formatCurrency={formatCurrency} 
              onSelect={showTransactionDetails}
            />
          </TabsContent>
        </Tabs>
        
        {/* جزئیات تراکنش */}
        {selectedTransaction && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>جزئیات تراکنش</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedTransaction(null)}
                >
                  بستن
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full ${selectedTransaction.iconBg} text-primary flex items-center justify-center`}>
                    {selectedTransaction.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedTransaction.title}</h3>
                    <p className="text-sm text-secondary">{selectedTransaction.date} - {selectedTransaction.time}</p>
                  </div>
                  <div className="mr-auto">
                    <span className={`font-bold ${
                      selectedTransaction.type === 'income' ? 'text-success' : 
                      selectedTransaction.type === 'expense' ? 'text-danger' : 'text-warning'
                    }`}>
                      {selectedTransaction.type === 'income' ? '+' : selectedTransaction.type === 'expense' ? '-' : ''}
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-secondary-light rounded-lg">
                  <InfoItem label="شماره پیگیری" value={selectedTransaction.reference} />
                  <InfoItem label="وضعیت" value="تکمیل شده" />
                  <InfoItem label="پذیرنده" value={selectedTransaction.merchant} />
                  <InfoItem label="دسته‌بندی" value={selectedTransaction.category} />
                  <InfoItem label="تاریخ" value={selectedTransaction.date} />
                  <InfoItem label="زمان" value={selectedTransaction.time} />
                  <InfoItem label="توضیحات" value={selectedTransaction.description} className="md:col-span-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

interface TransactionsListProps {
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  onSelect: (transaction: Transaction) => void;
}

function TransactionsList({ transactions, formatCurrency, onSelect }: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 bg-secondary-light rounded-lg">
        <p className="text-secondary">تراکنشی یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className="p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-sm transition-all cursor-pointer"
          onClick={() => onSelect(transaction)}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${transaction.iconBg} flex items-center justify-center`}>
              {transaction.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium">{transaction.title}</h3>
                <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-success' : 
                  transaction.type === 'expense' ? 'text-danger' : 'text-warning'
                }`}>
                  {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-secondary">{transaction.date} - {transaction.time}</span>
                <span className="text-xs text-secondary">{transaction.reference}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface FilterDropdownProps {
  title: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ title, options, value, onChange }: FilterDropdownProps) {
  const selectedOption = options.find(option => option.value === value)?.label || options[0].label;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Filter size={16} />
          {title}: {selectedOption}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
  className?: string;
}

function InfoItem({ label, value, className = "" }: InfoItemProps) {
  return (
    <div className={className}>
      <p className="text-sm text-secondary">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
} 