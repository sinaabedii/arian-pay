"use client";

import { useState, useMemo, useCallback } from "react";
import { 
  Calculator, 
  BarChart3, 
  PieChart,
  DollarSign,
  Percent,
  Calendar,
  ShoppingCart,
  Car,
  Home,
  CreditCard,
  TrendingUp,
  AlertCircle,
  LucideIcon
} from "lucide-react";

// نوع‌های مختلف وام
type LoanType = 'consumer' | 'cash' | 'auto' | 'mortgage';

interface LoanTypeConfig {
  name: string;
  icon: LucideIcon;
  maxAmount: number;
  minRate: number;
  maxRate: number;
  maxDuration: number;
  fee: number; // کارمزد
  insurance: number; // بیمه
}

interface LoanDetails {
  type: LoanType;
  monthlyIncome: number;
  loanAmount: number;
  duration: number;
  interestRate: number;
  downPayment: number;
}

interface PaymentRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  insurance: number;
  balance: number;
  cumulativePaid: number;
}

const LoanCalculatorSection = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'table' | 'chart' | 'compare'>('calculator');
  const [showFullTable, setShowFullTable] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<LoanType[]>(['consumer', 'cash']);

  // تنظیمات انواع مختلف وام - wrapped in useMemo to prevent re-renders
  const loanTypes = useMemo(() => ({
    consumer: {
      name: 'خرید کالا',
      icon: ShoppingCart,
      maxAmount: 200000000,
      minRate: 16,
      maxRate: 24,
      maxDuration: 36,
      fee: 0.5,
      insurance: 0.2
    },
    cash: {
      name: 'وام نقدی',
      icon: CreditCard,
      maxAmount: 150000000,
      minRate: 18,
      maxRate: 28,
      maxDuration: 60,
      fee: 1,
      insurance: 0.3
    },
    auto: {
      name: 'خرید خودرو',
      icon: Car,
      maxAmount: 500000000,
      minRate: 14,
      maxRate: 20,
      maxDuration: 72,
      fee: 0.3,
      insurance: 0.5
    },
    mortgage: {
      name: 'وام مسکن',
      icon: Home,
      maxAmount: 2000000000,
      minRate: 12,
      maxRate: 18,
      maxDuration: 240,
      fee: 0.2,
      insurance: 0.1
    }
  } as Record<LoanType, LoanTypeConfig>), []);

  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    type: 'consumer',
    monthlyIncome: 20000000,
    loanAmount: 50000000,
    duration: 12,
    interestRate: 18,
    downPayment: 0
  });

  const currentLoanType = loanTypes[loanDetails.type];

  // محاسبه حداکثر مقدار اعتبار بر اساس درآمد و نوع وام
  const maxLoanAmount = useMemo(() => {
    const baseAmount = Math.floor(loanDetails.monthlyIncome * 15);
    return Math.min(baseAmount, currentLoanType.maxAmount);
  }, [loanDetails.monthlyIncome, currentLoanType.maxAmount]);

  // محاسبه اقساط ماهانه با احتساب کارمزد و بیمه
  const calculatedPayments = useMemo(() => {
    const P = loanDetails.loanAmount;
    const r = loanDetails.interestRate / 100 / 12;
    const n = loanDetails.duration;
    
    // محاسبه قسط اصلی
    let basePayment;
    if (r === 0) {
      basePayment = P / n;
    } else {
      basePayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    // کارمزد و بیمه ماهانه
    const monthlyFee = (P * currentLoanType.fee / 100) / 12;
    const monthlyInsurance = (P * currentLoanType.insurance / 100) / 12;
    
    return {
      basePayment: Math.round(basePayment),
      monthlyFee: Math.round(monthlyFee),
      monthlyInsurance: Math.round(monthlyInsurance),
      totalMonthlyPayment: Math.round(basePayment + monthlyFee + monthlyInsurance)
    };
  }, [loanDetails, currentLoanType]);

  // محاسبه جدول پرداخت دقیق
  const paymentSchedule = useMemo(() => {
    const schedule: PaymentRow[] = [];
    let balance = loanDetails.loanAmount;
    const monthlyRate = loanDetails.interestRate / 100 / 12;
    let cumulativePaid = 0;
    
    for (let month = 1; month <= loanDetails.duration; month++) {
      const interestPayment = Math.round(balance * monthlyRate);
      const principalPayment = calculatedPayments.basePayment - interestPayment;
      const insurancePayment = calculatedPayments.monthlyInsurance;
      
      balance = Math.max(0, balance - principalPayment);
      cumulativePaid += calculatedPayments.totalMonthlyPayment;
      
      schedule.push({
        month,
        payment: calculatedPayments.totalMonthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        insurance: insurancePayment,
        balance,
        cumulativePaid
      });
    }
    
    return schedule;
  }, [loanDetails, calculatedPayments]);

  // محاسبه آمار کلی
  const totalStats = useMemo(() => {
    const totalPayment = calculatedPayments.totalMonthlyPayment * loanDetails.duration;
    const totalInterest = paymentSchedule.reduce((sum, row) => sum + row.interest, 0);
    const totalInsurance = calculatedPayments.monthlyInsurance * loanDetails.duration;
    const totalFees = calculatedPayments.monthlyFee * loanDetails.duration;
    const paymentToIncomeRatio = (calculatedPayments.totalMonthlyPayment / loanDetails.monthlyIncome) * 100;
    const effectiveRate = ((totalPayment / loanDetails.loanAmount) - 1) * 100;
    
    return {
      totalPayment,
      totalInterest,
      totalInsurance,
      totalFees,
      paymentToIncomeRatio,
      effectiveRate,
      savings: maxLoanAmount - loanDetails.loanAmount
    };
  }, [calculatedPayments, loanDetails, paymentSchedule, maxLoanAmount]);

  // محاسبه مقایسه انواع وام
  const loanComparison = useMemo(() => {
    return selectedComparison.map(type => {
      const config = loanTypes[type];
      const rate = (config.minRate + config.maxRate) / 2;
      const r = rate / 100 / 12;
      const n = Math.min(loanDetails.duration, config.maxDuration);
      const amount = Math.min(loanDetails.loanAmount, config.maxAmount);
      
      let basePayment;
      if (r === 0) {
        basePayment = amount / n;
      } else {
        basePayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      
      const monthlyFee = (amount * config.fee / 100) / 12;
      const monthlyInsurance = (amount * config.insurance / 100) / 12;
      const monthlyPayment = basePayment + monthlyFee + monthlyInsurance;
      const totalPayment = monthlyPayment * n;
      
      return {
        type,
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalPayment - amount)
      };
    });
  }, [selectedComparison, loanDetails, loanTypes]);

  const handleInputChange = useCallback((field: keyof LoanDetails, value: number | LoanType) => {
    setLoanDetails(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' ریال';
  }, []);

  const formatNumber = useCallback((num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num);
  }, []);

  const getRiskLevel = useCallback(() => {
    if (totalStats.paymentToIncomeRatio <= 25) return { level: 'low', color: 'green', text: 'کم ریسک', bg: 'bg-green-50', border: 'border-green-200', textColor: 'text-green-800' };
    if (totalStats.paymentToIncomeRatio <= 40) return { level: 'medium', color: 'yellow', text: 'متوسط', bg: 'bg-yellow-50', border: 'border-yellow-200', textColor: 'text-yellow-800' };
    return { level: 'high', color: 'red', text: 'پرریسک', bg: 'bg-red-50', border: 'border-red-200', textColor: 'text-red-800' };
  }, [totalStats.paymentToIncomeRatio]);

  const risk = getRiskLevel();

  return (
    <section className="px-4 py-16 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full mb-4 shadow-lg">
            <Calculator className="h-4 w-4" />
            <span className="text-sm font-medium">محاسبه‌گر هوشمند</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            محاسبه‌گر دقیق اعتبار و اقساط
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            انواع مختلف وام، محاسبه دقیق اقساط، کارمزد و تحلیل کامل
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header with Tabs */}
          <div className="bg-blue-600 p-6">
            <div className="flex flex-col gap-4">
              <div className="text-white text-center md:text-right">
                <h3 className="text-xl font-bold mb-2">محاسبه‌گر هوشمند سعید پی</h3>
                <p className="text-blue-100 text-sm">محاسبه دقیق و مقایسه انواع مختلف وام</p>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm overflow-x-auto">
                {[
                  { id: 'calculator', label: 'محاسبه‌گر', icon: Calculator },
                  { id: 'table', label: 'جدول', icon: BarChart3 },
                  { id: 'chart', label: 'نمودار', icon: PieChart },
                  { id: 'compare', label: 'مقایسه', icon: TrendingUp }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'calculator' | 'table' | 'chart' | 'compare')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'calculator' && (
              <div className="space-y-8">
                {/* نوع وام */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">انتخاب نوع وام</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(loanTypes).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => handleInputChange('type', key as LoanType)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          loanDetails.type === key
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <config.icon className="h-6 w-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">{config.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Monthly Income */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          درآمد ماهانه
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="5000000"
                            max="100000000"
                            step="1000000"
                            value={loanDetails.monthlyIncome}
                            onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center text-sm font-medium text-blue-600 mt-2">
                            {formatCurrency(loanDetails.monthlyIncome)}
                          </div>
                        </div>
                      </div>

                      {/* Loan Amount */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Calculator className="h-4 w-4 text-blue-600" />
                          مبلغ اعتبار
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="1000000"
                            max={maxLoanAmount}
                            step="1000000"
                            value={loanDetails.loanAmount}
                            onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center text-sm font-medium text-blue-600 mt-2">
                            {formatCurrency(loanDetails.loanAmount)}
                          </div>
                          <div className="text-center text-xs text-gray-500 mt-1">
                            حداکثر: {formatCurrency(maxLoanAmount)}
                          </div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          مدت بازپرداخت (ماه)
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min="3"
                            max={currentLoanType.maxDuration}
                            step="1"
                            value={loanDetails.duration}
                            onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center text-sm font-medium text-blue-600 mt-2">
                            {loanDetails.duration} ماه ({Math.round(loanDetails.duration / 12 * 10) / 10} سال)
                          </div>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Percent className="h-4 w-4 text-orange-600" />
                          نرخ سود (درصد)
                        </label>
                        <div className="relative">
                          <input
                            type="range"
                            min={currentLoanType.minRate}
                            max={currentLoanType.maxRate}
                            step="0.5"
                            value={loanDetails.interestRate}
                            onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="text-center text-sm font-medium text-blue-600 mt-2">
                            {loanDetails.interestRate}% (نرخ مؤثر: {totalStats.effectiveRate.toFixed(1)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-6">
                    {/* Monthly Payment Card */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-4">تفکیک قسط ماهانه</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">قسط اصلی:</span>
                          <span className="font-medium text-gray-600">{formatCurrency(calculatedPayments.basePayment)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">کارمزد:</span>
                          <span className="font-medium text-gray-600">{formatCurrency(calculatedPayments.monthlyFee)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">بیمه:</span>
                          <span className="font-medium text-gray-600">{formatCurrency(calculatedPayments.monthlyInsurance)}</span>
                        </div>
                        <hr className="border-blue-200" />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-blue-800">کل قسط:</span>
                          <span className="text-xl font-bold text-blue-600">{formatCurrency(calculatedPayments.totalMonthlyPayment)}</span>
                        </div>
                        <div className="text-sm text-blue-700">
                          {((calculatedPayments.totalMonthlyPayment / loanDetails.monthlyIncome) * 100).toFixed(1)}% از درآمد شما
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className={`${risk.bg} border ${risk.border} rounded-2xl p-6`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className={`h-5 w-5 text-${risk.color}-600`} />
                        <h3 className={`text-lg font-semibold ${risk.textColor}`}>ارزیابی ریسک</h3>
                      </div>
                      <div className={`text-2xl font-bold text-${risk.color}-600 mb-2`}>
                        {risk.text}
                      </div>
                      <div className={`text-sm ${risk.textColor}`}>
                        نسبت اقساط به درآمد: {totalStats.paymentToIncomeRatio.toFixed(1)}%
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="text-xs text-gray-600 mb-1">کل پرداختی</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(totalStats.totalPayment)}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="text-xs text-gray-600 mb-1">کل سود</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(totalStats.totalInterest)}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="text-xs text-gray-600 mb-1">کل کارمزد</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(totalStats.totalFees)}
                        </div>
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="text-xs text-gray-600 mb-1">کل بیمه</div>
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(totalStats.totalInsurance)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'table' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">جدول تفصیلی بازپرداخت</h3>
                  <button
                    onClick={() => setShowFullTable(!showFullTable)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium px-4 py-2 border border-blue-300 rounded-lg"
                  >
                    {showFullTable ? 'نمایش خلاصه' : 'نمایش کامل'}
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">ماه</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">قسط کل</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">اصل</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">سود</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">بیمه</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">باقیمانده</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">مجموع پرداختی</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {(showFullTable ? paymentSchedule : paymentSchedule.slice(0, 12)).map((row, index) => (
                        <tr key={row.month} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                          <td className="py-3 px-4 font-medium text-gray-900">{formatNumber(row.month)}</td>
                          <td className="py-3 px-4 text-blue-600 font-semibold">
                            {formatCurrency(row.payment)}
                          </td>
                          <td className="py-3 px-4 text-green-600 font-medium">{formatCurrency(row.principal)}</td>
                          <td className="py-3 px-4 text-orange-600 font-medium">{formatCurrency(row.interest)}</td>
                          <td className="py-3 px-4 text-purple-600 font-medium">{formatCurrency(row.insurance)}</td>
                          <td className="py-3 px-4 text-gray-700">{formatCurrency(row.balance)}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">{formatCurrency(row.cumulativePaid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {!showFullTable && paymentSchedule.length > 12 && (
                  <div className="text-center text-gray-600 text-sm">
                    و {paymentSchedule.length - 12} ماه دیگر...
                  </div>
                )}
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="space-y-8">
                <h3 className="text-xl font-semibold text-gray-900 text-center">
                  تحلیل گرافیکی و نمودارها
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Payment Breakdown Pie Chart */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-6 text-center">
                      توزیع اجزای کل پرداختی
                    </h4>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-40 h-40">
                        <div 
                          className="absolute inset-0 rounded-full bg-blue-500"
                          style={{
                            background: `conic-gradient(
                              #3b82f6 0deg ${(loanDetails.loanAmount / totalStats.totalPayment) * 360}deg,
                              #f97316 ${(loanDetails.loanAmount / totalStats.totalPayment) * 360}deg ${((loanDetails.loanAmount + totalStats.totalInterest) / totalStats.totalPayment) * 360}deg,
                              #8b5cf6 ${((loanDetails.loanAmount + totalStats.totalInterest) / totalStats.totalPayment) * 360}deg ${((loanDetails.loanAmount + totalStats.totalInterest + totalStats.totalFees) / totalStats.totalPayment) * 360}deg,
                              #10b981 ${((loanDetails.loanAmount + totalStats.totalInterest + totalStats.totalFees) / totalStats.totalPayment) * 360}deg 360deg
                            )`
                          }}
                        ></div>
                        <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-bold text-gray-600">کل</div>
                            <div className="text-xs font-bold text-gray-900">{formatCurrency(totalStats.totalPayment).slice(0, -5)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span>اصل وام ({((loanDetails.loanAmount / totalStats.totalPayment) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded"></div>
                        <span>سود ({((totalStats.totalInterest / totalStats.totalPayment) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span>کارمزد ({((totalStats.totalFees / totalStats.totalPayment) * 100).toFixed(1)}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span>بیمه ({((totalStats.totalInsurance / totalStats.totalPayment) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Balance Reduction Timeline */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-6 text-center">
                      روند کاهش بدهی
                    </h4>
                    <div className="text-center text-sm text-gray-600">
                      نمودار تفصیلی در دسترس است
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compare' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">مقایسه انواع وام</h3>
                  <p className="text-gray-600 text-sm">انواع مختلف وام را با همین مبلغ و مدت مقایسه کنید</p>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.entries(loanTypes).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (selectedComparison.includes(key as LoanType)) {
                          setSelectedComparison(prev => prev.filter(item => item !== key));
                        } else {
                          setSelectedComparison(prev => [...prev, key as LoanType]);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                        selectedComparison.includes(key as LoanType)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      <config.icon className="h-4 w-4" />
                      <span className="text-sm">{config.name}</span>
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">نوع وام</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">قسط ماهانه</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">کل پرداختی</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">کل سود</th>
                        <th className="py-3 px-4 text-right font-semibold text-gray-800">نسبت به درآمد</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loanComparison.map((item, index) => {
                        const config = loanTypes[item.type];
                        const ratio = (item.monthlyPayment / loanDetails.monthlyIncome) * 100;
                        return (
                          <tr key={item.type} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <config.icon className="h-4 w-4 text-gray-600" />
                                <span className="font-medium">{config.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-blue-600 font-semibold">
                              {formatCurrency(item.monthlyPayment)}
                            </td>
                            <td className="py-3 px-4 text-gray-900 font-medium">
                              {formatCurrency(item.totalPayment)}
                            </td>
                            <td className="py-3 px-4 text-orange-600 font-medium">
                              {formatCurrency(item.totalInterest)}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                ratio <= 25 ? 'bg-green-100 text-green-800' :
                                ratio <= 40 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {ratio.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculatorSection; 