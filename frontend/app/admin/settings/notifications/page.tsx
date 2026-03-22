"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, BellRing } from "lucide-react";

type NotificationSettings = {
  line_channel_access_token: string;
  line_user_id: string;
  telegram_chat_id: string;
};

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    line_channel_access_token: "",
    line_user_id: "",
    telegram_chat_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/settings/notifications`);
        if (res.ok) {
          const data = await res.json();
          setSettings({
            line_channel_access_token: data.line_channel_access_token || "",
            line_user_id: data.line_user_id || "",
            telegram_chat_id: data.telegram_chat_id || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccessMsg("Settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 p-8 md:p-12 max-w-4xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2 flex items-center gap-3">
          <BellRing className="w-8 h-8 text-primary" />
          Notification Channels
        </h1>
        <p className="text-slate-500 font-body text-sm">
          Securely manage your webhook integrations for automated alerts and notifications.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <form 
          onSubmit={handleSave} 
          className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] p-8 md:p-10 font-body flex flex-col gap-8"
        >
          {/* Section: Line Messaging API */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                LINE Channel Access Token
              </label>
              <input
                type="password"
                placeholder="Enter long-lived Channel Access Token"
                value={settings.line_channel_access_token}
                onChange={(e) => setSettings({ ...settings, line_channel_access_token: e.target.value })}
                className="w-full bg-[#f7fafc] border-none p-4 rounded-xl shadow-xs text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400 pl-1">Target your official Messaging API bot Channel.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                LINE User ID
              </label>
              <input
                type="text"
                placeholder="Enter target LINE User ID or Group ID"
                value={settings.line_user_id}
                onChange={(e) => setSettings({ ...settings, line_user_id: e.target.value })}
                className="w-full bg-[#f7fafc] border-none p-4 rounded-xl shadow-xs text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400 pl-1">The exact UID pushing notifications directly to your management phone.</p>
            </div>
          </div>

          <hr className="border-surface-container/30" />

          {/* Section: Telegram Notify */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
              Telegram Chat ID
            </label>
            <input
              type="text"
              placeholder="Enter Telegram Group or Chat ID"
              value={settings.telegram_chat_id}
              onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
              className="w-full bg-[#f7fafc] border-none p-4 rounded-xl shadow-xs text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
            />
            <p className="text-xs text-slate-400 pl-1">Links directly to your MagMove Operations Bot.</p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {successMsg ? (
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg transition-opacity animate-in fade-in">
                {successMsg}
              </span>
            ) : <span />}
            
            <button
              type="submit"
              disabled={saving}
              className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center gap-2 transition-all"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Channels
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
