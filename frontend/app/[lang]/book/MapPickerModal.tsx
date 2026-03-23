"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { X, MapPin, CheckCircle2 } from "lucide-react";

// Phuket default center
const CENTER = { lat: 7.8804, lng: 98.3923 };

interface MapPickerModalProps {
  title: string;
  confirmLabel: string;
  onConfirm: (lat: number, lng: number, label: string) => void;
  onClose: () => void;
}

export default function MapPickerModal({
  title,
  confirmLabel,
  onConfirm,
  onClose,
}: MapPickerModalProps) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  const [position, setPosition] = useState(CENTER);
  const [label, setLabel] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`,
        { headers: { "User-Agent": "MagMove-MVP-App" } }
      );
      const data = await res.json();
      setLabel(data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } catch {
      setLabel(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } finally {
      setGeocoding(false);
    }
  }, []);

  // Init map after Leaflet CDN script is loaded
  useEffect(() => {
    if (!scriptReady || !mapDivRef.current || mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapDivRef.current).setView([CENTER.lat, CENTER.lng], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([CENTER.lat, CENTER.lng], { draggable: true }).addTo(map);

    const onMove = (lat: number, lng: number) => {
      setPosition({ lat, lng });
      reverseGeocode(lat, lng);
    };

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      onMove(lat, lng);
    });

    map.on("click", (e: { latlng: { lat: number; lng: number } }) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      onMove(lat, lng);
    });

    mapRef.current = map;
    markerRef.current = marker;

    // Initial reverse geocode
    reverseGeocode(CENTER.lat, CENTER.lng);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [scriptReady, reverseGeocode]);

  return (
    <>
      {/* Leaflet CSS — loaded from CDN */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />

      {/* Leaflet JS — loaded from CDN, deferred */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,32,69,0.25)] w-full max-w-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-primary-container">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-tertiary-fixed" />
              <h2 className="text-white font-headline font-bold text-base tracking-tight">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-md"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Instructions */}
          <p className="text-xs text-secondary font-body px-6 pt-3 pb-1">
            Click anywhere on the map or drag the marker to pin the exact location.
          </p>

          {/* Map container */}
          <div className="h-[360px] w-full relative">
            {!scriptReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <span className="text-secondary text-sm font-body animate-pulse">Loading map…</span>
              </div>
            )}
            <div ref={mapDivRef} className="h-full w-full" />
          </div>

          {/* Location label + confirm */}
          <div className="px-6 py-4 bg-surface-container-lowest border-t border-surface-container flex flex-col gap-3">
            <div className="text-sm font-body text-on-background min-h-[2.5rem] flex items-start gap-2">
              <MapPin className="w-4 h-4 text-tertiary-fixed mt-0.5 flex-shrink-0" />
              <span className={`line-clamp-2 ${geocoding ? "text-secondary animate-pulse" : ""}`}>
                {geocoding ? "Locating…" : label || "Drag the marker or click the map to set location"}
              </span>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-md text-sm font-semibold font-body text-secondary hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(position.lat, position.lng, label)}
                disabled={geocoding || !scriptReady}
                className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold font-body hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
