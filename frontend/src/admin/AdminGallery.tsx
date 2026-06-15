import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getGallery, addGallery, updateGallery, deleteGallery, GalleryItem } from "../services/galleryService";
import "../styles/admin.css";

const EMPTY: Partial<GalleryItem> = {
  Year: new Date().getFullYear().toString(),
  EventName: "", GooglePhotosAlbumLink: "",
  EventDate: "", Description: "", CoverImageURL: "",
};

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try { setItems(await getGallery()); }
    catch { setMsg("❌ माहिती लोड करताना त्रुटी."); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const years = [...new Set(items.map(i => i.Year))].sort((a, b) => Number(b) - Number(a));

  const openAdd = () => { setForm({ ...EMPTY }); setEditing(null); setShowForm(true); };
  const openEdit = (item: GalleryItem) => { setForm({ ...item }); setEditing(item); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const f = (key: keyof GalleryItem, val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.Year || !form.EventName || !form.GooglePhotosAlbumLink) {
      setMsg("⚠️ Year, Event Name आणि Google Photos Link आवश्यक आहे."); return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateGallery(editing.GalleryID, form);
        setMsg("✅ Gallery item अपडेट झाला.");
      } else {
        await addGallery(form);
        setMsg("✅ नवीन gallery album जोडला.");
      }
      closeForm(); load();
    } catch { setMsg("❌ Save करताना त्रुटी."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" हा album delete करायचा का?`)) return;
    try { await deleteGallery(id); setMsg("✅ Album delete झाला."); load(); }
    catch { setMsg("❌ Delete करताना त्रुटी."); }
  };

  const filtered = items.filter(item => {
    const s = search.toLowerCase();
    const matchS = !search || item.EventName?.toLowerCase().includes(s);
    const matchY = !filterYear || item.Year === filterYear;
    return matchS && matchY;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">🖼️ Gallery</h1>
            <p className="admin-page-sub">गॅलरी व्यवस्थापन — {items.length} albums</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ नवीन Album</button>
        </div>

        {msg && <div className="admin-alert admin-alert--info" onClick={() => setMsg("")}>{msg} <span className="admin-alert-close">✕</span></div>}

        <div className="admin-filters">
          <input
            className="admin-form-input admin-filter-input"
            placeholder="🔍 Event नाव शोधा..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="admin-form-input admin-filter-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">— सर्व वर्षे —</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {(search || filterYear) && (
            <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => { setSearch(""); setFilterYear(""); }}>✕ Clear</button>
          )}
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /><p>Loading...</p></div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🖼️</div>
            <p>{search || filterYear ? "कोणताही album सापडला नाही." : "अजून कोणताही gallery album नाही."}</p>
            {!search && !filterYear && <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ पहिला Album जोडा</button>}
          </div>
        ) : (
          <div className="admin-gallery-admin-grid">
            {filtered.map(item => (
              <div key={item.GalleryID} className="admin-gallery-admin-card">
                <div className="admin-gallery-admin-img">
                  {item.CoverImageURL ? (
                    <img src={item.CoverImageURL} alt={item.EventName} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : (
                    <div className="admin-gallery-admin-placeholder">🖼️</div>
                  )}
                  <div className="admin-gallery-admin-year-badge">{item.Year}</div>
                </div>
                <div className="admin-gallery-admin-info">
                  <div className="admin-gallery-admin-name">{item.EventName}</div>
                  {item.EventDate && <div className="admin-gallery-admin-date">📅 {item.EventDate}</div>}
                  <a href={item.GooglePhotosAlbumLink} target="_blank" rel="noopener noreferrer" className="admin-gallery-admin-link">
                    🔗 Google Photos Album
                  </a>
                </div>
                <div className="admin-gallery-admin-actions">
                  <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => openEdit(item)}>✏️ Edit</button>
                  <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(item.GalleryID, item.EventName)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeForm()}>
            <div className="admin-modal">
              <div className="admin-modal-header">
                <h2>{editing ? "✏️ Album Edit करा" : "➕ नवीन Gallery Album"}</h2>
                <button className="admin-modal-close" onClick={closeForm}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Year (वर्ष) *</label>
                    <input className="admin-form-input" value={form.Year||""} onChange={e=>f("Year",e.target.value)} placeholder="2025" type="number" min="2000" max="2100" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Event Date</label>
                    <input type="date" className="admin-form-input" value={form.EventDate||""} onChange={e=>f("EventDate",e.target.value)} />
                  </div>
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Event Name *</label>
                    <input className="admin-form-input" value={form.EventName||""} onChange={e=>f("EventName",e.target.value)} placeholder="e.g. चक्रधर जयंती 2025" />
                  </div>
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Google Photos Album Link *</label>
                    <input className="admin-form-input" value={form.GooglePhotosAlbumLink||""} onChange={e=>f("GooglePhotosAlbumLink",e.target.value)} placeholder="https://photos.google.com/share/..." />
                  </div>
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Cover Image URL</label>
                    <input className="admin-form-input" value={form.CoverImageURL||""} onChange={e=>f("CoverImageURL",e.target.value)} placeholder="https://... (cover photo URL)" />
                    {form.CoverImageURL && (
                      <img src={form.CoverImageURL} alt="Preview" className="admin-img-preview" onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                    )}
                  </div>
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Description</label>
                    <textarea className="admin-form-input admin-form-textarea" value={form.Description||""} onChange={e=>f("Description",e.target.value)} placeholder="Album description..." rows={3} />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button className="admin-btn admin-btn--outline" onClick={closeForm}>रद्द करा</button>
                <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : editing ? "✅ Update करा" : "✅ Save करा"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
