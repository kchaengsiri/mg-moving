"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        const data = await res.json();
        // MVP: Store access token in cookie for Edge Middleware explicitly
        document.cookie = `magmove_admin_token=${data.access_token}; path=/; max-age=86400; samesite=strict`;
        router.push("/admin");
      } else {
        const errData = await res.json();
        setError(errData.detail || "Invalid credentials.");
      }
    } catch (err) {
      setError("Network interpolation error avoiding backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#1A365D] flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] shadow-2xl p-8 md:p-10 relative overflow-hidden">
        
        {/* Decorative elements enforcing White-Glove rules mapped onto Dark Sapphire */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D69E2E] rounded-full blur-[80px] opacity-20 transform translate-x-10 -translate-y-10"></div>

        <div className="relative z-10 flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-[#D69E2E]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#D69E2E]/20">
            <Lock className="w-8 h-8 text-[#D69E2E]" />
          </div>
          <h1 className="text-3xl font-headline font-bold text-white tracking-tight">System Operations</h1>
          <p className="text-slate-400 text-sm mt-2">Secure access restricted to authorized MagMove personnel.</p>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 text-sm font-semibold">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-[#D69E2E] mb-2 font-bold">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white placeholder-slate-500 focus:bg-white/10 focus:border-[#D69E2E]/50 focus:ring-1 focus:ring-[#D69E2E]/50 transition-all outline-none"
                placeholder="Enter network ID"
              />
            </div>
            <div>
              <label className="block text-xs font-label uppercase tracking-widest text-[#D69E2E] mb-2 font-bold">Secure Passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white placeholder-slate-500 focus:bg-white/10 focus:border-[#D69E2E]/50 focus:ring-1 focus:ring-[#D69E2E]/50 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D69E2E] hover:bg-[#c48f2a] text-white px-6 py-4 rounded-lg font-bold text-base transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login to Operations"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
