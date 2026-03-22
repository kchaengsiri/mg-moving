import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

import AdminSidebar from "./AdminSidebar";

export const metadata: Metadata = {
  title: "MagMove Operations Dashboard",
  description: "Internal Dashboard for MagMove Booking Fulfillment.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} antialiased h-full`}>
      <body className="font-body bg-slate-50 text-slate-900 min-h-screen flex selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
