import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getAllEvents, addEvent, updateEvent, deleteEvent, Event } from "../services/eventsService";
import "../styles/admin.css";

const EMPTY_EVENT: Partial<Event> = {
  EventTitle: "", MarathiTitle: "", HindiTitle: "", EnglishTitle: "",
  EventDate: "", StartTime: "", EndTime: "", VenueName: "",
  GoogleMapsLink: "", Description: "", YouTubeLiveLink: "",
  WhatsAppGroupLink: "", RegistrationStatus: "Closed",
  EventStatus: "Active", EventImageURL: "",
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<Partial<Event>>(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try { setEvents(await getAllEvents()); }
    catch { setMsg("❌ माहिती लोड करताना त्रुटी झाली."); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY_EVENT); setEditing(null); setShowForm(true); };
  const openEdit = (e: Event) => { setForm({ ...e }); setEditing(e); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.EventTitle || !form.EventDate || !form.VenueName) {
      setMsg("⚠️ EventTitle, EventDate आणि VenueName आवश्यक आहे."); return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateEvent(editing.EventID, form);
        setMsg("✅ Event यशस्वीरित्या अपडेट झाला.");
      } else {
        await addEvent(form);
        setMsg("✅ नवीन Event यशस्वीरित्या जोडला.");
      }
      closeForm();
      load();
    } catch {
      setMsg("❌ Save करताना त्रुटी झाली.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" हा event delete करायचा आहे का?`)) return;
    try {
      await deleteEvent(id);
      setMsg("✅ Event delete झाला.");
      load();
    } catch { setMsg("❌ Delete करताना त्रुटी."); }
  };

  const toggleReg = async (event: Event) => {
    const updated = { ...event, RegistrationStatus: event.RegistrationStatus === "Open" ? "Closed" : "Open" } as Event;
    await updateEvent(event.EventID, updated);
    load();
  };

  const f = (key: keyof Event, val: string) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">🎪 Events</h1>
            <p className="admin-page-sub">कार्यक्रम व्यवस्थापन</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ नवीन Event</button>
        </div>

        {msg && <div className="admin-alert admin-alert--info" onClick={() => setMsg("")}>{msg} <span className="admin-alert-close">✕</span></div>}

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /><p>Loading...</p></div>
        ) : events.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">🎪</div>
            <p>अजून कोणताही event नाही.</p>
            <button className="admin-btn admin-btn--primary" onClick={openAdd}>+ पहिला Event जोडा</button>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Status</th>
                  <th>Registration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(e => (
                  <tr key={e.EventID}>
                    <td>
                      <div className="admin-table-name">{e.MarathiTitle || e.EventTitle}</div>
                      <div className="admin-table-sub">{e.EventTitle}</div>
                    </td>
                    <td>{e.EventDate}<br /><small>{e.StartTime} – {e.EndTime}</small></td>
                    <td>{e.VenueName}</td>
                    <td>
                      <span className={`admin-badge ${e.EventStatus === "Active" ? "admin-badge--green" : "admin-badge--gray"}`}>
                        {e.EventStatus === "Active" ? "✅ Active" : "⬜ Inactive"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`admin-badge admin-badge--btn ${e.RegistrationStatus === "Open" ? "admin-badge--green" : "admin-badge--red"}`}
                        onClick={() => toggleReg(e)}
                        title="Click to toggle"
                      >
                        {e.RegistrationStatus === "Open" ? "🟢 Open" : "🔴 Closed"}
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => openEdit(e)}>✏️ Edit</button>
                        <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(e.EventID, e.EventTitle)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Form */}
        {showForm && (
          <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeForm()}>
            <div className="admin-modal">
              <div className="admin-modal-header">
                <h2>{editing ? "✏️ Event Edit करा" : "➕ नवीन Event जोडा"}</h2>
                <button className="admin-modal-close" onClick={closeForm}>✕</button>
              </div>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Event Title (English) *</label>
                    <input className="admin-form-input" value={form.EventTitle||""} onChange={e=>f("EventTitle",e.target.value)} placeholder="Event title in English" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Marathi Title (मराठी)</label>
                    <input className="admin-form-input" value={form.MarathiTitle||""} onChange={e=>f("MarathiTitle",e.target.value)} placeholder="मराठी शीर्षक" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Hindi Title (हिंदी)</label>
                    <input className="admin-form-input" value={form.HindiTitle||""} onChange={e=>f("HindiTitle",e.target.value)} placeholder="हिंदी शीर्षक" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Event Date *</label>
                    <input type="date" className="admin-form-input" value={form.EventDate||""} onChange={e=>f("EventDate",e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Start Time</label>
                    <input type="time" className="admin-form-input" value={form.StartTime||""} onChange={e=>f("StartTime",e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">End Time</label>
                    <input type="time" className="admin-form-input" value={form.EndTime||""} onChange={e=>f("EndTime",e.target.value)} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Venue Name *</label>
                    <input className="admin-form-input" value={form.VenueName||""} onChange={e=>f("VenueName",e.target.value)} placeholder="कार्यक्रमाचे ठिकाण" />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Google Maps Link</label>
                    <input className="admin-form-input" value={form.GoogleMapsLink||""} onChange={e=>f("GoogleMapsLink",e.target.value)} placeholder="https://maps.google.com/..." />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">YouTube Live Link</label>
                    <input className="admin-form-input" value={form.YouTubeLiveLink||""} onChange={e=>f("YouTubeLiveLink",e.target.value)} placeholder="https://youtube.com/..." />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">WhatsApp Group Link</label>
                    <input className="admin-form-input" value={form.WhatsAppGroupLink||""} onChange={e=>f("WhatsAppGroupLink",e.target.value)} placeholder="https://chat.whatsapp.com/..." />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Event Banner Image URL</label>
                    <input className="admin-form-input" value={form.EventImageURL||""} onChange={e=>f("EventImageURL",e.target.value)} placeholder="https://..." />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Registration Status</label>
                    <select className="admin-form-input" value={form.RegistrationStatus||"Closed"} onChange={e=>f("RegistrationStatus",e.target.value)}>
                      <option value="Open">🟢 Open</option>
                      <option value="Closed">🔴 Closed</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Event Status</label>
                    <select className="admin-form-input" value={form.EventStatus||"Active"} onChange={e=>f("EventStatus",e.target.value)}>
                      <option value="Active">✅ Active</option>
                      <option value="Inactive">⬜ Inactive</option>
                    </select>
                  </div>
                  <div className="admin-form-group admin-form-group--full">
                    <label className="admin-form-label">Description</label>
                    <textarea className="admin-form-input admin-form-textarea" value={form.Description||""} onChange={e=>f("Description",e.target.value)} placeholder="Event description..." rows={4} />
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
