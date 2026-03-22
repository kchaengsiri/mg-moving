"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit2, Loader2, Save, X, Images, UploadCloud } from "lucide-react";

const CATEGORIES = ["House", "Condo", "Office", "Specialty", "Inter-provincial"];

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
};

type FormState = { title: string; description: string; image_url: string; category: string };
const emptyForm: FormState = { title: "", description: "", image_url: "", category: CATEGORIES[0] };

// ─── Reusable Image Uploader ────────────────────────────────────────────────
function ImageUploader({
  currentUrl,
  onUploaded,
  API,
}: {
  currentUrl: string;
  onUploaded: (url: string) => void;
  API: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API}/api/upload`, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const { image_url } = await res.json();
      onUploaded(image_url);
    } catch (err) {
      console.error(err);
      setPreview(currentUrl); // Revert on error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onClick={() => fileRef.current?.click()}
      className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden cursor-pointer group border-2 border-dashed border-slate-200 hover:border-primary/40 transition-colors"
    >
      {preview ? (
        <img src={preview} alt="preview" className="w-full h-full object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
          <UploadCloud className="w-8 h-8" />
          <span className="text-xs font-semibold">Click to upload image</span>
        </div>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">Change Image</span>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<FormState>(emptyForm);
  const [addSaving, setAddSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(emptyForm);
  const [editSaving, setEditSaving] = useState(false);

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
    if (!addForm.title) return;
    setAddSaving(true);
    try {
      const res = await fetch(`${API}/api/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (res.ok) { setIsAdding(false); setAddForm(emptyForm); fetchItems(); }
    } catch (e) { console.error(e); }
    finally { setAddSaving(false); }
  };

  const handleUpdate = async (id: string) => {
    setEditSaving(true);
    try {
      const res = await fetch(`${API}/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) { setEditingId(null); fetchItems(); }
    } catch (e) { console.error(e); }
    finally { setEditSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item permanently?")) return;
    try {
      const res = await fetch(`${API}/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    } catch (e) { console.error(e); }
  };

  const inputCls = "w-full bg-white border border-slate-200 p-2 rounded-lg text-sm text-slate-900 focus:ring-1 focus:ring-primary outline-none";

  return (
    <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary tracking-tight mb-2 flex items-center gap-3">
            <Images className="w-8 h-8 text-primary" />
            Portfolio Manager
          </h1>
          <p className="text-slate-500 font-body text-sm">
            Showcase professional moving and packaging work on the public page to build trust.
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setAddForm(emptyForm); }}
          className="bg-tertiary-fixed text-on-tertiary-fixed px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm hover:opacity-90 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </header>

      {/* Add Item Card */}
      {isAdding && (
        <div className="mb-8 bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.08)] border-2 border-primary/20 p-8">
          <h2 className="text-lg font-headline font-bold text-primary mb-6">New Portfolio Item</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Image Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Photo</label>
              <ImageUploader
                currentUrl={addForm.image_url}
                onUploaded={(url) => setAddForm({ ...addForm, image_url: url })}
                API={API}
              />
            </div>
            {/* Right: Fields */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Job Title *</label>
                <input type="text" placeholder="e.g. Sukhumvit Penthouse Relocation" value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Description</label>
                <textarea placeholder="Brief summary of the job..." value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Category</label>
                <select value={addForm.category} onChange={e => setAddForm({ ...addForm, category: e.target.value })} className={`${inputCls} appearance-none cursor-pointer`}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
            <button onClick={() => { setIsAdding(false); setAddForm(emptyForm); }} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
            <button onClick={handleCreate} disabled={addSaving || !addForm.title} className="px-6 py-2 bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
              {addSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Item
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(24,28,30,0.06)] overflow-hidden font-body">
        {/* Header Row */}
        <div className="bg-slate-50 border-b border-slate-100 px-8 py-5 grid grid-cols-12 gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="col-span-2">Photo</div>
          <div className="col-span-3">Title</div>
          <div className="col-span-4">Description</div>
          <div className="col-span-1">Category</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-semibold">Loading portfolio...</p>
          </div>
        ) : items.length === 0 && !isAdding ? (
          <div className="p-20 text-center text-slate-400">
            <Images className="w-12 h-12 mx-auto mb-3 text-slate-200" strokeWidth={1.5} />
            <p className="font-bold text-slate-500">No portfolio items yet</p>
            <p className="text-sm mt-1">Click "Add Item" to showcase your first job.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-50">
            {items.map((item) => (
              <div key={item.id}>
                {editingId === item.id ? (
                  /* Edit Row */
                  <div className="p-8 bg-primary/5">
                    <h3 className="text-sm font-bold text-primary mb-5">Editing: {item.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Photo</label>
                        <ImageUploader
                          currentUrl={editForm.image_url}
                          onUploaded={(url) => setEditForm({ ...editForm, image_url: url })}
                          API={API}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} placeholder="Job Title" />
                        <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
                        <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className={`${inputCls} cursor-pointer`}>
                          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-100">
                      <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 font-semibold rounded-lg hover:bg-slate-100 flex items-center gap-2"><X className="w-4 h-4" /> Cancel</button>
                      <button onClick={() => handleUpdate(item.id)} disabled={editSaving} className="px-6 py-2 bg-tertiary-fixed text-on-tertiary-fixed text-sm font-bold rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2">
                        {editSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Row */
                  <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-slate-50 transition-colors">
                    <div className="col-span-2">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-20 h-14 rounded-lg object-cover border border-slate-100 shadow-sm" />
                      ) : (
                        <div className="w-20 h-14 rounded-lg bg-slate-100 flex items-center justify-center"><Images className="w-5 h-5 text-slate-300" /></div>
                      )}
                    </div>
                    <div className="col-span-3">
                      <span className="font-semibold text-slate-900 text-sm leading-snug">{item.title}</span>
                    </div>
                    <div className="col-span-4">
                      <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="col-span-1">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary">{item.category}</span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2">
                      <button onClick={() => { setEditingId(item.id); setEditForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category }); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase text-slate-500 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
