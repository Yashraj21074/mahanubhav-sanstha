import { Event } from "../services/eventsService";
import { useNavigate } from "react-router-dom";
import "../styles/publicPages.css";

interface Props {
  event: Event;
  isUpcoming?: boolean;
}

export default function EventCard({ event, isUpcoming }: Props) {
  const navigate = useNavigate();
  const isOpen = event.RegistrationStatus === "Open";

  const handleRegister = () => {
    navigate(`/registration?eventId=${event.EventID}&eventName=${encodeURIComponent(event.MarathiTitle || event.EventTitle)}`);
  };

  return (
    <div className={`pub-event-card ${isUpcoming ? "pub-event-card--upcoming" : ""}`}>
      {isUpcoming && <div className="pub-event-card__upcoming-badge">✨ आगामी कार्यक्रम</div>}

      {event.EventImageURL && (
        <div className="pub-event-card__image">
          <img src={event.EventImageURL} alt={event.EventTitle}
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }} />
        </div>
      )}

      <div className="pub-event-card__body">
        <h3 className="pub-event-card__title">{event.MarathiTitle || event.EventTitle}</h3>
        {event.HindiTitle && <p className="pub-event-card__hindi">{event.HindiTitle}</p>}

        <div className="pub-event-card__meta">
          {event.EventDate && (
            <span className="pub-event-card__meta-item">
              <span className="pub-event-card__meta-icon">📅</span>
              {event.EventDate}
            </span>
          )}
          {event.StartTime && (
            <span className="pub-event-card__meta-item">
              <span className="pub-event-card__meta-icon">🕐</span>
              {event.StartTime}{event.EndTime ? ` – ${event.EndTime}` : ""}
            </span>
          )}
          {event.VenueName && (
            <span className="pub-event-card__meta-item">
              <span className="pub-event-card__meta-icon">📍</span>
              {event.VenueName}
            </span>
          )}
        </div>

        {event.Description && (
          <p className="pub-event-card__desc">{event.Description}</p>
        )}

        <div className="pub-event-card__actions">
          {isOpen ? (
            <button className="pub-btn pub-btn--primary" onClick={handleRegister}>
              📋 नोंदणी करा (Register Now)
            </button>
          ) : (
            <span className="pub-registration-closed">🔴 नोंदणी बंद आहे</span>
          )}

          {event.GoogleMapsLink && (
            <a href={event.GoogleMapsLink} target="_blank" rel="noopener noreferrer" className="pub-btn pub-btn--outline">
              📍 Venue
            </a>
          )}
          {event.YouTubeLiveLink && (
            <a href={event.YouTubeLiveLink} target="_blank" rel="noopener noreferrer" className="pub-btn pub-btn--youtube">
              ▶️ Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
