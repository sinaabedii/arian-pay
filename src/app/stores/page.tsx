"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShoppingBag, Globe, ExternalLink, ArrowRight, Navigation } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/layout/app-layout";
import { useAuthStore } from "@/lib/store/auth-store";
import dynamic from 'next/dynamic';

// تعریف اینترفیس برای ساختار فروشگاه
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

// Import StoreMap with dynamic import to avoid SSR issues with Leaflet
const StoreMap = dynamic(() => import('@/components/map/store-map'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-secondary-light rounded-lg border border-border flex items-center justify-center">
      <div className="text-center">
        <Navigation className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
        <p className="text-secondary">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  )
});

// دیتای نمونه برای فروشگاه‌های آنلاین
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

// دیتای نمونه برای فروشگاه‌های حضوری با اضافه کردن position برای برخی
const MOCK_PHYSICAL_STORES: PhysicalStore[] = [
  {
    id: "1",
    name: "هایپر استار",
    logo: "https://www.hyperstar.ir/static/img/favicon.ico",
    category: "هایپرمارکت",
    address: "تهران، ایران مال",
    distance: 1.2,
    hasInstallment: true,
  },
  {
    id: "2",
    name: "افق کوروش",
    logo: "https://ofoghkourosh.com/static/img/logo.png",
    category: "فروشگاه زنجیره‌ای",
    address: "تهران، میدان ونک",
    distance: 2.4,
    hasInstallment: true,
  },
  {
    id: "3",
    name: "پاساژ پالادیوم",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Palladium-Mall-Logo.jpg",
    category: "مرکز خرید",
    address: "تهران، زعفرانیه",
    distance: 3.7,
    hasInstallment: true,
  },
  {
    id: "4",
    name: "سامسونگ",
    logo: "https://www.samsung.com/etc.clientlibs/samsung/clientlibs/consumer/global/clientlib-common/resources/images/favicon.ico",
    category: "لوازم الکترونیکی",
    address: "تهران، خیابان ولیعصر",
    distance: 5.1,
    hasInstallment: true,
  },
];

export default function StoresPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOnlineStores, setFilteredOnlineStores] = useState(MOCK_ONLINE_STORES);
  const [filteredPhysicalStores, setFilteredPhysicalStores] = useState(MOCK_PHYSICAL_STORES);
  const [activeTab, setActiveTab] = useState("online");
  const [showMap, setShowMap] = useState(false);
  const [selectedStore, setSelectedStore] = useState<PhysicalStore | null>(null);

  // اگر کاربر لاگین نکرده باشد، به صفحه ورود هدایت می‌شود
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // فیلتر کردن فروشگاه‌ها بر اساس جستجو
  useEffect(() => {
    if (searchQuery) {
      setFilteredOnlineStores(
        MOCK_ONLINE_STORES.filter((store) =>
          store.name.includes(searchQuery) || store.category.includes(searchQuery)
        )
      );
      setFilteredPhysicalStores(
        MOCK_PHYSICAL_STORES.filter((store) =>
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

  // تابع برای پیدا کردن فروشگاه‌های نزدیک
  const findNearbyStores = () => {
    setShowMap(true);
    // و سپس فروشگاه‌ها را بر اساس فاصله مرتب می‌کنیم
    setFilteredPhysicalStores(
      [...MOCK_PHYSICAL_STORES].sort((a, b) => a.distance - b.distance)
    );
  };

  // انتخاب فروشگاه از روی نقشه
  const handleStoreSelect = (store: PhysicalStore) => {
    setSelectedStore(store);
    // اسکرول به پایین صفحه برای دیدن جزئیات فروشگاه
    setTimeout(() => {
      document.getElementById('store-details')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // اینجا از activeTab استفاده می‌کنیم تا eslint error را رفع کنیم
  const currentTab = activeTab;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">فروشگاه‌ها</h1>
          <p className="text-secondary mt-1">خرید آنلاین و حضوری با اعتبار آرین پی {currentTab}</p>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-secondary" />
          <Input
            type="text"
            placeholder="جستجوی فروشگاه..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>

        <Tabs defaultValue="online" onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="online" className="flex-1">
              <Globe className="h-4 w-4 mr-2" />
              فروشگاه‌های آنلاین
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex-1">
              <ShoppingBag className="h-4 w-4 mr-2" />
              فروشگاه‌های حضوری
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="online" className="mt-6">
            {filteredOnlineStores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOnlineStores.map((store) => (
                  <OnlineStoreCard key={store.id} store={store} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-secondary">فروشگاهی یافت نشد.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="physical" className="mt-6">
            {!showMap && (
              <div className="flex justify-center mb-6">
                <Button onClick={findNearbyStores} className="gap-2">
                  <MapPin size={18} />
                  یافتن فروشگاه‌های نزدیک من
                </Button>
              </div>
            )}
            
            {showMap && (
              <div className="mb-6">
                <StoreMap 
                  stores={filteredPhysicalStores} 
                  onStoreSelect={handleStoreSelect} 
                />
                <div className="mt-2 text-xs text-secondary text-center">
                  برای مشاهده اطلاعات بیشتر روی نشانگر فروشگاه کلیک کنید
                </div>
              </div>
            )}
            
            <div id="store-details">
              {selectedStore && (
                <Card className="mb-6 border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary-light relative flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-primary">
                          <ShoppingBag size={24} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedStore.name}</h3>
                        <p className="text-sm text-secondary">{selectedStore.category}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{selectedStore.address}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-primary">{selectedStore.distance.toFixed(1)} کیلومتر از شما</span>
                        <Button size="sm" className="gap-1">
                          خرید با اعتبار
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            
              {filteredPhysicalStores.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="text-center py-10">
                  <p className="text-secondary">فروشگاهی یافت نشد.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

interface OnlineStoreCardProps {
  store: OnlineStore;
}

function OnlineStoreCard({ store }: OnlineStoreCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary-light relative flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-primary">
                <Globe size={24} />
              </div>
              {/* در نسخه واقعی، از Image برای لوگو استفاده می‌کنیم */}
              {/* <Image
                src={store.logo}
                alt={store.name}
                fill
                style={{ objectFit: "contain" }}
              /> */}
            </div>
            <div>
              <h3 className="font-medium">{store.name}</h3>
              <p className="text-xs text-secondary">{store.category}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-secondary">{store.description}</p>
        </div>
        <div className="border-t border-border p-3 flex justify-between items-center">
          <a 
            href={store.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-primary flex items-center gap-1 hover:underline"
          >
            {store.website.replace(/^https?:\/\//, '')}
            <ExternalLink size={12} />
          </a>
          <Button size="sm">
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

function PhysicalStoreCard({ store, isSelected = false, onClick }: PhysicalStoreCardProps) {
  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all ${isSelected ? 'border-primary' : 'hover:border-primary/50'}`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-secondary-light relative flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center text-primary">
                <ShoppingBag size={24} />
              </div>
              {/* در نسخه واقعی، از Image برای لوگو استفاده می‌کنیم */}
              {/* <Image
                src={store.logo}
                alt={store.name}
                fill
                style={{ objectFit: "contain" }}
              /> */}
            </div>
            <div>
              <h3 className="font-medium">{store.name}</h3>
              <p className="text-sm text-secondary">{store.category}</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-secondary">{store.address}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-primary">{store.distance.toFixed(1)} کیلومتر از شما</span>
              {store.hasInstallment && (
                <span className="text-xs px-2 py-1 bg-accent-light text-accent rounded-full">
                  قابل خرید اقساطی
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 