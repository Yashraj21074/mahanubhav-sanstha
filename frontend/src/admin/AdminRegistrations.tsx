import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getRegistrations, deleteRegistration, exportRegistrations, Registration } from "../services/registrationService";
import { getAllEvents, Event } from "../services/eventsService";
import "../styles/admin.css";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [regs, evts] = await Promise.all([getRegistrations(), getAllEvents()]);
      setRegistrations(regs);
      setEvents(evts);
    } catch { setMsg("❌ माहिती लोड करताना त्रुटी."); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" ची नोंदणी delete करायची आहे का?`)) return;
    try {
      await deleteRegistration(id);
      setMsg("✅ नोंदणी delete झाली.");
      load();
    } catch { setMsg("❌ Delete करताना त्रुटी."); }
  };

  const handleExportCSV = async () => {
    try {
      const data = await exportRegistrations();
      const headers = ["ID", "Event", "Name", "Mobile", "Email", "Mandal", "City", "People", "Note", "DateTime"];
      const rows = data.map(r => [
        r.RegistrationID, r.EventName, r.FullName, r.MobileNumber,
        r.Email, r.MandalName, r.CityArea, r.NumberOfPeople, r.SpecialNote, r.RegistrationDateTime
      ]);
      const csv = [headers, ...rows].map(r => r.map(c => `"${(c||"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
      const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `registrations_${new Date().toISOString().slice(0,10)}.csv`;
      a.click(); URL.revokeObjectURL(url);
      setMsg("✅ CSV export झाला.");
    } catch { setMsg("❌ Export करताना त्रुटी."); }
  };

  const filtered = registrations.filter(r => {
    const s = search.toLowerCase();
    const matchSearch = !search || r.FullName?.toLowerCase().includes(s) || r.MobileNumber?.includes(s) || r.MandalName?.toLowerCase().includes(s);
    const matchEvent = !filterEvent || r.EventID === filterEvent;
    return matchSearch && matchEvent;
  });

  const totalPeople = filtered.reduce((sum, r) => sum + (parseInt(r.NumberOfPeople)||0), 0);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">📝 Registrations</h1>
            <p className="admin-page-sub">नोंदणी व्यवस्थापन — एकूण: {filtered.length} नोंदणी, {totalPeople} लोक</p>
          </div>
          <button className="admin-btn admin-btn--outline" onClick={handleExportCSV}>📥 CSV Export</button>
        </div>

        {msg && <div className="admin-alert admin-alert--info" onClick={() => setMsg("")}>{msg} <span className="admin-alert-close">✕</span></div>}

        <div className="admin-filters">
          <input
            className="admin-form-input admin-filter-input"
            placeholder="🔍 नाव / मोबाइल / मंडळ शोधा..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="admin-form-input admin-filter-select"
            value={filterEvent}
            onChange={e => setFilterEvent(e.target.value)}
          >
            <option value="">— सर्व कार्यक्रम —</option>
            {events.map(e => <option key={e.EventID} value={e.EventID}>{e.MarathiTitle||e.EventTitle}</option>)}
          </select>
          {(search || filterEvent) && (
            <button className="admin-btn admin-btn--sm admin-btn--outline" onClick={() => { setSearch(""); setFilterEvent(""); }}>✕ Clear</button>
          )}
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /><p>Loading...</p></div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">📝</div>
            <p>{search || filterEvent ? "कोणतीही नोंदणी सापडली नाही." : "अजून कोणतीही नोंदणी नाही."}</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name / नाव</th>
                  <th>Mobile</th>
                  <th>Event</th>
                  <th>Mandal</th>
                  <th>City</th>
                  <th>People</th>
                  <th>Date & Time</th>
                  <th>Note</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.RegistrationID}>
                    <td className="admin-table-idx">{i + 1}</td>
                    <td>
                      <div className="admin-table-name">{r.FullName}</div>
                      {r.Email && <div className="admin-table-sub">{r.Email}</div>}
                    </td>
                    <td>{r.MobileNumber}</td>
                    <td>{r.EventName}</td>
                    <td>{r.MandalName}</td>
                    <td>{r.CityArea}</td>
                    <td className="admin-table-center">{r.NumberOfPeople}</td>
                    <td className="admin-table-small">{r.RegistrationDateTime}</td>
                    <td className="admin-table-small">{r.SpecialNote}</td>
                    <td>
                      <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(r.RegistrationID, r.FullName)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
