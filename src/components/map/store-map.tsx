"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// نوع داده برای فروشگاه‌ها
interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: number;
  hasInstallment: boolean;
  logo: string;
  position?: [number, number]; // [latitude, longitude]
}

interface StoreMapProps {
  stores: Store[];
  onStoreSelect: (store: Store) => void;
}

// تعریف نوع برای Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LeafletMapType = any; // استفاده از any برای جلوگیری از خطاهای تایپ پیچیده با Leaflet

type LeafletBounds = {
  extend: (position: [number, number]) => void;
};

type LeafletMarker = {
  on: (event: string, handler: () => void) => void;
  closePopup: () => void;
  bindPopup: (content: string) => LeafletMarker;
  openPopup: () => LeafletMarker;
};

declare global {
  interface Window {
    L: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      map: (element: HTMLElement) => any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tileLayer: (url: string, options: Record<string, string>) => { addTo: (map: any) => void };
      divIcon: (options: Record<string, unknown>) => unknown;
      marker: (position: [number, number], options: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addTo: (map: any) => LeafletMarker;
        bindPopup: (content: string) => LeafletMarker;
        on: (event: string, handler: () => void) => void;
      };
      latLngBounds: (positions: [number, number][]) => LeafletBounds;
    };
  }
}

export default function StoreMap({ stores, onStoreSelect }: StoreMapProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<LeafletMapType | null>(null);
  
  // استفاده از useMemo برای جلوگیری از تغییر مداوم مقدار userLocation در هر رندر
  const userLocation = useMemo<[number, number]>(() => [35.778586975947654, 51.42390575184985], []);
  
  // فیلتر کردن فروشگاه‌ها بر اساس داشتن موقعیت و مرتب‌سازی بر اساس فاصله
  const nearbyStores = stores
    .filter(store => store.position)
    .sort((a, b) => a.distance - b.distance);

  // بارگذاری Leaflet
  useEffect(() => {
    // لود کردن CSS و JS فقط یک بار
    if (!document.getElementById('leaflet-css')) {
      const cssLink = document.createElement('link');
      cssLink.id = 'leaflet-css';
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
    }

    if (!window.L && !document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setMapInitialized(true);
      };
      document.head.appendChild(script);
    } else if (window.L) {
      setMapInitialized(true);
    }

    // تمیز کردن در زمان unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
    };
  }, []);

  // مقداردهی اولیه نقشه پس از لود شدن Leaflet
  useEffect(() => {
    if (!mapInitialized || !mapRef.current || !window.L) {
      return;
    }

    try {
      // ایجاد نقشه
      const L = window.L;
      
      // اگر قبلاً نقشه ایجاد شده، آن را حذف کنیم
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
      
      // ایجاد نقشه جدید
      const map = L.map(mapRef.current).setView(userLocation, 13);
      leafletMap.current = map;
      
      // اضافه کردن لایه نقشه
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      
      // اضافه کردن مارکر موقعیت کاربر
      const userIcon = L.divIcon({
        html: `<div style="background-color: #3b82f6; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
        className: 'user-location-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      const userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map);
      userMarker.bindPopup('موقعیت شما').openPopup();
      
      // اضافه کردن مارکر برای هر فروشگاه
      const markers: LeafletMarker[] = [];
      nearbyStores.forEach((store, index) => {
        if (!store.position) return;
        
        // ایجاد آیکون سفارشی برای فروشگاه
        const storeIcon = L.divIcon({
          html: `
            <div style="background-color: white; width: 28px; height: 28px; border-radius: 50%; border: 2px solid #ef4444; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 5px rgba(0,0,0,0.3);">
              <span style="color: #ef4444; font-weight: bold; font-size: 12px;">${index + 1}</span>
            </div>
          `,
          className: 'store-marker',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
        
        // اضافه کردن مارکر به نقشه
        const marker = L.marker(store.position, { icon: storeIcon }).addTo(map);
        
        // اضافه کردن پاپ‌آپ با اطلاعات فروشگاه
        marker.bindPopup(`
          <div dir="rtl" style="font-family: IranSansX, sans-serif; text-align: right; min-width: 200px;">
            <h3 style="margin: 0 0 5px; font-size: 16px;">${store.name}</h3>
            <p style="margin: 0 0 5px; font-size: 12px; color: #666;">${store.category}</p>
            <p style="margin: 0 0 8px; font-size: 12px;">${store.distance.toFixed(1)} کیلومتر از شما</p>
            <button id="select-store-${store.id}" style="width: 100%; padding: 5px; background-color: #1A3C69; color: white; border: none; border-radius: 4px; cursor: pointer;">مشاهده جزئیات</button>
          </div>
        `);
        
        // اضافه کردن رویداد کلیک به مارکر
        marker.on('click', () => {
          setSelectedStore(store);
          onStoreSelect(store);
        });
        
        // اضافه کردن رویداد به پاپ‌آپ
        marker.on('popupopen', () => {
          setTimeout(() => {
            const button = document.getElementById(`select-store-${store.id}`);
            if (button) {
              button.addEventListener('click', () => {
                setSelectedStore(store);
                onStoreSelect(store);
                marker.closePopup();
              });
            }
          }, 10);
        });
        
        markers.push(marker);
      });
      
      // تنظیم محدوده نقشه برای نمایش همه مارکرها
      if (nearbyStores.length > 0) {
        const bounds = L.latLngBounds([userLocation]);
        nearbyStores.forEach(store => {
          if (store.position) {
            bounds.extend(store.position);
          }
        });
        map.fitBounds(bounds, { padding: [30, 30] });
      }
      
      // اضافه کردن استایل برای مارکرها
      const style = document.createElement('style');
      style.textContent = `
        .user-location-marker {
          position: relative;
        }
        .user-location-marker::after {
          content: '';
          position: absolute;
          width: 30px;
          height: 30px;
          top: -3px;
          left: -3px;
          background-color: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          z-index: -1;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .store-marker:hover {
          transform: scale(1.1);
          transition: transform 0.2s;
        }
      `;
      document.head.appendChild(style);
      
    } catch (error) {
      console.error("Error initializing Leaflet map:", error);
    }
  }, [mapInitialized, nearbyStores, onStoreSelect, userLocation]);

  // انتخاب فروشگاه از لیست
  const handleStoreClick = (store: Store) => {
    setSelectedStore(store);
    onStoreSelect(store);
    
    // حرکت نقشه به سمت فروشگاه انتخاب شده
    if (leafletMap.current && store.position) {
      leafletMap.current.setView(store.position, 15);
    }
  };

  return (
    <div className="space-y-3">
      {/* نقشه واقعی */}
      <div className="h-64 rounded-lg overflow-hidden border border-border relative">
        <div ref={mapRef} className="w-full h-full">
          {!mapInitialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary-light">
              <div className="text-center">
                <Navigation className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
                <p className="text-secondary">در حال آماده‌سازی نقشه...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* لیست فروشگاه‌ها */}
      <h3 className="text-sm font-medium mt-4">فروشگاه‌های نزدیک شما</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {nearbyStores.slice(0, 6).map((store, index) => (
          <div 
            key={store.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedStore?.id === store.id 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleStoreClick(store)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md overflow-hidden bg-secondary-light relative flex-shrink-0 flex items-center justify-center">
                <span className="absolute top-0 left-0 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center">{index + 1}</span>
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{store.name}</h4>
                <p className="text-xs text-secondary">{store.distance.toFixed(1)} کیلومتر • {store.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* نمایش جزئیات فروشگاه انتخاب شده */}
      {selectedStore && (
        <div className="mt-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <h3 className="font-bold text-lg mb-2 text-primary">{selectedStore.name}</h3>
          <p className="text-sm mb-2">{selectedStore.category}</p>
          <div className="flex items-start gap-2 mb-2">
            <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm">{selectedStore.address}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-primary font-medium">{selectedStore.distance.toFixed(1)} کیلومتر از شما</span>
            {selectedStore.hasInstallment && (
              <span className="text-xs px-2 py-1 bg-accent-light text-accent rounded-full">
                قابل خرید اقساطی
              </span>
            )}
          </div>
          <Button className="w-full mt-3">مشاهده محصولات این فروشگاه</Button>
        </div>
      )}
    </div>
  );
} 