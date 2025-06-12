"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Download,
  Filter,
  Search,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  ShoppingBag,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store/auth-store";

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
    iconBg: "bg-blue-100 text-blue-600",
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
    iconBg: "bg-green-100 text-green-600",
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
    iconBg: "bg-purple-100 text-purple-600",
    icon: <Calendar size={14} />,
    merchant: "سعید پی",
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
    iconBg: "bg-blue-100 text-blue-600",
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
    iconBg: "bg-yellow-100 text-yellow-600",
    icon: <CreditCard size={14} />,
    merchant: "سعید پی",
    description: "افزایش اعتبار پس از بررسی درخواست",
    reference: "CR-98765432",
  },
];

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    timeRange: "all",
  });
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    let result = [...MOCK_TRANSACTIONS];

    if (filters.type !== "all") {
      result = result.filter(
        (transaction) => transaction.type === filters.type
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (transaction) => transaction.category === filters.category
      );
    }

    if (searchQuery) {
      result = result.filter(
        (transaction) =>
          transaction.title.includes(searchQuery) ||
          transaction.merchant.includes(searchQuery) ||
          transaction.reference.includes(searchQuery)
      );
    }

    if (activeTab !== "all") {
      result = result.filter((transaction) => transaction.type === activeTab);
    }

    setFilteredTransactions(result);
  }, [searchQuery, filters, activeTab]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  const showTransactionDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              تاریخچه تراکنش‌ها
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              مشاهده و مدیریت تمامی تراکنش‌های شما
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
            >
              <Download size={16} />
              <span className="hidden sm:inline">دریافت گزارش</span>
              <span className="sm:hidden">گزارش</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="جستجو در تراکنش‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <FilterDropdown
              title="نوع"
              options={FILTER_OPTIONS.type}
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            />
            <FilterDropdown
              title="دسته"
              options={FILTER_OPTIONS.category}
              value={filters.category}
              onChange={(value) => setFilters({ ...filters, category: value })}
            />
            <FilterDropdown
              title="زمان"
              options={FILTER_OPTIONS.timeRange}
              value={filters.timeRange}
              onChange={(value) => setFilters({ ...filters, timeRange: value })}
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="all"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg"
            >
              <span className="hidden sm:inline">همه تراکنش‌ها</span>
              <span className="sm:hidden">همه</span>
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg"
            >
              <ArrowDownRight className="h-4 w-4 text-green-600 ml-1" />
              <span className="hidden sm:inline">دریافتی‌ها</span>
              <span className="sm:hidden">دریافتی</span>
            </TabsTrigger>
            <TabsTrigger
              value="expense"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg"
            >
              <ArrowUpRight className="h-4 w-4 text-red-600 ml-1" />
              <span className="hidden sm:inline">پرداختی‌ها</span>
              <span className="sm:hidden">پرداختی</span>
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

        {selectedTransaction && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  جزئیات تراکنش
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTransaction(null)}
                  className="hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${selectedTransaction.iconBg} flex items-center justify-center`}
                  >
                    {selectedTransaction.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">
                      {selectedTransaction.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedTransaction.date} - {selectedTransaction.time}
                    </p>
                  </div>
                  <div className="text-left">
                    <span
                      className={`font-bold text-lg ${
                        selectedTransaction.type === "income"
                          ? "text-green-600"
                          : selectedTransaction.type === "expense"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {selectedTransaction.type === "income"
                        ? "+"
                        : selectedTransaction.type === "expense"
                        ? "-"
                        : ""}
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <InfoItem
                    label="شماره پیگیری"
                    value={selectedTransaction.reference}
                  />
                  <InfoItem label="وضعیت" value="تکمیل شده" />
                  <InfoItem
                    label="پذیرنده"
                    value={selectedTransaction.merchant}
                  />
                  <InfoItem
                    label="دسته‌بندی"
                    value={selectedTransaction.category}
                  />
                  <InfoItem label="تاریخ" value={selectedTransaction.date} />
                  <InfoItem label="زمان" value={selectedTransaction.time} />
                  <InfoItem
                    label="توضیحات"
                    value={selectedTransaction.description}
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TransactionsListProps {
  transactions: Transaction[];
  formatCurrency: (amount: number) => string;
  onSelect: (transaction: Transaction) => void;
}

function TransactionsList({
  transactions,
  formatCurrency,
  onSelect,
}: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-600">تراکنشی یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          onClick={() => onSelect(transaction)}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${transaction.iconBg} flex items-center justify-center shadow-sm`}
            >
              {transaction.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {transaction.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                    <span className="text-sm text-gray-500">
                      {transaction.date} - {transaction.time}
                    </span>
                    <span className="text-xs text-gray-400 break-all sm:break-normal">
                      {transaction.reference}
                    </span>
                  </div>
                </div>
                <div className="text-left flex-shrink-0">
                  <span
                    className={`font-bold text-base sm:text-lg ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : transaction.type === "expense"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {transaction.type === "income"
                      ? "+"
                      : transaction.type === "expense"
                      ? "-"
                      : ""}
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
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

function FilterDropdown({
  title,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const selectedOption =
    options.find((option) => option.value === value)?.label || options[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 border-gray-300 hover:border-blue-600 hover:text-blue-600 min-w-0"
        >
          <Filter size={14} className="flex-shrink-0" />
          <span className="hidden sm:inline">{title}: </span>
          <span className="truncate">{selectedOption}</span>
          <ChevronDown size={12} className="flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white border border-gray-200 rounded-xl shadow-lg"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className="hover:bg-gray-50"
          >
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
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900 break-words">{value}</p>
    </div>
  );
}
