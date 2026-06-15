import { Link } from "react-router-dom";
import { useLang } from "../data/LanguageContext";
import EventCountdown from "../components/EventCountdown";
import "../styles/events.css";

export default function Events() {
  const { t } = useLang();
  return (
    <div className="events-page page-mandala-bg">
      <div className="events-container">
        <div className="events-header">
          <div className="events-header-orn">✦</div>
          <h1 className="events-title">{t("events_title")}</h1>
          <p className="events-subtitle">{t("events_subtitle")}</p>
          <div className="events-divider" />
        </div>

        <div className="events-grid events-grid--single">
          {/* Main featured event card */}
          <div className="event-card event-card--featured event-card--hero">
            <div className="event-card-badge">{t("event1_badge")}</div>
            <div className="event-card-icon">🏛️</div>
            <h2 className="event-card-title">{t("event1_title")}</h2>
            <p className="event-card-subtitle">८०५ वा ऐतिहासिक अवतारदिन सोहळा</p>
            <div className="event-card-meta">
              <div className="event-card-meta-row">
                <span className="event-card-meta-icon">📅</span>
                <span>{t("event1_date")}</span>
              </div>
              <div className="event-card-meta-row">
                <span className="event-card-meta-icon">🕙</span>
                <span>{t("event1_time")}</span>
              </div>
              <div className="event-card-meta-row">
                <span className="event-card-meta-icon">📍</span>
                <span>यशवंतराव चव्हाण सेंटर, मुंबई</span>
              </div>
            </div>
            <Link to="/events/chakradhar-jayanti-2026" className="event-card-btn event-card-btn--large">
              {t("event1_btn")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <EventCountdown />

    </div>
  );
}
