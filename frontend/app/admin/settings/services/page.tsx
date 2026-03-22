"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X } from "lucide-react";

type Service = {
  id: string;
  name_en: string;
  name_th: string;
  base_price: number;
  price_per_km: number;
};

export default function AdminSettings() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Service>>({
    name_en: "", name_th: "", base_price: 0, price_per_km: 0
  });

  const fetchServices = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/services`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleUpdate = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setEditingId(null);
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service tier?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/services/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (res.ok) {
        setIsAdding(false);
        setAddForm({ name_en: "", name_th: "", base_price: 0, price_per_km: 0 });
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex-1 p-8 md:p-12 max-w-5xl mx-auto w-full">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2">Service Pricing Manager</h1>
          <p className="text-slate-500 font-body text-sm">Dynamically control global parameters for route calculations.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </header>

      <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] overflow-hidden flex flex-col font-body">
        {/* Table Header Wrapper enforcing White-Glove No-Line styling rules */}
        <div className="bg-slate-50 border-b border-surface-container/50 px-8 py-5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div className="col-span-4">Service Tier (EN / TH)</div>
          <div className="col-span-3">Base Price (THB)</div>
          <div className="col-span-3">Distance Rate (THB/km)</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center space-y-4">
             <Loader2 className="w-8 h-8 animate-spin" />
             <p>Syncing variables...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            
            {/* Active Creation Row */}
            {isAdding && (
               <div className="grid grid-cols-12 gap-4 px-8 py-6 items-center bg-primary/5 transition-colors border-b-2 border-primary/20">
                <div className="col-span-4 flex flex-col gap-2 pr-4">
                  <input type="text" placeholder="House Moving" value={addForm.name_en} onChange={e => setAddForm({...addForm, name_en: e.target.value})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-semibold text-slate-900 focus:ring-1 focus:ring-primary outline-none" />
                  <input type="text" placeholder="ขนย้ายบ้าน..." value={addForm.name_th} onChange={e => setAddForm({...addForm, name_th: e.target.value})} className="w-full bg-white border-none p-2 rounded shadow-xs text-xs text-slate-500 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div className="col-span-3 pr-4">
                  <input type="number" placeholder="1500" value={addForm.base_price || ""} onChange={e => setAddForm({...addForm, base_price: parseFloat(e.target.value)})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-bold text-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div className="col-span-3 pr-4">
                  <input type="number" placeholder="50" value={addForm.price_per_km || ""} onChange={e => setAddForm({...addForm, price_per_km: parseFloat(e.target.value)})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-bold text-slate-700 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button onClick={handleCreate} className="p-2 bg-emerald-100 text-emerald-700 rounded-md hover:opacity-80"><Save className="w-4 h-4" /></button>
                  <button onClick={() => setIsAdding(false)} className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200"><X className="w-4 h-4" /></button>
                </div>
               </div>
            )}

            {services.map((s) => (
              <div key={s.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center even:bg-white odd:bg-[#f7fafc] hover:bg-slate-100/60 transition-colors">
                
                {editingId === s.id ? (
                  <>
                    <div className="col-span-4 flex flex-col gap-2 pr-4">
                      <input type="text" value={editForm.name_en} onChange={e => setEditForm({...editForm, name_en: e.target.value})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-semibold text-slate-900 focus:ring-1 focus:ring-primary outline-none" />
                      <input type="text" value={editForm.name_th} onChange={e => setEditForm({...editForm, name_th: e.target.value})} className="w-full bg-white border-none p-2 rounded shadow-xs text-xs text-slate-500 focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-3 pr-4">
                      <input type="number" value={editForm.base_price} onChange={e => setEditForm({...editForm, base_price: parseFloat(e.target.value)})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-bold text-primary focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-3 pr-4">
                      <input type="number" value={editForm.price_per_km} onChange={e => setEditForm({...editForm, price_per_km: parseFloat(e.target.value)})} className="w-full bg-white border-none p-2 rounded shadow-xs text-sm font-bold text-slate-700 focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button onClick={() => handleUpdate(s.id)} className="p-2 bg-emerald-100 text-emerald-700 rounded-md hover:opacity-80"><Save className="w-4 h-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200"><X className="w-4 h-4" /></button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-4 flex flex-col pr-4">
                      <span className="font-semibold text-slate-900">{s.name_en}</span>
                      <span className="text-xs text-slate-500 mt-1">{s.name_th}</span>
                    </div>
                    <div className="col-span-3 pr-4">
                      <span className="text-sm font-bold text-primary">{s.base_price.toLocaleString()} THB</span>
                    </div>
                    <div className="col-span-3 pr-4">
                      <span className="text-sm font-bold text-slate-700">{s.price_per_km.toLocaleString()} / km</span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-3 transition-opacity">
                      <button 
                        onClick={() => { setEditingId(s.id); setEditForm(s); }} 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase transition-colors text-slate-500 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(s.id)} 
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase transition-colors text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
