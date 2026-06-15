import { useEffect, useState } from "react";
import { getPublicEvents, Event } from "../services/eventsService";
import EventCard from "../components/EventCard";
import "../styles/publicPages.css";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPublicEvents()
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(a.EventDate).getTime() - new Date(b.EventDate).getTime());
        setEvents(sorted);
      })
      .catch(() => setError("माहिती लोड करताना त्रुटी झाली. कृपया पुन्हा प्रयत्न करा."))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.find(e => new Date(e.EventDate) >= now);
  const rest = events.filter(e => e.EventID !== upcoming?.EventID);

  return (
    <div className="pub-page">
      <div className="pub-page-hero">
        <div className="pub-page-hero__inner">
          <h1 className="pub-page-hero__title">🎪 कार्यक्रम</h1>
          <p className="pub-page-hero__sub">Mumbai & Suburban Mahanubhav Panthi Sanstha — Events</p>
        </div>
      </div>

      <div className="pub-container">
        {loading ? (
          <div className="pub-loading">
            <div className="pub-spinner" />
            <p>कार्यक्रम लोड होत आहे...</p>
          </div>
        ) : error ? (
          <div className="pub-alert pub-alert--error">{error}</div>
        ) : events.length === 0 ? (
          <div className="pub-empty-state">
            <div className="pub-empty-icon">🕉️</div>
            <p>सध्या कोणताही कार्यक्रम उपलब्ध नाही.</p>
          </div>
        ) : (
          <>
            {upcoming && (
              <section className="pub-section">
                <h2 className="pub-section-title">✨ आगामी कार्यक्रम</h2>
                <EventCard event={upcoming} isUpcoming />
              </section>
            )}
            {rest.length > 0 && (
              <section className="pub-section">
                <h2 className="pub-section-title">📅 इतर कार्यक्रम</h2>
                <div className="pub-events-grid">
                  {rest.map(e => <EventCard key={e.EventID} event={e} />)}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
