"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BookingForm({ t }: { t: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      serviceType: formData.get("serviceType"),
      pickupLocation: formData.get("pickupLocation"),
      dropoffLocation: formData.get("dropoffLocation"),
      moveDate: formData.get("moveDate"),
      moveTime: formData.get("moveTime"),
      contactName: formData.get("contactName"),
      contactPhone: formData.get("contactPhone"),
    };

    try {
      // Backend is listening at http://localhost:8000/api/bookings or relative via proxy
      const res = await fetch("http://localhost:8000/api/bookings", {
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
          <select name="serviceType" required defaultValue="" className={`${inputClasses} appearance-none cursor-pointer`}>
            <option value="" disabled>Select an option...</option>
            <option value="House Moving">{t.booking.houseMoving}</option>
            <option value="Motorcycle">{t.booking.motorcycle}</option>
            <option value="Local Delivery">{t.booking.local}</option>
            <option value="Inter-provincial">{t.booking.interProvincial}</option>
          </select>
        </div>
      </div>

      {/* Field Set: Locations */}
      <div className="grid lg:grid-cols-3 gap-8 items-start border-b border-surface-container pb-12">
        <div className="lg:col-span-1 pt-2">
          <label className="block text-primary font-headline font-bold text-lg">Routing & Addresses</label>
          <p className="text-sm text-secondary font-body mt-1">Exact coordinates for our fleet dispatch.</p>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">{t.booking.pickup}</label>
            <input type="text" name="pickupLocation" required placeholder="Villa Name, Condo, or District" className={inputClasses} />
          </div>
          <div>
            <label className="block text-xs font-label uppercase tracking-widest text-secondary mb-2">{t.booking.dropoff}</label>
            <input type="text" name="dropoffLocation" required placeholder="Destination address" className={inputClasses} />
          </div>
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
