"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  Command, 
  Home, 
  User, 
  CreditCard, 
  Wallet, 
  Store, 
  Settings,
  Bell,
  BarChart3,
  QrCode,
  Crown,
  Sparkles,
  TreePine,
  Lock,
  ArrowRight,
  Clock,
  TrendingUp,
  Star,
  Phone,
  Mail,
  HelpCircle,
  Shield,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/lib/store/auth-store";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'public' | 'dashboard' | 'features' | 'settings' | 'help';
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth: boolean;
  keywords: string[];
  priority: number;
}

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_DATA: SearchResult[] = [
  // Public Pages
  {
    id: 'home',
    title: 'صفحه اصلی',
    description: 'بازگشت به صفحه اصلی سعید پی',
    category: 'public',
    url: '/',
    icon: Home,
    requiresAuth: false,
    keywords: ['خانه', 'اصلی', 'هوم', 'صفحه'],
    priority: 10
  },
  {
    id: 'login',
    title: 'ورود به حساب',
    description: 'ورود به حساب کاربری',
    category: 'public',
    url: '/login',
    icon: User,
    requiresAuth: false,
    keywords: ['ورود', 'لاگین', 'حساب', 'کاربری'],
    priority: 9
  },
  {
    id: 'signup',
    title: 'ثبت نام',
    description: 'ایجاد حساب کاربری جدید',
    category: 'public',
    url: '/signup',
    icon: User,
    requiresAuth: false,
    keywords: ['ثبت نام', 'عضویت', 'حساب جدید'],
    priority: 9
  },

  // Dashboard Pages
  {
    id: 'dashboard',
    title: 'داشبورد',
    description: 'نمای کلی حساب شما',
    category: 'dashboard',
    url: '/dashboard',
    icon: Home,
    requiresAuth: true,
    keywords: ['داشبورد', 'پنل', 'کنترل', 'اصلی'],
    priority: 10
  },
  {
    id: 'wallet',
    title: 'کیف پول',
    description: 'مدیریت موجودی و تراکنش‌ها',
    category: 'dashboard',
    url: '/dashboard/wallet',
    icon: Wallet,
    requiresAuth: true,
    keywords: ['کیف پول', 'موجودی', 'پول', 'حساب'],
    priority: 9
  },
  {
    id: 'credit',
    title: 'درخواست اعتبار',
    description: 'درخواست اعتبار خرید',
    category: 'dashboard',
    url: '/dashboard/credit-request',
    icon: CreditCard,
    requiresAuth: true,
    keywords: ['اعتبار', 'وام', 'قرض', 'درخواست'],
    priority: 8
  },
  {
    id: 'installments',
    title: 'اقساط',
    description: 'مدیریت اقساط و پرداخت‌ها',
    category: 'dashboard',
    url: '/dashboard/installments',
    icon: CreditCard,
    requiresAuth: true,
    keywords: ['اقساط', 'پرداخت', 'قسط', 'ماهانه'],
    priority: 8
  },
  {
    id: 'stores',
    title: 'فروشگاه‌ها',
    description: 'فروشگاه‌های طرف قرارداد',
    category: 'dashboard',
    url: '/dashboard/stores',
    icon: Store,
    requiresAuth: true,
    keywords: ['فروشگاه', 'مغازه', 'خرید', 'دکان'],
    priority: 7
  },
  {
    id: 'transactions',
    title: 'تراکنش‌ها',
    description: 'تاریخچه کامل تراکنش‌ها',
    category: 'dashboard',
    url: '/dashboard/transactions',
    icon: BarChart3,
    requiresAuth: true,
    keywords: ['تراکنش', 'تاریخچه', 'پرداخت', 'خرید'],
    priority: 7
  },
  {
    id: 'qr-payment',
    title: 'پرداخت QR',
    description: 'پرداخت با کد QR',
    category: 'dashboard',
    url: '/dashboard/qr-payment',
    icon: QrCode,
    requiresAuth: true,
    keywords: ['qr', 'کیوآر', 'پرداخت', 'بارکد'],
    priority: 6
  },

  // New Features
  {
    id: 'saeed-club',
    title: 'سعید کلاب',
    description: 'باشگاه وفاداری و گیمیفیکیشن',
    category: 'features',
    url: '/dashboard/saeed-club',
    icon: Crown,
    requiresAuth: true,
    keywords: ['کلاب', 'باشگاه', 'وفاداری', 'امتیاز', 'جایزه'],
    priority: 8
  },
  {
    id: 'ar-shopping',
    title: 'خرید AR',
    description: 'تجربه خرید با واقعیت افزوده',
    category: 'features',
    url: '/dashboard/ar-shopping',
    icon: Sparkles,
    requiresAuth: true,
    keywords: ['ar', 'واقعیت افزوده', 'پروو', 'مجازی'],
    priority: 7
  },
  {
    id: 'green-saeed',
    title: 'سعید سبز',
    description: 'پلتفرم پایداری و مسئولیت اجتماعی',
    category: 'features',
    url: '/dashboard/green-saeed',
    icon: TreePine,
    requiresAuth: true,
    keywords: ['سبز', 'محیط زیست', 'پایداری', 'کربن'],
    priority: 7
  },

  // Settings & Profile
  {
    id: 'profile',
    title: 'پروفایل',
    description: 'مدیریت اطلاعات شخصی',
    category: 'settings',
    url: '/dashboard/profile',
    icon: User,
    requiresAuth: true,
    keywords: ['پروفایل', 'اطلاعات', 'شخصی', 'حساب'],
    priority: 6
  },
  {
    id: 'notifications',
    title: 'اعلان‌ها',
    description: 'مدیریت اعلان‌ها و پیام‌ها',
    category: 'settings',
    url: '/dashboard/notifications',
    icon: Bell,
    requiresAuth: true,
    keywords: ['اعلان', 'پیام', 'نوتیفیکیشن'],
    priority: 5
  },

  // Help & Support
  {
    id: 'support',
    title: 'پشتیبانی',
    description: 'تماس با پشتیبانی ۲۴/۷',
    category: 'help',
    url: '/support',
    icon: Phone,
    requiresAuth: false,
    keywords: ['پشتیبانی', 'تماس', 'کمک', 'راهنمایی'],
    priority: 6
  },
  {
    id: 'faq',
    title: 'سوالات متداول',
    description: 'پاسخ سوالات رایج',
    category: 'help',
    url: '/faq',
    icon: HelpCircle,
    requiresAuth: false,
    keywords: ['سوال', 'متداول', 'راهنما', 'کمک'],
    priority: 5
  },
  {
    id: 'security',
    title: 'امنیت',
    description: 'تنظیمات امنیتی حساب',
    category: 'settings',
    url: '/dashboard/security',
    icon: Shield,
    requiresAuth: true,
    keywords: ['امنیت', 'رمز', 'حفاظت', 'دو مرحله‌ای'],
    priority: 5
  }
];

export default function SmartSearch({ isOpen, onClose }: SmartSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('saeed-pay-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      // Show popular results when no query
      setResults(SEARCH_DATA.filter(item => item.priority >= 8).slice(0, 6));
      setSelectedIndex(0);
      return;
    }

    // Fuzzy search implementation
    const searchResults = SEARCH_DATA.filter(item => {
      const searchTerms = query.toLowerCase().split(' ');
      const searchableText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
      
      return searchTerms.every(term => 
        searchableText.includes(term) || 
        item.keywords.some(keyword => keyword.includes(term))
      );
    });

    // Sort by relevance and priority
    searchResults.sort((a, b) => {
      const aRelevance = a.title.toLowerCase().includes(query.toLowerCase()) ? 10 : 0;
      const bRelevance = b.title.toLowerCase().includes(query.toLowerCase()) ? 10 : 0;
      return (bRelevance + b.priority) - (aRelevance + a.priority);
    });

    setResults(searchResults.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.requiresAuth && !isAuthenticated) {
      // Show login warning for protected routes
      return;
    }

    // Save to recent searches
    const newRecentSearches = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('saeed-pay-recent-searches', JSON.stringify(newRecentSearches));

    router.push(result.url);
    onClose();
    setQuery('');
  };

  const getCategoryTitle = (category: SearchResult['category']) => {
    switch (category) {
      case 'public': return 'صفحات عمومی';
      case 'dashboard': return 'داشبورد';
      case 'features': return 'ویژگی‌های جدید';
      case 'settings': return 'تنظیمات';
      case 'help': return 'راهنما و پشتیبانی';
    }
  };

  const getCategoryIcon = (category: SearchResult['category']) => {
    switch (category) {
      case 'public': return Home;
      case 'dashboard': return BarChart3;
      case 'features': return Zap;
      case 'settings': return Settings;
      case 'help': return HelpCircle;
    }
  };

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = [];
    }
    acc[result.category].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center min-h-screen pt-16 sm:pt-24 px-4">
        <div 
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="چه چیزی می‌خواهید پیدا کنید؟"
              className="border-0 focus-visible:ring-0 text-base sm:text-lg p-0 h-auto bg-transparent"
            />
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-500">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <ScrollArea className="max-h-96 sm:max-h-[500px]">
            <div className="p-2 sm:p-4">
              {!query && recentSearches.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 px-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    جستجوهای اخیر
                  </h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(search)}
                        className="w-full text-right px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!query && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3 px-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    پربازدیدترین‌ها
                  </h3>
                </div>
              )}

              {Object.entries(groupedResults).map(([category, categoryResults]) => {
                const CategoryIcon = getCategoryIcon(category as SearchResult['category']);
                
                return (
                  <div key={category} className="mb-4 sm:mb-6 last:mb-0">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 px-2 flex items-center gap-2">
                      <CategoryIcon className="w-4 h-4" />
                      {getCategoryTitle(category as SearchResult['category'])}
                    </h3>
                    <div className="space-y-1">
                      {categoryResults.map((result) => {
                        const globalIndex = results.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        const requiresLogin = result.requiresAuth && !isAuthenticated;

                        return (
                          <div
                            key={result.id}
                            onClick={() => handleResultClick(result)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                              isSelected 
                                ? 'bg-blue-50 border-blue-200 border' 
                                : 'hover:bg-gray-50'
                            } ${requiresLogin ? 'opacity-75' : ''}`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              <result.icon className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className={`font-medium truncate ${
                                  isSelected ? 'text-blue-900' : 'text-gray-900'
                                }`}>
                                  {result.title}
                                </h4>
                                {result.category === 'features' && (
                                  <Badge variant="secondary" className="text-xs shrink-0">
                                    <Star className="w-3 h-3 mr-1" />
                                    جدید
                                  </Badge>
                                )}
                                {requiresLogin && (
                                  <Badge variant="outline" className="text-xs shrink-0">
                                    <Lock className="w-3 h-3 mr-1" />
                                    ورود لازم
                                  </Badge>
                                )}
                              </div>
                              <p className={`text-sm truncate ${
                                isSelected ? 'text-blue-700' : 'text-gray-600'
                              }`}>
                                {result.description}
                              </p>
                            </div>

                            <ArrowRight className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-blue-600' : 'text-gray-400'
                            }`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {query && results.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">نتیجه‌ای یافت نشد</h3>
                  <p className="text-gray-600 mb-4">برای &ldquo;{query}&rdquo; نتیجه‌ای پیدا نکردیم</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => setQuery('')}>
                      پاک کردن جستجو
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      تماس با پشتیبانی
                    </Button>
                  </div>
                </div>
              )}

              {/* Login Warning for Protected Results */}
              {query && results.some(r => r.requiresAuth && !isAuthenticated) && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-900 mb-1">برخی نتایج نیاز به ورود دارند</h4>
                      <p className="text-sm text-amber-700 mb-3">
                        برای دسترسی به داشبورد و ویژگی‌های شخصی، ابتدا وارد حساب خود شوید.
                      </p>
                      <Button 
                        size="sm" 
                        onClick={() => router.push('/login')}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        ورود به حساب
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↓</kbd>
                  <span>انتخاب</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">Enter</kbd>
                  <span>باز کردن</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">Esc</kbd>
                  <span>بستن</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span>جستجو هوشمند سعید پی</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 