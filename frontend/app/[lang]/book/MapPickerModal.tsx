"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { Icon as LeafletIcon } from "leaflet";
import { X, MapPin, CheckCircle2 } from "lucide-react";

// Phuket default center
const PHUKET_CENTER: [number, number] = [7.8804, 98.3923];

const MARKER_OPTIONS = {
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
};

// ── Draggable Marker ──────────────────────────────────────────────────────────
function DraggableMarker({
  position,
  icon,
  onMove,
}: {
  position: [number, number];
  icon: LeafletIcon | null;
  onMove: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
  });

  if (!icon) return null;

  return (
    <Marker
      position={position}
      icon={icon}
      draggable
      eventHandlers={{
        dragend(e) {
          const pos = e.target.getLatLng();
          onMove(pos.lat, pos.lng);
        },
      }}
    />
  );
}

// ── Map Picker Modal ──────────────────────────────────────────────────────────
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
  const [position, setPosition] = useState<[number, number]>(PHUKET_CENTER);
  const [label, setLabel] = useState<string>("");
  const [geocoding, setGeocoding] = useState(false);
  const [markerIcon, setMarkerIcon] = useState<LeafletIcon | null>(null);
  const mounted = useRef(false);

  // Dynamically import leaflet (browser-only) to create the icon
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    import("leaflet").then((L) => {
      // Fix default icon URL resolution
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      setMarkerIcon(new L.Icon(MARKER_OPTIONS));
    });
  }, []);

  // Reverse-geocode whenever position changes
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

  useEffect(() => {
    reverseGeocode(PHUKET_CENTER[0], PHUKET_CENTER[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = useCallback(
    (lat: number, lng: number) => {
      setPosition([lat, lng]);
      reverseGeocode(lat, lng);
    },
    [reverseGeocode]
  );

  return (
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

        {/* Map */}
        <div className="h-[360px] w-full">
          <MapContainer
            center={PHUKET_CENTER}
            zoom={12}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={position} icon={markerIcon} onMove={handleMove} />
          </MapContainer>
        </div>

        {/* Location label + confirm */}
        <div className="px-6 py-4 bg-surface-container-lowest border-t border-surface-container flex flex-col gap-3">
          <div className="text-sm font-body text-on-background min-h-[2.5rem] flex items-start gap-2">
            <MapPin className="w-4 h-4 text-tertiary-fixed mt-0.5 flex-shrink-0" />
            <span className={`line-clamp-2 ${geocoding ? "text-secondary animate-pulse" : ""}`}>
              {geocoding ? "Locating..." : label || "Drag the marker to your location"}
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
              onClick={() => onConfirm(position[0], position[1], label)}
              disabled={geocoding || !markerIcon}
              className="flex items-center gap-2 px-6 py-2.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold font-body hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
