import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getAllEvents, Event } from "../services/eventsService";
import { getRegistrations, Registration } from "../services/registrationService";
import { getGallery, GalleryItem } from "../services/galleryService";
import "../styles/admin.css";

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllEvents(), getRegistrations(), getGallery()])
      .then(([evts, regs, gal]) => {
        setEvents(evts);
        setRegistrations(regs);
        setGallery(gal);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-IN");
  const todayRegs = registrations.filter(r =>
    r.RegistrationDateTime?.startsWith(today) ||
    new Date(r.RegistrationDateTime).toLocaleDateString("en-IN") === today
  );
  const activeEvents = events.filter(e => e.EventStatus === "Active");
  const openRegEvents = events.filter(e => e.RegistrationStatus === "Open");
  const upcomingEvent = events
    .filter(e => e.EventStatus === "Active" && new Date(e.EventDate) >= new Date())
    .sort((a, b) => new Date(a.EventDate).getTime() - new Date(b.EventDate).getTime())[0];

  const stats = [
    { label: "Total Events", labelMr: "एकूण कार्यक्रम", value: events.length, icon: "🎪", color: "gold" },
    { label: "Active Events", labelMr: "सक्रिय कार्यक्रम", value: activeEvents.length, icon: "✅", color: "green" },
    { label: "Total Registrations", labelMr: "एकूण नोंदणी", value: registrations.length, icon: "📝", color: "maroon" },
    { label: "Today's Registrations", labelMr: "आजची नोंदणी", value: todayRegs.length, icon: "📅", color: "blue" },
    { label: "Gallery Albums", labelMr: "गॅलरी अल्बम", value: gallery.length, icon: "🖼️", color: "purple" },
    { label: "Registration Open", labelMr: "नोंदणी खुली", value: openRegEvents.length, icon: "🔓", color: "saffron" },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-page-title">📊 Dashboard</h1>
            <p className="admin-page-sub">मुंबई व उपनगर महानुभाव पंथीय संस्था — Admin Panel</p>
          </div>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>माहिती लोड होत आहे...</p>
          </div>
        ) : (
          <>
            <div className="admin-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className={`admin-stat-card admin-stat-card--${s.color}`}>
                  <div className="admin-stat-icon">{s.icon}</div>
                  <div className="admin-stat-info">
                    <div className="admin-stat-value">{s.value}</div>
                    <div className="admin-stat-label">{s.label}</div>
                    <div className="admin-stat-label-mr">{s.labelMr}</div>
                  </div>
                </div>
              ))}
            </div>

            {upcomingEvent && (
              <div className="admin-upcoming-card">
                <div className="admin-upcoming-badge">🎯 Upcoming Event</div>
                <h2 className="admin-upcoming-title">{upcomingEvent.MarathiTitle || upcomingEvent.EventTitle}</h2>
                <div className="admin-upcoming-meta">
                  <span>📅 {upcomingEvent.EventDate}</span>
                  <span>🕐 {upcomingEvent.StartTime} – {upcomingEvent.EndTime}</span>
                  <span>📍 {upcomingEvent.VenueName}</span>
                  <span className={`admin-badge ${upcomingEvent.RegistrationStatus === "Open" ? "admin-badge--green" : "admin-badge--red"}`}>
                    {upcomingEvent.RegistrationStatus === "Open" ? "🟢 Registration Open" : "🔴 Registration Closed"}
                  </span>
                </div>
              </div>
            )}

            <div className="admin-recent-section">
              <h3 className="admin-section-title">Recent Registrations</h3>
              {registrations.length === 0 ? (
                <div className="admin-empty">अजून कोणतीही नोंदणी नाही.</div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Event</th>
                        <th>People</th>
                        <th>Date & Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.slice(-5).reverse().map(r => (
                        <tr key={r.RegistrationID}>
                          <td>{r.FullName}</td>
                          <td>{r.MobileNumber}</td>
                          <td>{r.EventName}</td>
                          <td>{r.NumberOfPeople}</td>
                          <td>{r.RegistrationDateTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
