import { BellRing } from "lucide-react";

export default function NotificationsPage() {
  return (
    <main className="flex-1 p-8 md:p-12 max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2">System Notifications</h1>
        <p className="text-slate-500 font-body text-sm">Configure automated client SMS and Email logic events.</p>
      </header>
      <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] p-24 text-center text-slate-400 font-semibold flex flex-col items-center justify-center border border-surface-container">
        <BellRing className="w-16 h-16 mb-4 text-slate-300" strokeWidth={1.5} />
        <p className="text-lg text-slate-500 font-bold mb-2">Awaiting Integrations</p>
        <p className="text-sm font-normal">Notifications module is currently under construction for MagMove Phase 2.</p>
      </div>
    </main>
  );
}
