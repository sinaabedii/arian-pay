declare module 'leaflet' {
  export interface DivIcon {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    _unused?: unknown; // Placeholder to satisfy ESLint, this is just for type compatibility
  }
  
  export interface LatLng {
    lat: number;
    lng: number;
  }
  
  export interface MapOptions {
    setView?: boolean;
    maxZoom?: number;
  }
  
  export interface DivIconOptions {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
  }
  
  export function divIcon(options: DivIconOptions): DivIcon;
}

declare module 'react-leaflet' {
  import { ComponentType, ReactNode } from 'react';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import * as L from 'leaflet';

  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    className?: string;
    children?: ReactNode;
  }

  export const MapContainer: ComponentType<MapContainerProps>;
  export const TileLayer: ComponentType<{
    attribution: string;
    url: string;
  }>;
  export const Marker: ComponentType<{
    position: [number, number];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: any;
    children?: ReactNode;
  }>;
  export const Popup: ComponentType<{
    className?: string;
    children?: ReactNode;
  }>;
  export function useMap(): {
    locate: (options: MapOptions) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (event: string, handler: any) => void;
    off: (event: string) => void;
    setView: (center: [number, number], zoom: number) => void;
  };
} 