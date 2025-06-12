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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  position?: [number, number];
}

interface OnlineStore {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  website: string;
}

const StoreMap = dynamic(() => import("@/components/map/store-map"), {
  ssr: false,
  loading: () => (
    <div className="h-64 sm:h-80 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
      <div className="text-center">
        <Navigation className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
        <p className="text-gray-600">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

const MOCK_ONLINE_STORES: OnlineStore[] = [
  {
    id: "1",
    name: "دیجی کالا",
    logo: "https://dkstatics-public.digikala.com/digikala-favicon.ico",
    category: "فروشگاه آنلاین",
    description: "بزرگترین فروشگاه آنلاین ایران",
    website: "https://digikala.com",
  },
  {
    id: "2",
    name: "بامیلو",
    logo: "https://www.bamilo.com/favicon.ico",
    category: "فروشگاه آنلاین",
    description: "خرید آنلاین محصولات با تخفیف",
    website: "https://bamilo.com",
  },
  {
    id: "3",
    name: "ایرانیان مال",
    logo: "https://iranicard.ir/wp-content/uploads/2019/05/iranmall.png",
    category: "مرکز خرید آنلاین",
    description: "بزرگترین مرکز خرید ایران",
    website: "https://iranianmall.com",
  },
  {
    id: "4",
    name: "اُکالا",
    logo: "https://www.okcs.com/wp-content/uploads/2017/10/okala-icon-50x50.png",
    category: "سوپرمارکت آنلاین",
    description: "خرید آنلاین مواد غذایی و کالاهای روزانه",
    website: "https://okala.com",
  },
];

const MOCK_PHYSICAL_STORES: PhysicalStore[] = [
  {
    id: "1",
    name: "هایپر استار",
    logo: "https://www.hyperstar.ir/static/img/favicon.ico",
    category: "هایپرمارکت",
    address: "تهران، ایران مال، طبقه همکف",
    distance: 1.2,
    hasInstallment: true,
    position: [35.7219, 51.3347], // موقعیت واقعی ایران مال
  },
  {
    id: "2",
    name: "افق کوروش",
    logo: "https://ofoghkourosh.com/static/img/logo.png",
    category: "فروشگاه زنجیره‌ای",
    address: "تهران، میدان ونک، خیابان ونک",
    distance: 2.4,
    hasInstallment: true,
    position: [35.7561, 51.409], // موقعیت واقعی میدان ونک
  },
  {
    id: "3",
    name: "پاساژ پالادیوم",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Palladium_Mall_Logo.png/220px-Palladium_Mall_Logo.png",
    category: "مرکز خرید",
    address: "تهران، زعفرانیه، خیابان مقدس اردبیلی",
    distance: 3.5,
    hasInstallment: false,
    position: [35.7967, 51.4128], // موقعیت واقعی پالادیوم
  },
  {
    id: "4",
    name: "دیجی‌کالا",
    logo: "https://dkstatics-public.digikala.com/digikala-favicon.ico",
    category: "فروشگاه اینترنتی",
    address: "تهران، خیابان گاندی جنوبی",
    distance: 4.8,
    hasInstallment: true,
    position: [35.7575, 51.4104], // موقعیت تقریبی دفتر دیجی‌کالا
  },
  {
    id: "5",
    name: "بازار بزرگ تهران",
    logo: "/banks/default.svg",
    category: "بازار سنتی",
    address: "تهران، محدوده بازار تهران",
    distance: 5.6,
    hasInstallment: false,
    position: [35.6728, 51.4195], // موقعیت واقعی بازار تهران
  },
  {
    id: "6",
    name: "فروشگاه رفاه",
    logo: "https://www.refah.ir/uploads/refah-logo.png",
    category: "فروشگاه زنجیره‌ای",
    address: "تهران، میدان صادقیه",
    distance: 6.2,
    hasInstallment: true,
    position: [35.7235, 51.3473], // موقعیت تقریبی صادقیه
  },
  {
    id: "7",
    name: "مجتمع تجاری کوروش",
    logo: "/banks/default.svg",
    category: "مرکز خرید",
    address: "تهران، اتوبان ستاری، نبش پیامبر مرکزی",
    distance: 7.5,
    hasInstallment: true,
    position: [35.7464, 51.3401], // موقعیت واقعی مجتمع کوروش
  },
  {
    id: "8",
    name: "فروشگاه شهروند",
    logo: "https://shahrvand.ir/wp-content/uploads/2020/07/cropped-favicon-1-32x32.png",
    category: "فروشگاه زنجیره‌ای",
    address: "تهران، میدان آرژانتین",
    distance: 8.1,
    hasInstallment: true,
    position: [35.7616, 51.41], // موقعیت تقریبی آرژانتین
  },
];

export default function StoresPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOnlineStores, setFilteredOnlineStores] =
    useState(MOCK_ONLINE_STORES);
  const [filteredPhysicalStores, setFilteredPhysicalStores] =
    useState(MOCK_PHYSICAL_STORES);
  const [activeTab, setActiveTab] = useState("online");
  const [showMap, setShowMap] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PhysicalStore | null>(
    null
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredOnlineStores(
        MOCK_ONLINE_STORES.filter(
          (store) =>
            store.name.includes(searchQuery) ||
            store.category.includes(searchQuery)
        )
      );
      setFilteredPhysicalStores(
        MOCK_PHYSICAL_STORES.filter(
          (store) =>
            store.name.includes(searchQuery) ||
            store.category.includes(searchQuery) ||
            store.address.includes(searchQuery)
        )
      );
    } else {
      setFilteredOnlineStores(MOCK_ONLINE_STORES);
      setFilteredPhysicalStores(MOCK_PHYSICAL_STORES);
    }
  }, [searchQuery]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div className="pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            فروشگاه‌ها
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            خرید آنلاین و حضوری با اعتبار سعید پی
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-medium text-blue-900">
                پیدا کردن فروشگاه‌های نزدیک شما
              </h2>
              <p className="text-sm text-blue-700 mt-1">
                با استفاده از موقعیت مکانی شما، نزدیک‌ترین فروشگاه‌های طرف
                قرارداد را پیدا می‌کنیم
              </p>
            </div>
            <Button
              onClick={findNearbyStores}
              className="gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              <MapPin size={18} />
              <span className="hidden sm:inline">نمایش فروشگاه‌های نزدیک</span>
              <span className="sm:hidden">فروشگاه‌های نزدیک</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="جستجوی فروشگاه..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl"
          />
        </div>

        <Tabs
          defaultValue="online"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="online"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">فروشگاه‌های آنلاین</span>
              <span className="sm:hidden">آنلاین</span>
            </TabsTrigger>
            <TabsTrigger
              value="physical"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">فروشگاه‌های حضوری</span>
              <span className="sm:hidden">حضوری</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="mt-6">
            {filteredOnlineStores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredOnlineStores.map((store) => (
                  <OnlineStoreCard key={store.id} store={store} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">فروشگاهی یافت نشد.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="physical" className="mt-6">
            {!showMap && (
              <div className="flex justify-center mb-6">
                <div className="text-center p-6 bg-white rounded-xl border border-gray-200 max-w-md w-full">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    نمایش فروشگاه‌های نزدیک
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    برای مشاهده فروشگاه‌های نزدیک خود روی دکمه زیر کلیک کنید. به
                    موقعیت مکانی شما نیاز داریم.
                  </p>
                  <Button
                    onClick={findNearbyStores}
                    className="gap-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <MapPin size={18} />
                    نمایش فروشگاه‌ها روی نقشه
                  </Button>
                </div>
              </div>
            )}

            {showMap && (
              <div className="mb-6">
                <StoreMap
                  stores={filteredPhysicalStores}
                  onStoreSelect={handleStoreSelect}
                />
                <div className="mt-2 text-xs text-gray-500 text-center">
                  برای مشاهده اطلاعات بیشتر روی نشانگر فروشگاه کلیک کنید
                </div>
              </div>
            )}

            <div id="store-details" className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                فروشگاه‌های حضوری
              </h2>

              {filteredPhysicalStores.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
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
                <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">فروشگاهی یافت نشد.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface OnlineStoreCardProps {
  store: OnlineStore;
}

function OnlineStoreCard({ store }: OnlineStoreCardProps) {
  return (
    <Card className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <CardContent className="p-0">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 relative flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-blue-600">
                <Globe size={24} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 truncate">
                {store.name}
              </h3>
              <p className="text-xs text-gray-500">{store.category}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{store.description}</p>
        </div>
        <div className="border-t border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <a
            href={store.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
          >
            {store.website.replace(/^https?:\/\//, "")}
            <ExternalLink size={12} />
          </a>
          <Button
            size="sm"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            خرید آنلاین
          </Button>
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
      className={`overflow-hidden cursor-pointer transition-all bg-white rounded-xl shadow-sm border hover:shadow-md ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-200"
          : "border-gray-200 hover:border-blue-300"
      }`}
      onClick={onClick}
    >
      <div
        className={`h-1 bg-gradient-to-r ${
          isSelected ? "from-blue-500 to-blue-600" : "from-gray-300 to-gray-400"
        }`}
      ></div>
      <CardContent className="p-0">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 relative flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-blue-600">
                <ShoppingBag size={24} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900">{store.name}</h3>
              <p className="text-sm text-gray-500">{store.category}</p>
            </div>
            {store.hasInstallment && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full whitespace-nowrap">
                قابل خرید اقساطی
              </span>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">{store.address}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-600 font-medium">
                {store.distance.toFixed(1)} کیلومتر از شما
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">4.5</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
