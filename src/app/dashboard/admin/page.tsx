"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Users,
  CreditCard,
  BarChart3,
  CheckCircle,
  XCircle,
  Search,
  ChevronDown,
  Filter,
  User,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// نمونه داده برای کاربران
const MOCK_USERS = [
  { id: "1", name: "علی محمدی", email: "ali@example.com", phone: "09123456789", registrationDate: "1402/05/12", status: "active", creditLimit: 15000000 },
  { id: "2", name: "زهرا احمدی", email: "zahra@example.com", phone: "09123456788", registrationDate: "1402/06/18", status: "active", creditLimit: 20000000 },
  { id: "3", name: "حسین کریمی", email: "hossein@example.com", phone: "09123456787", registrationDate: "1402/07/05", status: "blocked", creditLimit: 0 },
  { id: "4", name: "مریم رضایی", email: "maryam@example.com", phone: "09123456786", registrationDate: "1402/07/25", status: "active", creditLimit: 10000000 },
  { id: "5", name: "امیر حسینی", email: "amir@example.com", phone: "09123456785", registrationDate: "1402/08/10", status: "pending", creditLimit: 0 },
];

// نمونه داده برای درخواست‌های اعتبار
const MOCK_CREDIT_REQUESTS = [
  { id: "1", userId: "5", userName: "امیر حسینی", amount: 25000000, installments: 12, requestDate: "1402/08/10", status: "pending" },
  { id: "2", userId: "6", userName: "فاطمه نوری", amount: 15000000, installments: 6, requestDate: "1402/08/09", status: "pending" },
  { id: "3", userId: "7", userName: "محمد سعیدی", amount: 30000000, installments: 18, requestDate: "1402/08/08", status: "approved" },
  { id: "4", userId: "8", userName: "سارا جعفری", amount: 10000000, installments: 3, requestDate: "1402/08/07", status: "rejected" },
  { id: "5", userId: "9", userName: "رضا کرمی", amount: 20000000, installments: 12, requestDate: "1402/08/06", status: "approved" },
];

// نمونه داده برای تراکنش‌ها
const MOCK_TRANSACTIONS = [
  { id: "1", userId: "1", userName: "علی محمدی", amount: 2500000, type: "purchase", date: "1402/08/15", time: "14:30", status: "successful" },
  { id: "2", userId: "2", userName: "زهرا احمدی", amount: 5000000, type: "deposit", date: "1402/08/14", time: "10:15", status: "successful" },
  { id: "3", userId: "3", userName: "حسین کریمی", amount: 1500000, type: "installment", date: "1402/08/12", time: "16:45", status: "failed" },
  { id: "4", userId: "4", userName: "مریم رضایی", amount: 3500000, type: "purchase", date: "1402/08/10", time: "09:20", status: "successful" },
  { id: "5", userId: "2", userName: "زهرا احمدی", amount: 2000000, type: "withdrawal", date: "1402/08/08", time: "11:30", status: "successful" },
];

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // تبدیل اعداد به فرمت تومان با جداکننده هزارگان
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };
  
  // فیلتر کاربران
  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // فیلتر درخواست‌های اعتبار
  const filteredCreditRequests = MOCK_CREDIT_REQUESTS.filter(request => {
    const matchesSearch = searchQuery === "" || 
      request.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // فیلتر تراکنش‌ها
  const filteredTransactions = MOCK_TRANSACTIONS.filter(transaction => {
    const matchesSearch = searchQuery === "" || 
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // محاسبه آمار
  const stats = {
    totalUsers: MOCK_USERS.length,
    activeUsers: MOCK_USERS.filter(user => user.status === "active").length,
    pendingRequests: MOCK_CREDIT_REQUESTS.filter(req => req.status === "pending").length,
    totalTransactions: MOCK_TRANSACTIONS.length,
    successfulTransactions: MOCK_TRANSACTIONS.filter(tx => tx.status === "successful").length,
    totalDeposits: MOCK_TRANSACTIONS.filter(tx => tx.type === "deposit")
      .reduce((sum, tx) => sum + tx.amount, 0),
    totalPurchases: MOCK_TRANSACTIONS.filter(tx => tx.type === "purchase")
      .reduce((sum, tx) => sum + tx.amount, 0),
  };
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">پنل مدیریت</h1>
        <p className="text-gray-600 mt-1">مدیریت کاربران، درخواست‌های اعتبار و تراکنش‌ها</p>
      </div>
      
      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">کاربران فعال</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{stats.activeUsers} / {stats.totalUsers}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">درخواست‌های در انتظار</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{stats.pendingRequests}</h3>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
          <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500"></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">مجموع واریزی‌ها</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalDeposits)}</h3>
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
                <p className="text-sm text-gray-500">مجموع خریدها</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(stats.totalPurchases)}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <ArrowDownRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* تب‌های مدیریت */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">کاربران</TabsTrigger>
          <TabsTrigger value="credit-requests">درخواست‌های اعتبار</TabsTrigger>
          <TabsTrigger value="transactions">تراکنش‌ها</TabsTrigger>
        </TabsList>
        
        {/* جستجو و فیلتر */}
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden mb-6">
          <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="جستجو..." 
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select 
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="active">فعال</option>
                    <option value="pending">در انتظار</option>
                    <option value="blocked">مسدود</option>
                    <option value="rejected">رد شده</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                <Button variant="outline" className="gap-1" onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}>
                  <Filter className="h-4 w-4" />
                  پاک کردن فیلترها
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* لیست کاربران */}
        <TabsContent value="users">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                لیست کاربران
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">نام</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">ایمیل</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">شماره موبایل</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">تاریخ ثبت‌نام</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">وضعیت</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">اعتبار</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm">{user.name}</td>
                        <td className="py-4 px-4 text-sm">{user.email}</td>
                        <td className="py-4 px-4 text-sm">{user.phone}</td>
                        <td className="py-4 px-4 text-sm">{user.registrationDate}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'فعال' :
                             user.status === 'pending' ? 'در انتظار تأیید' :
                             'مسدود'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {user.creditLimit > 0 ? formatCurrency(user.creditLimit) : 'بدون اعتبار'}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <User className="h-4 w-4 text-gray-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          هیچ کاربری یافت نشد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* لیست درخواست‌های اعتبار */}
        <TabsContent value="credit-requests">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                درخواست‌های اعتبار
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">نام کاربر</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">مبلغ</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">تعداد اقساط</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">تاریخ درخواست</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">وضعیت</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCreditRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm">{request.userName}</td>
                        <td className="py-4 px-4 text-sm">{formatCurrency(request.amount)}</td>
                        <td className="py-4 px-4 text-sm">{request.installments} قسط</td>
                        <td className="py-4 px-4 text-sm">{request.requestDate}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            request.status === 'approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status === 'approved' ? 'تأیید شده' :
                             request.status === 'pending' ? 'در انتظار بررسی' :
                             'رد شده'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4 text-gray-500" />
                            </Button>
                            {request.status === 'pending' && (
                              <>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredCreditRequests.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          هیچ درخواست اعتباری یافت نشد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* لیست تراکنش‌ها */}
        <TabsContent value="transactions">
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                تاریخچه تراکنش‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-y border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">نام کاربر</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">نوع تراکنش</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">مبلغ</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">تاریخ</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">ساعت</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">وضعیت</th>
                      <th className="py-3 px-4 text-right text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm">{transaction.userName}</td>
                        <td className="py-4 px-4 text-sm">
                          {transaction.type === 'purchase' ? 'خرید' :
                           transaction.type === 'deposit' ? 'شارژ کیف پول' :
                           transaction.type === 'withdrawal' ? 'برداشت' :
                           'پرداخت قسط'}
                        </td>
                        <td className="py-4 px-4 text-sm">{formatCurrency(transaction.amount)}</td>
                        <td className="py-4 px-4 text-sm">{transaction.date}</td>
                        <td className="py-4 px-4 text-sm">{transaction.time}</td>
                        <td className="py-4 px-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            transaction.status === 'successful' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status === 'successful' ? 'موفق' : 'ناموفق'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-gray-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-gray-500">
                          هیچ تراکنشی یافت نشد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 