import { Link } from "react-router-dom";
import "../styles/event-detail.css";

export default function EventSchedule() {
  return (
    <div className="event-detail-page page-mandala-bg">
      <div className="event-detail-container">
        <Link to="/events/chakradhar-jayanti-2026" className="event-detail-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          कार्यक्रम पानाकडे परत
        </Link>

        <div className="event-detail-hero">
          <div className="event-detail-badge">१६ सप्टेंबर २०२६</div>
          <h1 className="event-detail-title">कार्यक्रम वेळापत्रक</h1>
          <div className="event-detail-meta-row">
            <span>📅 भगवान श्री चक्रधर स्वामी जयंती २०२६</span>
          </div>
        </div>

        <div className="event-detail-sections">
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">🗓</span>
              <h2 className="ed-section-title">दिनक्रम — १६ सप्टेंबर २०२६</h2>
            </div>
            <div className="ed-schedule-preview ed-schedule-preview--full">
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सकाळी १०:०० </span>
                <span className="ed-schedule-event">सोहळ्याचा प्रारंभ — दीपप्रज्वलन</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सकाळी ११:०० </span>
                <span className="ed-schedule-event">पूजा, अभिषेक व आरती</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">दुपारी १२:३०</span>
                <span className="ed-schedule-event">महाप्रसाद वितरण</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">दुपारी २:०० </span>
                <span className="ed-schedule-event">कीर्तन व प्रवचन</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">दुपारी ३:३०</span>
                <span className="ed-schedule-event">भजन व सांस्कृतिक कार्यक्रम</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सायं ४:०० </span>
                <span className="ed-schedule-event">सोहळ्याचा समारोप</span>
              </div>
            </div>
            <div className="ed-coming-soon-box">
              <span className="ed-coming-icon">📢</span>
              <p>सविस्तर कार्यक्रम वेळापत्रक लवकरच जाहीर केले जाईल.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
