"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Leaflet CSS in the component to avoid SSR issues
import 'leaflet/dist/leaflet.css';

// نوع داده برای leaflet event
interface LocationEvent {
  latlng: {
    lat: number;
    lng: number;
  }
}

// نوع داده برای آیکون‌های نقشه
interface MapIcons {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storeIcon: any; // استفاده از any تا مشکل حل شود
}

// این کامپوننت به صورت داینامیک لود می‌شود تا مشکل SSR با Leaflet نداشته باشیم
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

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

// Dynamic LocationMarker component
const LocationMarker = dynamic(
  () => import("react-leaflet").then((mod) => {
    // Create and return the LocationMarker component
    return function LocationMarkerComponent({ onLocationFound }: { onLocationFound: (lat: number, lng: number) => void }) {
      // Now we can safely use useMap() because it's loaded in the browser context
      const map = mod.useMap();
      
      useEffect(() => {
        map.locate({
          setView: true,
          maxZoom: 14
        });
        
        map.on('locationfound', (e: LocationEvent) => {
          onLocationFound(e.latlng.lat, e.latlng.lng);
        });
        
        map.on('locationerror', () => {
          // در صورت عدم دسترسی به موقعیت، تهران را به عنوان مرکز نقشه تنظیم می‌کنیم
          map.setView([35.6892, 51.3890], 12);
          onLocationFound(35.6892, 51.3890);
        });
        
        return () => {
          map.off('locationfound');
          map.off('locationerror');
        };
      }, [map, onLocationFound]);
      
      return null;
    };
  }),
  { ssr: false }
);

// کامپوننت اصلی نقشه
interface StoreMapProps {
  stores: Store[];
  onStoreSelect: (store: Store) => void;
}

export default function StoreMap({ stores, onStoreSelect }: StoreMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [storesWithPositions, setStoresWithPositions] = useState<(Store & { position: [number, number] })[]>([]);
  const mapIconsRef = useRef<MapIcons | null>(null);
  
  // تبدیل فروشگاه‌ها به فرمت مناسب برای نقشه
  useEffect(() => {
    if (userLocation) {
      const mappedStores = stores.map(store => {
        // تولید موقعیت تصادفی نزدیک به موقعیت کاربر برای نمایش در نقشه (در حالت واقعی از API دریافت می‌شود)
        if (!store.position) {
          const randomOffset = () => (Math.random() - 0.5) * 0.02 * store.distance;
          return {
            ...store,
            position: [
              userLocation[0] + randomOffset(),
              userLocation[1] + randomOffset()
            ] as [number, number]
          };
        }
        return store;
      }).filter(store => store.position) as (Store & { position: [number, number] })[];
      
      setStoresWithPositions(mappedStores);
    }
  }, [userLocation, stores]);
  
  // آماده‌سازی آیکون‌های نقشه
  useEffect(() => {
    // Only import and use Leaflet in the browser
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        mapIconsRef.current = {
          storeIcon: L.divIcon({
            className: 'store-marker',
            html: '<div class="store-marker-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></div>',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          })
        };
      });
    }
  }, []);
  
  const handleLocationFound = (lat: number, lng: number) => {
    setUserLocation([lat, lng]);
    setIsMapReady(true);
  };
  
  // اگر نقشه هنوز آماده نیست، placeholder نمایش دهیم
  if (!isMapReady) {
    return (
      <div className="h-64 bg-secondary-light rounded-lg border border-border flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-8 w-8 text-primary mx-auto mb-2 animate-pulse" />
          <p className="text-secondary">در حال دریافت موقعیت شما...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-64 rounded-lg overflow-hidden border border-border relative">
      <MapContainer 
        center={userLocation || [35.6892, 51.3890]} 
        zoom={13} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker onLocationFound={handleLocationFound} />
        
        {storesWithPositions.map(store => (
          <Marker 
            key={store.id}
            position={store.position}
            icon={mapIconsRef.current?.storeIcon}
          >
            <Popup className="store-popup">
              <div className="p-2">
                <h3 className="font-medium text-sm">{store.name}</h3>
                <p className="text-xs text-secondary mt-1">{store.category}</p>
                <p className="text-xs mt-1">{store.address}</p>
                <p className="text-xs text-primary mt-1">{store.distance.toFixed(1)} کیلومتر از شما</p>
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full mt-2 text-xs"
                  onClick={() => onStoreSelect(store)}
                >
                  مشاهده جزئیات
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 