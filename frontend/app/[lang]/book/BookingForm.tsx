"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, MapPin, Loader2, Tag } from "lucide-react";
import MapPickerModal from "./MapPickerModal";

type ServiceType = {
  id: string;
  name_en: string;
  name_th: string;
  base_price: number;
  price_per_km: number;
};

type PinState = {
  lat: number;
  lng: number;
  label: string;
} | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingForm({ t, lang }: { t: any; lang: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [services, setServices] = useState<ServiceType[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const [origin, setOrigin] = useState<PinState>(null);
  const [destination, setDestination] = useState<PinState>(null);
  const [mapTarget, setMapTarget] = useState<"origin" | "destination" | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fetch services from settings API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API}/api/settings/services`);
        if (res.ok) {
          const data = await res.json();
          setServices(data);
          if (data.length > 0) setSelectedServiceId(data[0].id);
        }
      } catch (e) {
        console.error("Failed to load services", e);
      }
    };
    fetchServices();
  }, [API]);

  const handleMapConfirm = useCallback(
    (lat: number, lng: number, label: string) => {
      if (mapTarget === "origin") setOrigin({ lat, lng, label });
      else if (mapTarget === "destination") setDestination({ lat, lng, label });
      setMapTarget(null);
    },
    [mapTarget]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!origin || !destination) return;
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const activeService = services.find((s) => s.id === selectedServiceId);

    const payload = {
      serviceType: activeService ? activeService.name_en : selectedServiceId,
      origin_lat: origin.lat,
      origin_lng: origin.lng,
      dest_lat: destination.lat,
      dest_lng: destination.lng,
      origin_label: origin.label,
      dest_label: destination.label,
      moveDate: formData.get("moveDate"),
      moveTime: formData.get("moveTime"),
      contactName: formData.get("contactName"),
      contactPhone: formData.get("contactPhone"),
    };

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full bg-surface-container-highest border-none p-4 rounded-lg font-body text-on-background shadow-xs focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all duration-300 outline-none";

  if (status === "success") {
    return (
      <div className="bg-surface-container-highest rounded-2xl p-12 text-center max-w-2xl mx-auto border-t-4 border-tertiary-fixed shadow-[0_12px_40px_rgba(24,28,30,0.06)]">
        <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center text-tertiary-fixed mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold font-headline text-primary mb-4">
          {t.booking.successMsg.split(".")[0]}
        </h2>
        <p className="text-secondary font-body text-lg">{t.booking.successMsg}</p>
      </div>
    );
  }

  return (
    <>
      {/* Map Picker Modal (rendered at top level to avoid z-index conflicts) */}
      {mapTarget && (
        <MapPickerModal
          title={mapTarget === "origin" ? t.booking.selectOrigin : t.booking.selectDestination}
          confirmLabel={t.booking.confirmLocation}
          onConfirm={handleMapConfirm}
          onClose={() => setMapTarget(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-12">
        {status === "error" && (
          <div className="p-4 bg-error-container text-on-error-container rounded-lg flex items-center gap-3 font-body font-semibold">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {t.booking.errorMsg}
          </div>
        )}

        {/* Field Set: Service Type */}
        <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
          <div className="lg:col-span-1 pt-2">
            <label className="block text-primary font-headline font-bold text-lg">
              {t.booking.serviceType}
            </label>
            <p className="text-sm text-secondary font-body mt-1">
              Select the logistics tier required.
            </p>
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
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "th" ? s.name_th : s.name_en}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Field Set: Map Location Picker */}
        <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
          <div className="lg:col-span-1 pt-2">
            <label className="block text-primary font-headline font-bold text-lg">
              {t.booking.locationSectionTitle}
            </label>
            <p className="text-sm text-secondary font-body mt-1">
              {t.booking.locationSectionDesc}
            </p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {/* Origin Picker */}
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                {t.booking.originLabel}
              </label>
              <button
                type="button"
                onClick={() => setMapTarget("origin")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 font-body text-left ${
                  origin
                    ? "bg-primary-container/10 ring-2 ring-primary/20"
                    : "bg-surface-container-highest hover:bg-surface-container"
                }`}
              >
                <MapPin
                  className={`w-5 h-5 flex-shrink-0 ${origin ? "text-tertiary-fixed" : "text-slate-400"}`}
                />
                <span className={`text-sm line-clamp-2 ${origin ? "text-on-background" : "text-slate-400"}`}>
                  {origin ? origin.label : t.booking.locationNotSet}
                </span>
              </button>
            </div>

            {/* Destination Picker */}
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                {t.booking.destinationLabel}
              </label>
              <button
                type="button"
                onClick={() => setMapTarget("destination")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 font-body text-left ${
                  destination
                    ? "bg-primary-container/10 ring-2 ring-primary/20"
                    : "bg-surface-container-highest hover:bg-surface-container"
                }`}
              >
                <MapPin
                  className={`w-5 h-5 flex-shrink-0 ${destination ? "text-tertiary-fixed" : "text-slate-400"}`}
                />
                <span className={`text-sm line-clamp-2 ${destination ? "text-on-background" : "text-slate-400"}`}>
                  {destination ? destination.label : t.booking.locationNotSet}
                </span>
              </button>
            </div>

            {/* Professional Quote Banner */}
            <div className="bg-primary-container/8 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-tertiary-fixed/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Tag className="w-5 h-5 text-tertiary-fixed" />
              </div>
              <div>
                <p className="text-2xl font-black font-headline text-primary">
                  {t.booking.quoteBase}
                </p>
                <p className="text-xs text-secondary font-body mt-1 leading-relaxed">
                  {t.booking.quoteDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Field Set: Schedule */}
        <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
          <div className="lg:col-span-1 pt-2">
            <label className="block text-primary font-headline font-bold text-lg">
              Schedule
            </label>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                Date
              </label>
              <input type="date" name="moveDate" required className={inputClasses} />
            </div>
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                Time Window
              </label>
              <input type="time" name="moveTime" required className={inputClasses} />
            </div>
          </div>
        </div>

        {/* Field Set: Contact */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 pt-2">
            <label className="block text-primary font-headline font-bold text-lg">
              Client Profile
            </label>
            <p className="text-sm text-secondary font-body mt-1">
              Your dedicated concierge needs a point of contact.
            </p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                {t.booking.contactName}
              </label>
              <input
                type="text"
                name="contactName"
                required
                placeholder="Full Name or Company"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">
                {t.booking.contactPhone}
              </label>
              <input
                type="tel"
                name="contactPhone"
                required
                placeholder="+66 XX XXX XXXX"
                className={inputClasses}
              />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button
            type="submit"
            disabled={status === "loading" || !origin || !destination}
            className="bg-tertiary-fixed text-on-tertiary-fixed px-10 py-5 rounded-md font-bold font-body text-base hover:opacity-90 transition-all duration-300 active:scale-95 gold-glow flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
              </>
            ) : (
              <>
                {t.booking.submitButton}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
