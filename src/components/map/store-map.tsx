"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Navigation } from "lucide-react";

// نوع داده برای فروشگاه‌ها
interface Store {
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
          onStoreSelect(store);
        });
        
        // اضافه کردن رویداد به پاپ‌آپ
        marker.on('popupopen', () => {
          setTimeout(() => {
            const button = document.getElementById(`select-store-${store.id}`);
            if (button) {
              button.addEventListener('click', () => {
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

  return (
    <div className="space-y-3">
      {/* نقشه واقعی */}
      <div className="h-64 sm:h-80 rounded-lg overflow-hidden border border-gray-200 relative">
        <div ref={mapRef} className="w-full h-full">
          {!mapInitialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
              <div className="text-center">
                <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
                <p className="text-gray-900 font-medium text-sm sm:text-base">در حال بارگذاری نقشه...</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        برای مشاهده اطلاعات بیشتر روی نشانگر فروشگاه کلیک کنید
      </div>
    </div>
  );
} 