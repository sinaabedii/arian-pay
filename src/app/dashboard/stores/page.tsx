"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ShoppingBag,
  Globe,
  ExternalLink,
  Navigation,
  Star,
  Filter,
  ChevronDown,
  X,
  CreditCard,
  Wallet,
  Trophy,
  ChevronLeft,
  Clock,
  MapIcon,
  Zap,
  Settings,
  RefreshCw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/lib/store/auth-store";
import dynamic from "next/dynamic";

interface PhysicalStore {
  id: string;
  name: string;
  logo: string;
  category: string;
  address: string;
  distance: number;
  hasInstallment: boolean;
  hasCashback: boolean;
  rating: number;
  isOnline: boolean;
  position?: [number, number];
}

interface OnlineStore {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
  hasCashback: boolean;
  rating: number;
}

interface FilterState {
  onlineStores: boolean;
  physicalStores: boolean;
  selectedCity: string;
  hasCashback: boolean;
}

interface WalletType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  available: boolean;
}

const StoreMap = dynamic(() => import("@/components/map/store-map"), {
  ssr: false,
  loading: () => (
    <div className="h-64 sm:h-80 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center">
      <div className="text-center">
        <Navigation className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
        <p className="text-gray-900 font-medium">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

const CITIES = [
  "تهران",
  "مشهد", 
  "اصفهان",
  "شیراز",
  "کرج",
  "تبریز",
  "قم",
  "اهواز"
];

const WALLET_TYPES: WalletType[] = [
  {
    id: "shopping_credit",
    name: "تسهیلات خرید کالا و خدمات نارا",
    description: "خرید آسان با اعتبار نارا",
    icon: ShoppingBag,
    color: "text-blue-600",
    available: true,
  },
  {
    id: "cashback_wallet", 
    name: "کیف پول (نارا) برگشت نقدی",
    description: "دریافت برگشت وجه خریدها",
    icon: Wallet,
    color: "text-orange-600",
    available: true,
  },
  {
    id: "refund_wallet",
    name: "کیف برگشت وجه (کیس یکی)",
    description: "مدیریت برگشت وجه",
    icon: RefreshCw,
    color: "text-purple-600", 
    available: false,
  },
  {
    id: "credit_balance",
    name: "اعتبار خرید نارا",
    description: "اعتبار خرید از فروشگاه‌های طرف قرارداد",
    icon: CreditCard,
    color: "text-green-600",
    available: true,
  },
];

const MOCK_CATEGORIES = [
  { id: "supermarket", name: "سوپرمارکت", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { id: "electronics", name: "الکترونیک", icon: Zap, color: "bg-purple-100 text-purple-600" },
  { id: "fashion", name: "مد و پوشاک", icon: Settings, color: "bg-pink-100 text-pink-600" },
  { id: "restaurant", name: "رستوران", icon: Clock, color: "bg-orange-100 text-orange-600" },
  { id: "pharmacy", name: "داروخانه", icon: MapIcon, color: "bg-green-100 text-green-600" },
  { id: "services", name: "خدمات", icon: Trophy, color: "bg-indigo-100 text-indigo-600" },
];

const MOCK_ONLINE_STORES: OnlineStore[] = [
  {
    id: "1",
    name: "دیجی کالا",
    logo: "🛒",
    category: "فروشگاه آنلاین",
    description: "بزرگترین فروشگاه آنلاین ایران",
    website: "https://digikala.com",
    hasCashback: true,
    rating: 4.6,
  },
  {
    id: "2", 
    name: "بامیلو",
    logo: "🛍️",
    category: "فروشگاه آنلاین",
    description: "خرید آنلاین محصولات با تخفیف",
    website: "https://bamilo.com",
    hasCashback: false,
    rating: 4.2,
  },
  {
    id: "3",
    name: "ایرانیان مال",
    logo: "🏬",
    category: "مرکز خرید آنلاین",
    description: "بزرگترین مرکز خرید ایران",
    website: "https://iranianmall.com",
    hasCashback: true,
    rating: 4.4,
  },
  {
    id: "4",
    name: "اُکالا",
    logo: "🥬",
    category: "سوپرمارکت آنلاین",
    description: "خرید آنلاین مواد غذایی و کالاهای روزانه",
    website: "https://okala.com",
    hasCashback: true,
    rating: 4.3,
  },
];

const MOCK_PHYSICAL_STORES: PhysicalStore[] = [
  {
    id: "1",
    name: "هایپر استار",
    logo: "🏪",
    category: "هایپرمارکت",
    address: "تهران، ایران مال، طبقه همکف",
    distance: 1.2,
    hasInstallment: true,
    hasCashback: true,
    rating: 4.5,
    isOnline: false,
    position: [35.7219, 51.3347],
  },
  {
    id: "2",
    name: "افق کوروش",
    logo: "🏬",
    category: "فروشگاه زنجیره‌ای",
    address: "تهران، میدان ونک، خیابان ونک",
    distance: 2.4,
    hasInstallment: true,
    hasCashback: false,
    rating: 4.3,
    isOnline: false,
    position: [35.7561, 51.409],
  },
  {
    id: "3",
    name: "پاساژ پالادیوم",
    logo: "🛍️",
    category: "مرکز خرید",
    address: "تهران، زعفرانیه، خیابان مقدس اردبیلی",
    distance: 3.5,
    hasInstallment: false,
    hasCashback: true,
    rating: 4.7,
    isOnline: false,
    position: [35.7967, 51.4128],
  },
  {
    id: "4",
    name: "دیجی‌کالا",
    logo: "📱",
    category: "فروشگاه اینترنتی",
    address: "تهران، خیابان گاندی جنوبی",
    distance: 4.8,
    hasInstallment: true,
    hasCashback: true,
    rating: 4.6,
    isOnline: true,
    position: [35.7575, 51.4104],
  },
  {
    id: "5",
    name: "بازار بزرگ تهران",
    logo: "🏪",
    category: "بازار سنتی",
    address: "تهران، محدوده بازار تهران",
    distance: 5.6,
    hasInstallment: false,
    hasCashback: false,
    rating: 4.1,
    isOnline: false,
    position: [35.6728, 51.4195],
  },
];

export default function StoresPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOnlineStores, setFilteredOnlineStores] = useState(MOCK_ONLINE_STORES);
  const [filteredPhysicalStores, setFilteredPhysicalStores] = useState(MOCK_PHYSICAL_STORES);
  const [activeTab, setActiveTab] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PhysicalStore | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    onlineStores: true,
    physicalStores: true,
    selectedCity: "تهران",
    hasCashback: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    let filteredOnline = MOCK_ONLINE_STORES;
    let filteredPhysical = MOCK_PHYSICAL_STORES;

    if (searchQuery) {
      filteredOnline = filteredOnline.filter(
        (store) =>
          store.name.includes(searchQuery) ||
          store.category.includes(searchQuery)
      );
      filteredPhysical = filteredPhysical.filter(
        (store) =>
          store.name.includes(searchQuery) ||
          store.category.includes(searchQuery) ||
          store.address.includes(searchQuery)
      );
    }

    if (filters.hasCashback) {
      filteredOnline = filteredOnline.filter(store => store.hasCashback);
      filteredPhysical = filteredPhysical.filter(store => store.hasCashback);
    }

    setFilteredOnlineStores(filteredOnline);
    setFilteredPhysicalStores(filteredPhysical);
  }, [searchQuery, filters]);

  const findNearbyStores = () => {
    setShowMap(true);
    setActiveTab("physical");
    setFilteredPhysicalStores(
      [...MOCK_PHYSICAL_STORES].sort((a, b) => a.distance - b.distance)
    );
  };

  const handleStoreSelect = (store: PhysicalStore) => {
    setSelectedStore(store);
    setTimeout(() => {
      document
        .getElementById("store-details")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      onlineStores: true,
      physicalStores: true,
      selectedCity: "تهران",
      hasCashback: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 max-w-7xl mx-auto">
        <div className="pt-2 sm:pt-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            فروشگاه‌ها
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            خرید آنلاین و حضوری با اعتبار سعید پی
          </p>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="جستجوی کالا و فروشگاه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 sm:pr-10 h-10 sm:h-11 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg sm:rounded-xl text-gray-800 text-sm"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="px-3 sm:px-4 h-10 sm:h-11 border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg sm:rounded-xl"
          >
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline mr-2">فیلتر</span>
          </Button>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 hidden sm:block">دسته‌بندی‌ها</h2>
          
          <div className="sm:hidden">
            <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
              <div className="flex gap-4 px-2">
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-2 text-lg">
                    🛒
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">دیجی کالا</span>
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-2 text-lg">
                    ☀️
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">خورشید سرا</span>
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-2 text-lg">
                    🍋
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">لیمو</span>
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-2 text-lg">
                    🏢
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">ری موون</span>
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-2 text-lg">
                    🌿
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">اسمارت دیس</span>
                </div>
                <div className="flex flex-col items-center min-w-0">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-lg">
                    💰
                  </div>
                  <span className="text-xs text-gray-900 text-center whitespace-nowrap">قهوه نیکو</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {MOCK_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold">
                پیدا کردن فروشگاه‌های نزدیک شما
              </h2>
              <p className="text-sm text-blue-100 mt-1">
                با استفاده از موقعیت مکانی شما، نزدیک‌ترین فروشگاه‌های طرف قرارداد را پیدا می‌کنیم
              </p>
            </div>
            <Button
              onClick={findNearbyStores}
              variant="secondary"
              className="gap-2 w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 h-9 sm:h-10 text-sm"
            >
              <MapPin size={16} />
              <span className="hidden sm:inline">نمایش فروشگاه‌های نزدیک</span>
              <span className="sm:hidden">فروشگاه‌های نزدیک</span>
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full bg-gray-100 p-1 rounded-lg sm:rounded-xl h-12 sm:h-auto">
            <TabsTrigger
              value="all"
              className="flex-1 text-gray-600 font-medium text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg h-9 sm:h-10"
            >
              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">همه فروشگاه‌ها</span>
              <span className="sm:hidden">همه</span>
            </TabsTrigger>
            <TabsTrigger
              value="online"
              className="flex-1 text-gray-600 font-medium text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg h-9 sm:h-10"
            >
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">فروشگاه‌های آنلاین</span>
              <span className="sm:hidden">آنلاین</span>
            </TabsTrigger>
            <TabsTrigger
              value="physical"
              className="flex-1 text-gray-600 font-medium text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=inactive]:hover:text-gray-800 data-[state=inactive]:hover:bg-gray-50 transition-all duration-200 rounded-lg h-9 sm:h-10"
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">فروشگاه‌های حضوری</span>
              <span className="sm:hidden">حضوری</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 sm:mt-6">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  فروشگاه‌های آنلاین
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredOnlineStores.slice(0, 6).map((store) => (
                    <OnlineStoreCard key={store.id} store={store} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  فروشگاه‌های حضوری
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {filteredPhysicalStores.slice(0, 4).map((store) => (
                    <PhysicalStoreCard
                      key={store.id}
                      store={store}
                      isSelected={selectedStore?.id === store.id}
                      onClick={() => setSelectedStore(store)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="online" className="mt-4 sm:mt-6">
            {filteredOnlineStores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                {filteredOnlineStores.map((store) => (
                  <OnlineStoreCard key={store.id} store={store} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-10 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <p className="text-gray-900 font-medium text-sm sm:text-base">فروشگاهی یافت نشد.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="physical" className="mt-4 sm:mt-6">
            {!showMap && (
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-gray-200 max-w-md w-full">
                  <MapPin className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    نمایش فروشگاه‌های نزدیک
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                    برای مشاهده فروشگاه‌های نزدیک خود روی دکمه زیر کلیک کنید.
                  </p>
                  <Button
                    onClick={findNearbyStores}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 h-9 sm:h-10 text-sm"
                  >
                    <MapPin size={16} />
                    نمایش فروشگاه‌ها روی نقشه
                  </Button>
                </div>
              </div>
            )}

            {showMap && (
              <div className="mb-4 sm:mb-6">
                <StoreMap 
                  stores={filteredPhysicalStores} 
                  onStoreSelect={handleStoreSelect}
                />
              </div>
            )}

            <div id="store-details" className="mt-6 sm:mt-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">
                فروشگاه‌های حضوری
              </h2>

              {filteredPhysicalStores.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {filteredPhysicalStores.map((store) => (
                    <PhysicalStoreCard
                      key={store.id}
                      store={store}
                      isSelected={selectedStore?.id === store.id}
                      onClick={() => setSelectedStore(store)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-10 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-50 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                    <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">فروشگاهی یافت نشد.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {isFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-2 sm:p-0">
            <div className="bg-white w-full sm:max-w-sm rounded-t-lg sm:rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-4 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                  فیلتر
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-medium text-gray-900">فروشگاه آنلاین</span>
                  <Switch
                    checked={filters.onlineStores}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, onlineStores: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm font-medium text-gray-900">فروشگاه حضوری</span>
                  <Switch
                    checked={filters.physicalStores}
                    onCheckedChange={(checked) =>
                      setFilters(prev => ({ ...prev, physicalStores: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-sm font-medium text-gray-900">انتخاب شهر</label>
                <div className="relative">
                  <select
                    value={filters.selectedCity}
                    onChange={(e) =>
                      setFilters(prev => ({ ...prev, selectedCity: e.target.value }))
                    }
                    className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none text-sm"
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium text-gray-900">دارای برگشت نقدی</span>
                <Switch
                  checked={filters.hasCashback}
                  onCheckedChange={(checked) =>
                    setFilters(prev => ({ ...prev, hasCashback: checked }))
                  }
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="text-sm font-medium text-gray-900">کیف ها</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {WALLET_TYPES.map((wallet) => (
                    <div
                      key={wallet.id}
                      className={`p-2.5 sm:p-3 border rounded-lg flex items-center gap-2.5 sm:gap-3 ${
                        wallet.available 
                          ? 'border-gray-200 bg-white hover:border-blue-300 cursor-pointer' 
                          : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center ${wallet.color} flex-shrink-0`}>
                        <wallet.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
                          {wallet.name}
                        </p>
                        <p className="text-xs text-gray-500 leading-tight truncate">
                          {wallet.description}
                        </p>
                      </div>
                      {wallet.available && (
                        <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400 h-9 sm:h-10 text-sm"
                >
                  پاک کردن
                </Button>
                <Button
                  onClick={applyFilters}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-9 sm:h-10 text-sm"
                >
                  اعمال فیلتر
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface OnlineStoreCardProps {
  store: OnlineStore;
}

function OnlineStoreCard({ store }: OnlineStoreCardProps) {
  return (
    <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group">
      <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <CardContent className="p-0">
        <div className="sm:hidden p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-lg flex-shrink-0">
              {store.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm truncate">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-600">{store.category}</p>
                </div>
                {store.hasCashback && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    برگشت نقدی
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-700">{store.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block p-4 sm:p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
              {store.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{store.category}</p>
                </div>
                {store.hasCashback && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium whitespace-nowrap">
                    برگشت نقدی
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-700 font-medium">{store.rating}</span>
                <span className="text-xs text-gray-500">(124 نظر)</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {store.description}
          </p>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
              <Globe className="h-3 w-3 text-blue-600" />
            </div>
            <span className="text-xs text-gray-600 truncate">
              {store.website.replace(/^https?:\/\//, "")}
            </span>
            <ExternalLink className="h-3 w-3 text-gray-400 flex-shrink-0" />
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-3 sm:p-5 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm h-8 sm:h-9"
            >
              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="sm:hidden">خرید</span>
              <span className="hidden sm:inline">خرید آنلاین</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex flex-1 border-gray-300 hover:border-blue-600 hover:text-blue-600"
            >
              <MapPin className="h-4 w-4 mr-2" />
              اطلاعات بیشتر
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface PhysicalStoreCardProps {
  store: PhysicalStore;
  isSelected?: boolean;
  onClick?: () => void;
}

function PhysicalStoreCard({
  store,
  isSelected = false,
  onClick,
}: PhysicalStoreCardProps) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-200 bg-white rounded-xl shadow-sm border hover:shadow-lg group ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-200"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      <div
        className={`h-1 bg-gradient-to-r ${
          isSelected 
            ? "from-blue-500 to-blue-600" 
            : "from-gray-300 to-gray-400 group-hover:from-blue-400 group-hover:to-blue-500"
        }`}
      ></div>
      <CardContent className="p-0">
        <div className="sm:hidden p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-lg flex-shrink-0">
              {store.logo}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {store.name}
                  </h3>
                  <p className="text-xs text-gray-600">{store.category}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {store.hasInstallment && (
                    <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium text-center">
                      اقساطی
                    </span>
                  )}
                  {store.hasCashback && (
                    <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium text-center">
                      برگشت
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-700">{store.rating}</span>
                </div>
                <span className="text-xs text-green-600 font-medium">
                  {store.distance.toFixed(1)} کیلومتر
                </span>
              </div>
              
              <p className="text-xs text-gray-600 mt-1 truncate">{store.address}</p>
            </div>
          </div>
        </div>

        <div className="hidden sm:block p-4 sm:p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
              {store.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{store.category}</p>
                </div>
                <div className="flex flex-col gap-1">
                  {store.hasInstallment && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium whitespace-nowrap">
                      خرید اقساطی
                    </span>
                  )}
                  {store.hasCashback && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium whitespace-nowrap">
                      برگشت نقدی
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-700 font-medium">{store.rating}</span>
                <span className="text-xs text-gray-500">(89 نظر)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{store.address}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                  <Navigation className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {store.distance.toFixed(1)} کیلومتر از شما
                </span>
              </div>
              
              {store.isOnline && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600 font-medium">آنلاین</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-3 sm:p-5 bg-gray-50">
          <div className="flex gap-2 sm:gap-3">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium text-sm h-8 sm:h-9"
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="sm:hidden">مسیر</span>
              <span className="hidden sm:inline">مسیریابی</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-300 hover:border-green-600 hover:text-green-600 text-sm h-8 sm:h-9"
            >
              <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="sm:hidden">خرید</span>
              <span className="hidden sm:inline">خرید حضوری</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
