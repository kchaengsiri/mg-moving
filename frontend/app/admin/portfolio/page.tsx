"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, Images } from "lucide-react";

const CATEGORIES = ["House", "Condo", "Office", "Specialty", "Inter-provincial"];

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
};

const emptyForm = { title: "", description: "", image_url: "", category: CATEGORIES[0] };

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<Partial<PortfolioItem>>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PortfolioItem>>({});

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/api/portfolio`);
      if (res.ok) setItems(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API}/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (res.ok) { setIsAdding(false); setAddForm(emptyForm); fetchItems(); }
    } catch (e) { console.error(e); }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) { setEditingId(null); fetchItems(); }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item permanently?")) return;
    try {
      const res = await fetch(`${API}/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    } catch (e) { console.error(e); }
  };

  const inputCls = "w-full bg-white border-none p-2 rounded shadow-xs text-sm text-slate-900 focus:ring-1 focus:ring-primary outline-none";

  return (
    <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2 flex items-center gap-3">
            <Images className="w-8 h-8 text-primary" />
            Portfolio Manager
          </h1>
          <p className="text-slate-500 font-body text-sm">
            Showcase premium moving jobs on the public landing page to build client trust.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </header>

      <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] overflow-hidden font-body">
        {/* Header Row */}
        <div className="bg-slate-50 border-b border-surface-container/50 px-8 py-5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-semibold">Loading portfolio...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Add Row */}
            {isAdding && (
              <div className="grid grid-cols-12 gap-4 px-8 py-5 items-start bg-primary/5 border-b-2 border-primary/20">
                <div className="col-span-1">
                  {addForm.image_url ? (
                    <img src={addForm.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200" onError={(e) => (e.currentTarget.style.display = "none")} />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><Images className="w-5 h-5 text-slate-300" /></div>
                  )}
                </div>
                <div className="col-span-3"><input type="text" placeholder="Job Title..." value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className={inputCls} /></div>
                <div className="col-span-4"><textarea placeholder="Brief description..." value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} rows={2} className={`${inputCls} resize-none`} /></div>
                <div className="col-span-2 flex flex-col gap-2">
                  <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value })} className={`${inputCls} cursor-pointer`}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <input type="text" placeholder="Image URL or /public/..." value={addForm.image_url} onChange={e => setAddForm({ ...addForm, image_url: e.target.value })} className={`${inputCls} text-xs`} />
                </div>
                <div className="col-span-2 flex justify-end gap-2 pt-1">
                  <button onClick={handleCreate} className="p-2 bg-emerald-100 text-emerald-700 rounded-md hover:opacity-80"><Save className="w-4 h-4" /></button>
                  <button onClick={() => { setIsAdding(false); setAddForm(emptyForm); }} className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200"><X className="w-4 h-4" /></button>
                </div>
              </div>
            )}

            {items.length === 0 && !isAdding && (
              <div className="p-20 text-center text-slate-400">
                <Images className="w-12 h-12 mx-auto mb-3 text-slate-200" strokeWidth={1.5} />
                <p className="font-bold text-slate-500">No portfolio items yet</p>
                <p className="text-sm mt-1">Click "Add Item" above to showcase your first premium move.</p>
              </div>
            )}

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-start even:bg-white odd:bg-[#f7fafc] hover:bg-slate-100/60 transition-colors">
                {editingId === item.id ? (
                  <>
                    <div className="col-span-1">
                      {editForm.image_url ? (
                        <img src={editForm.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200" onError={e => (e.currentTarget.style.display = "none")} />
                      ) : <div className="w-10 h-10 rounded-lg bg-slate-100" />}
                    </div>
                    <div className="col-span-3"><input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} /></div>
                    <div className="col-span-4"><textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2} className={`${inputCls} resize-none`} /></div>
                    <div className="col-span-2 flex flex-col gap-2">
                      <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className={`${inputCls} cursor-pointer`}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <input type="text" value={editForm.image_url} onChange={e => setEditForm({ ...editForm, image_url: e.target.value })} className={`${inputCls} text-xs`} />
                    </div>
                    <div className="col-span-2 flex justify-end gap-2 pt-1">
                      <button onClick={() => handleUpdate(item.id)} className="p-2 bg-emerald-100 text-emerald-700 rounded-md hover:opacity-80"><Save className="w-4 h-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200"><X className="w-4 h-4" /></button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-1">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-10 h-10 rounded-lg object-cover border border-slate-200" onError={e => (e.currentTarget.style.display = "none")} />
                      ) : <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><Images className="w-4 h-4 text-slate-300" /></div>}
                    </div>
                    <div className="col-span-3"><span className="font-semibold text-slate-900 text-sm">{item.title}</span></div>
                    <div className="col-span-4"><p className="text-sm text-slate-600 line-clamp-2">{item.description}</p></div>
                    <div className="col-span-2">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary">{item.category}</span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button onClick={() => { setEditingId(item.id); setEditForm(item); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase text-slate-500 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors">
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
