"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Store,
  Search,
  MapPin,
  Phone,
  Star,
  FilterX,
  ChevronDown,
  Tag,
  Clock
} from "lucide-react";

// نمونه داده برای فروشگاه‌ها
const MOCK_STORES = [
  {
    id: "1",
    name: "فروشگاه دیجی کالا",
    category: "لوازم الکترونیکی",
    address: "تهران، خیابان ولیعصر، مرکز خرید ...",
    phone: "021-12345678",
    rating: 4.5,
    distance: 2.5,
    logo: "/images/store-logo-1.png",
    isOpen: true,
    openHours: "۹ صبح تا ۹ شب",
    maxCredit: 50000000,
    creditTerms: "۳ تا ۲۴ ماهه",
    discount: "۵٪ تخفیف ویژه اعضای سعید پی",
    categories: ["لپ تاپ", "موبایل", "لوازم خانگی"]
  },
  {
    id: "2",
    name: "فروشگاه ایران کالا",
    category: "لوازم خانگی",
    address: "تهران، خیابان شریعتی، پلاک ۱۲۵",
    phone: "021-87654321",
    rating: 4.2,
    distance: 5.1,
    logo: "/images/store-logo-2.png",
    isOpen: true,
    openHours: "۱۰ صبح تا ۸ شب",
    maxCredit: 35000000,
    creditTerms: "۶ تا ۱۲ ماهه",
    discount: "۳٪ تخفیف ویژه اعضای سعید پی",
    categories: ["لوازم خانگی", "لوازم آشپزخانه", "صوتی و تصویری"]
  },
  {
    id: "3",
    name: "فروشگاه موبایل تهران",
    category: "موبایل و تبلت",
    address: "تهران، میدان ونک، پاساژ ...",
    phone: "021-22334455",
    rating: 4.8,
    distance: 1.3,
    logo: "/images/store-logo-3.png",
    isOpen: false,
    openHours: "۹ صبح تا ۱۰ شب",
    maxCredit: 20000000,
    creditTerms: "۳ تا ۶ ماهه",
    discount: "هدیه ویژه خریدهای بالای ۵ میلیون",
    categories: ["موبایل", "تبلت", "لوازم جانبی"]
  },
  {
    id: "4",
    name: "فروشگاه پارس لپ تاپ",
    category: "لپ تاپ و کامپیوتر",
    address: "تهران، خیابان میرداماد، پاساژ ...",
    phone: "021-33445566",
    rating: 4.0,
    distance: 3.7,
    logo: "/images/store-logo-4.png",
    isOpen: true,
    openHours: "۱۰ صبح تا ۹ شب",
    maxCredit: 40000000,
    creditTerms: "۶ تا ۱۸ ماهه",
    discount: "گارانتی ویژه اعضای سعید پی",
    categories: ["لپ تاپ", "قطعات کامپیوتر", "مانیتور"]
  },
];

// دسته‌بندی‌های فروشگاهی
const STORE_CATEGORIES = [
  "همه دسته‌بندی‌ها",
  "لوازم الکترونیکی",
  "لوازم خانگی",
  "موبایل و تبلت",
  "لپ تاپ و کامپیوتر",
  "صوتی و تصویری",
  "لوازم آشپزخانه"
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه دسته‌بندی‌ها");
  const [expandedStoreId, setExpandedStoreId] = useState<string | null>(null);
  
  // جستجو و فیلتر فروشگاه‌ها
  const filteredStores = MOCK_STORES.filter(store => {
    const matchesSearch = searchQuery === "" || 
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "همه دسته‌بندی‌ها" || 
      store.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const toggleStoreDetails = (id: string) => {
    setExpandedStoreId(expandedStoreId === id ? null : id);
  };
  
  return (
    <div className="space-y-8">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">فروشگاه‌های طرف قرارداد</h1>
        <p className="text-gray-600 mt-1">خرید اقساطی از فروشگاه‌های معتبر</p>
      </div>
      
      {/* جستجو و فیلتر */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="جستجوی نام یا آدرس فروشگاه..." 
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select 
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 w-full md:w-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {STORE_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            {(searchQuery || selectedCategory !== "همه دسته‌بندی‌ها") && (
              <Button 
                variant="ghost" 
                className="gap-1"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("همه دسته‌بندی‌ها");
                }}
              >
                <FilterX className="h-4 w-4" />
                حذف فیلترها
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* نتایج جستجو */}
      <div className="space-y-4">
        {filteredStores.length > 0 ? (
          <>
            <div className="text-sm text-gray-500">
              {filteredStores.length} فروشگاه یافت شد
            </div>
            
            <div className="space-y-6">
              {filteredStores.map(store => (
                <Card key={store.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
                  <CardContent className="p-0">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {store.logo ? (
                            <img 
                              src={store.logo} 
                              alt={store.name} 
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <Store className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
                            <div className="flex items-center mt-2 md:mt-0">
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star className="fill-amber-500 h-4 w-4" />
                                <span className="text-sm font-medium">{store.rating}</span>
                              </div>
                              <span className="mx-2 text-gray-300">|</span>
                              {store.isOpen ? (
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">باز است</span>
                              ) : (
                                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">بسته است</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Tag className="h-4 w-4" />
                              <span>{store.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{store.openHours}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />
                              <span>{store.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Phone className="h-4 w-4" />
                              <span>{store.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 flex-wrap">
                          {store.categories.map((category, index) => (
                            <span 
                              key={index} 
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto">
                          <Button 
                            variant="outline" 
                            className="flex-1 md:flex-none"
                            onClick={() => toggleStoreDetails(store.id)}
                          >
                            {expandedStoreId === store.id ? 'بستن جزئیات' : 'مشاهده جزئیات'}
                          </Button>
                          <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700">
                            خرید اقساطی
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {expandedStoreId === store.id && (
                      <div className="bg-blue-50 p-4 md:p-6 border-t border-blue-100">
                        <h4 className="font-medium text-gray-900 mb-4">شرایط خرید اقساطی</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <div className="text-sm text-gray-500 mb-2">سقف اعتبار</div>
                            <div className="font-bold text-blue-700">
                              {new Intl.NumberFormat("fa-IR").format(store.maxCredit)} تومان
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <div className="text-sm text-gray-500 mb-2">شرایط اقساط</div>
                            <div className="font-bold text-blue-700">{store.creditTerms}</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <div className="text-sm text-gray-500 mb-2">مزایای ویژه</div>
                            <div className="font-bold text-blue-700">{store.discount}</div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3">مراحل خرید اقساطی</h4>
                          <ol className="space-y-3">
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                ۱
                              </div>
                              <p className="text-gray-700">
                                ابتدا با استفاده از دکمه "خرید اقساطی" به صفحه فروشگاه مراجعه کنید.
                              </p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                ۲
                              </div>
                              <p className="text-gray-700">
                                کالای مورد نظر خود را انتخاب کرده و گزینه "خرید با سعید پی" را انتخاب کنید.
                              </p>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                                ۳
                              </div>
                              <p className="text-gray-700">
                                تعداد اقساط و شرایط پرداخت را انتخاب کرده و خرید خود را نهایی کنید.
                              </p>
                            </li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="py-12 text-center bg-white rounded-xl border border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Store className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">هیچ فروشگاهی یافت نشد</h3>
            <p className="text-gray-500">
              با تغییر معیارهای جستجو، فروشگاه‌های بیشتری را مشاهده کنید.
            </p>
            <Button
              variant="outline"
              className="mt-4 gap-1"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("همه دسته‌بندی‌ها");
              }}
            >
              <FilterX className="h-4 w-4" />
              حذف فیلترها
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 