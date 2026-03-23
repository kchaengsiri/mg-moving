"use client";

import { useEffect, useState } from "react";
import { Settings, CheckCircle2, CircleDashed, Users, Mail, Phone, CalendarDays, MapPin } from "lucide-react";

type Booking = {
  id: string;
  serviceType: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  origin_label?: string;
  dest_label?: string;
  distance_km?: number;
  est_price?: number;
  moveDate: string;
  moveTime: string;
  contactName: string;
  contactPhone: string;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/bookings` : "http://localhost:8000/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}` : `http://localhost:8000/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchBookings(); // Sync state with database
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Status mapping colors mapping to Design System tonals
  const statusColors: Record<string, string> = {
    "pending_quote": "bg-yellow-100 text-yellow-800",
    "contacted": "bg-blue-100 text-blue-800",
    "quoted": "bg-purple-100 text-purple-800",
    "completed": "bg-emerald-100 text-emerald-800",
    "cancelled": "bg-red-100 text-red-800",
  };

  return (
    <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2">MagMove Operations</h1>
          <p className="text-slate-500 font-body text-sm">Manage incoming booking requests and quote schedules.</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary transition-transform cursor-pointer hover:rotate-45">
          <Settings className="w-5 h-5" />
        </div>
      </header>

      <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] overflow-hidden flex flex-col font-body">
        {/* Table Header Wrapper enforcing White-Glove No-Line styling rules */}
        <div className="bg-slate-50 border-b border-surface-container/50 px-8 py-5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div className="col-span-3">Customer</div>
          <div className="col-span-3">Logistics</div>
          <div className="col-span-3">Schedule</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center space-y-4">
             <CircleDashed className="w-8 h-8 animate-spin" />
             <p>Loading active bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center space-y-4">
             <Users className="w-12 h-12 opacity-50 text-slate-300" />
             <p>No active bookings found today.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {bookings.map((b) => (
              <div key={b.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center even:bg-white odd:bg-[#f7fafc] hover:bg-slate-100/60 transition-colors">
                
                {/* Customer Details */}
                <div className="col-span-3 flex flex-col truncate pr-4">
                  <span className="font-semibold text-slate-900 truncate">{b.contactName}</span>
                  <div className="flex items-center text-xs text-slate-500 mt-1 truncate">
                    <Phone className="w-3.5 h-3.5 mr-1" /> {b.contactPhone}
                  </div>
                </div>

                {/* Logistics Requirements */}
                <div className="col-span-3 flex flex-col truncate pr-4 text-sm">
                  <div className="flex items-center text-slate-800 font-medium truncate mb-1">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs mr-2 font-semibold tracking-wide text-primary">{b.serviceType}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate" title={`${b.origin_label || b.pickupLocation || '—'} to ${b.dest_label || b.dropoffLocation || '—'}`}>
                      {b.origin_label || b.pickupLocation || '—'} &rarr; {b.dest_label || b.dropoffLocation || '—'}
                    </span>
                  </div>
                  {(b.distance_km || b.est_price) && (
                    <div className="flex items-center text-[10px] text-slate-400 mt-1 font-semibold tracking-tight">
                      {b.distance_km && <span>{b.distance_km.toFixed(1)} km</span>}
                      {b.distance_km && b.est_price && <span className="mx-1">•</span>}
                      {b.est_price && <span>฿{b.est_price.toLocaleString()}</span>}
                    </div>
                  )}
                </div>

                {/* Schedule Constraints */}
                <div className="col-span-3 flex flex-col text-sm text-slate-700">
                  <div className="flex items-center font-medium">
                    <CalendarDays className="w-4 h-4 mr-2 text-primary" />
                    {new Date(b.moveDate).toLocaleDateString()}
                  </div>
                  <span className="text-xs text-slate-500 ml-6 mt-1 font-semibold">{b.moveTime}</span>
                </div>

                {/* Status Badging */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${statusColors[b.status] || 'bg-slate-100 text-slate-800'}`}>
                    {b.status === "completed" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
                    {b.status.replace("_", " ")}
                  </span>
                </div>

                {/* Administrative Controls */}
                <div className="col-span-1 flex justify-end relative group">
                  <select 
                    value={b.status} 
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="appearance-none font-bold text-[10px] tracking-widest uppercase cursor-pointer transition-all outline-none bg-white hover:bg-slate-50 focus:bg-white border border-transparent shadow-[0_2px_10px_rgba(24,28,30,0.04)] hover:shadow-[0_4px_15px_rgba(24,28,30,0.08)] px-3 py-2 rounded-lg text-slate-700 w-full text-left pl-3 pr-8"
                  >
                    <option value="pending_quote" className="font-semibold text-slate-900 py-1">Pending</option>
                    <option value="contacted" className="font-semibold text-blue-900 py-1">Contacted</option>
                    <option value="quoted" className="font-semibold text-purple-900 py-1">Quoted</option>
                    <option value="completed" className="font-semibold text-emerald-900 py-1">Completed</option>
                    <option value="cancelled" className="font-semibold text-red-900 py-1">Cancelled</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400 group-hover:text-[#D69E2E] transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
