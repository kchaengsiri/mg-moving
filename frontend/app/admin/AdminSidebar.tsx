"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Settings, Bell, Box, ShieldCheck } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  // Return null entirely if we are on the login page strictly bypassing Layout trees
  if (pathname === "/admin/login") return null;

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/admin/settings/services", label: "Services", icon: Box },
    { href: "/admin/settings/notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <aside className="w-64 bg-[#1A365D] text-white flex flex-col min-h-screen font-body shadow-2xl flex-shrink-0 relative overflow-hidden">
      {/* Decorative Gold Blurs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D69E2E] rounded-full blur-[80px] opacity-20 transform translate-x-10 -translate-y-10"></div>
      
      <div className="p-6 relative z-10 border-b border-white/10 mt-2">
        <h1 className="text-2xl font-headline font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#D69E2E]" />
            MagMove <span className="text-[#D69E2E]">OS</span>
        </h1>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold font-label pl-8">Ops Center</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 relative z-10">
        {links.map((link) => {
          // Exact match for /admin to prevent it highlighting on /admin/bookings automatically
          const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all duration-200 ${
                isActive 
                  ? "bg-white/10 text-[#D69E2E] shadow-[inset_4px_0_0_0_#D69E2E]" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? "text-[#D69E2E]" : "opacity-80"}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 relative z-10 border-t border-white/10 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D69E2E]/20 border border-[#D69E2E]/30 flex items-center justify-center text-[#D69E2E] font-bold text-xs uppercase shadow-inner">
            AD
          </div>
          <div>
            <p className="text-sm font-bold text-white">System Admin</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#D69E2E] mt-0.5">Authorised</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
