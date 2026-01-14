'use client';

import { useEffect, useRef } from 'react';

// Workshop coordinates (Mudungoda, Gampaha area)
const WORKSHOP_LAT = 7.0544;
const WORKSHOP_LNG = 80.0058;

export default function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Prevent double initialization in React Strict Mode
    if (mapInstanceRef.current || initializingRef.current) return;
    initializingRef.current = true;

    // Dynamically import Leaflet
    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Import Leaflet CSS dynamically
      // @ts-ignore - CSS import
      await import('leaflet/dist/leaflet.css');

      // Check again after async imports (in case cleanup happened)
      if (!mapRef.current || mapInstanceRef.current) {
        initializingRef.current = false;
        return;
      }

      // Create map instance
      const map = L.map(mapRef.current, {
        center: [WORKSHOP_LAT, WORKSHOP_LNG],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Dark theme tile layer (CartoDB Dark Matter - free, no API key needed)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div class="marker-pin">
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#c9a962"/>
              <circle cx="16" cy="14" r="6" fill="#0a0a0a"/>
            </svg>
          </div>
        `,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -40],
      });

      // Add marker
      const marker = L.marker([WORKSHOP_LAT, WORKSHOP_LNG], { icon: customIcon }).addTo(map);

      // Add popup
      marker.bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <strong style="color: #1a1a1a; font-size: 14px;">Darshana Gal Ketayam</strong><br/>
          <span style="color: #666; font-size: 12px;">Stone Carving Workshop</span>
        </div>
      `);

      mapInstanceRef.current = map;

      // Fix map size issues
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      initializingRef.current = false;
    };
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
