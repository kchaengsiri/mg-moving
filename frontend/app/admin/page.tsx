"use client";

import { useEffect, useState } from "react";
import { Settings, CheckCircle2, CircleDashed, Users, Mail, Phone, CalendarDays, MapPin } from "lucide-react";

type Booking = {
  id: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation: string;
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
                  <div className="flex items-center text-xs text-slate-500 truncate mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    <span className="truncate">{b.pickupLocation} &rarr; {b.dropoffLocation}</span>
                  </div>
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
                <div className="col-span-1 flex justify-end">
                  <select 
                    value={b.status} 
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="text-xs font-bold uppercase tracking-widest text-[#D69E2E] cursor-pointer focus:ring-0 outline-none appearance-none bg-transparent hover:opacity-80 transition-opacity"
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value="pending_quote">Set: Pending</option>
                    <option value="contacted">Set: Contacted</option>
                    <option value="quoted">Set: Quoted</option>
                    <option value="completed">Set: Completed</option>
                    <option value="cancelled">Set: Cancelled</option>
                  </select>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
