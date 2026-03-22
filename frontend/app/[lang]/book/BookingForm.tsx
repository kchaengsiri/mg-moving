"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, MapPin, Loader2 } from "lucide-react";

type Place = {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
};

// Custom Hook for Debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Reusable Autocomplete Input Component
const LocationInput = ({
  label,
  placeholder,
  onSelectCoordinate,
  name
}: {
  label: string;
  placeholder: string;
  onSelectCoordinate: (coords: [number, number] | null) => void;
  name: string;
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([]);
      return;
    }
    
    // Only search if the dropdown is active (user is actively typing, not selecting)
    if (!showDropdown) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}&countrycodes=th&limit=5`, {
          headers: { "User-Agent": "MagMove-MVP-App" }
        });
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Nominatim Search Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [debouncedQuery, showDropdown]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place: Place) => {
    setQuery(place.display_name);
    setShowDropdown(false);
    onSelectCoordinate([parseFloat(place.lon), parseFloat(place.lat)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    if (e.target.value.length < 3) {
      onSelectCoordinate(null); // Reset coordinate if they wipe the input
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          name={name}
          required 
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder} 
          autoComplete="off"
          className="w-full bg-surface-container-highest border-none p-4 rounded-lg font-body text-on-background shadow-xs focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all duration-300 outline-none"
        />
        {loading && <Loader2 className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-tertiary-fixed" />}
      </div>

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-[0_12px_40px_rgba(24,28,30,0.12)] max-h-60 overflow-y-auto font-body">
          {results.map(place => (
            <li 
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="p-4 hover:bg-slate-50 cursor-pointer flex items-start gap-3 transition-colors border-b border-surface-container/30 last:border-0"
            >
              <MapPin className="w-5 h-5 text-tertiary-fixed flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 line-clamp-2">{place.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingForm({ t, lang }: { t: any; lang: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(null);
  
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [routingLoading, setRoutingLoading] = useState(false);

  type ServiceType = { id: string; name_en: string; name_th: string; base_price: number; price_per_km: number; };
  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/settings/services`);
        if (res.ok) {
          const data = await res.json();
          setServices(data);
          if (data.length > 0) setSelectedServiceId(data[0].id);
        }
      } catch (e) {
        console.error("Failed to load global pricing services", e);
      }
    };
    fetchServices();
  }, []);

  // OSRM Distance Fetcher triggered when both coords exist
  useEffect(() => {
    if (pickupCoords && dropoffCoords && selectedServiceId && services.length > 0) {
      const activeService = services.find(s => s.id === selectedServiceId);
      if (!activeService) return;

      const getRoute = async () => {
        setRoutingLoading(true);
        try {
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickupCoords[0]},${pickupCoords[1]};${dropoffCoords[0]},${dropoffCoords[1]}?overview=false`);
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            const distKm = data.routes[0].distance / 1000;
            setDistanceKm(distKm);
            // Dynamic Pricing Logic via Settings API
            setEstimatedPrice(activeService.base_price + (distKm * activeService.price_per_km));
          }
        } catch (e) {
          console.error("OSRM Error", e);
        } finally {
          setRoutingLoading(false);
        }
      };
      getRoute();
    } else {
      setDistanceKm(null);
      setEstimatedPrice(null);
    }
  }, [pickupCoords, dropoffCoords, selectedServiceId, services]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const activeService = services.find(s => s.id === selectedServiceId);

    const data = {
      serviceType: activeService ? activeService.name_en : formData.get("serviceType"),
      pickupLocation: formData.get("pickupLocation"),
      dropoffLocation: formData.get("dropoffLocation"),
      moveDate: formData.get("moveDate"),
      moveTime: formData.get("moveTime"),
      contactName: formData.get("contactName"),
      contactPhone: formData.get("contactPhone"),
      distance: distanceKm,
      price: estimatedPrice ? Math.round(estimatedPrice) : null,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-surface-container-highest rounded-2xl p-12 text-center max-w-2xl mx-auto border-t-4 border-tertiary-fixed shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-tertiary-fixed mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold font-headline text-primary mb-4">{t.booking.successMsg.split('.')[0]}</h2>
        <p className="text-secondary font-body text-lg">{t.booking.successMsg}</p>
      </div>
    );
  }

  const inputClasses = "w-full bg-surface-container-highest border-none p-4 rounded-lg font-body text-on-background shadow-xs focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all duration-300 outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {status === "error" && (
        <div className="p-4 bg-error-container text-on-error-container rounded-lg flex items-center gap-3 font-body font-semibold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {t.booking.errorMsg}
        </div>
      )}

      {/* Field Set: Logistics */}
      <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
        <div className="lg:col-span-1 pt-2">
          <label className="block text-primary font-headline font-bold text-lg">{t.booking.serviceType}</label>
          <p className="text-sm text-secondary font-body mt-1">Select the logistics tier required.</p>
        </div>
        <div className="lg:col-span-2">
          {services.length === 0 ? (
            <div className={`${inputClasses} flex items-center gap-2 text-slate-500`}>
              <Loader2 className="w-4 h-4 animate-spin" /> Loading configurations...
            </div>
          ) : (
            <select 
              name="serviceType" 
              required 
              value={selectedServiceId} 
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className={`${inputClasses} appearance-none cursor-pointer text-slate-900 bg-white`}
            >
              <option value="" disabled>Select an option...</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{lang === 'th' ? s.name_th : s.name_en}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Field Set: Locations */}
      <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
        <div className="lg:col-span-1 pt-2">
          <label className="block text-primary font-headline font-bold text-lg">Routing & Addresses</label>
          <p className="text-sm text-secondary font-body mt-1">Precise coordinates powered by OpenStreetMap global logistics network.</p>
        </div>
        <div className="lg:col-span-2 space-y-8">
          
          <LocationInput 
            name="pickupLocation"
            label={t.booking.pickup} 
            placeholder={t.booking.pickupPlaceholder || "Search..."} 
            onSelectCoordinate={setPickupCoords} 
          />
          
          <LocationInput 
            name="dropoffLocation"
            label={t.booking.dropoff} 
            placeholder={t.booking.dropoffPlaceholder || "Search..."} 
            onSelectCoordinate={setDropoffCoords} 
          />

          {/* Pricing Estimation Card enforcing No-Line rule */}
          {(distanceKm !== null || routingLoading) && (
            <div className="bg-[#f7fafc] rounded-2xl p-6 shadow-sm overflow-hidden relative">
              {routingLoading ? (
                <div className="flex items-center gap-3 text-tertiary-fixed font-semibold">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.booking.calculating}
                </div>
              ) : (
                <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 font-body">
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{t.booking.distance}</span>
                    <span className="text-2xl font-black text-primary font-headline">{distanceKm?.toFixed(1)} <span className="text-base font-medium">km</span></span>
                  </div>
                  <div className="w-px h-10 bg-slate-200 hidden md:block" />
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-[#D69E2E] font-bold mb-1">{t.booking.estimatedPrice}</span>
                    <span className="text-3xl font-black text-slate-900 font-headline">
                      {new Intl.NumberFormat(lang === 'th' ? 'th-TH' : 'en-US').format(Math.round(estimatedPrice || 0))} <span className="text-base font-bold text-slate-500">{t.booking.thb}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Field Set: Schedule */}
      <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
        <div className="lg:col-span-1 pt-2">
          <label className="block text-primary font-headline font-bold text-lg">Schedule Integration</label>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">Date</label>
            <input type="date" name="moveDate" required className={inputClasses} />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">Time Window</label>
            <input type="time" name="moveTime" required className={inputClasses} />
          </div>
        </div>
      </div>

      {/* Field Set: Identity */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 pt-2">
          <label className="block text-primary font-headline font-bold text-lg">Client Profile</label>
          <p className="text-sm text-secondary font-body mt-1">Your dedicated concierge needs a point of contact.</p>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">{t.booking.contactName}</label>
            <input type="text" name="contactName" required placeholder="Full Name or Company" className={inputClasses} />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">{t.booking.contactPhone}</label>
            <input type="tel" name="contactPhone" required placeholder="+66 XX XXX XXXX" className={inputClasses} />
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-end">
        <button 
          type="submit" 
          disabled={status === "loading"}
          className="bg-tertiary-fixed text-on-tertiary-fixed px-10 py-5 rounded-md font-bold font-body text-base hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow flex items-center gap-3 disabled:opacity-50"
        >
          {status === "loading" ? "Processing..." : t.booking.submitButton}
          {!status && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
}
