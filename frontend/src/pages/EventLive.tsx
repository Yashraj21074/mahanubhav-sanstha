import { Link } from "react-router-dom";
import "../styles/event-detail.css";

const YOUTUBE_URL = "https://youtube.com/@mumbaivupanagarmahanubhavpanth?si=ubNP9ti90B2snk5o";

export default function EventLive() {
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
          <div className="event-detail-badge">🔴 थेट प्रक्षेपण</div>
          <h1 className="event-detail-title">थेट प्रक्षेपण</h1>
          <div className="event-detail-meta-row">
            <span>📅 १६ सप्टेंबर २०२६ रोजी YouTube Live उपलब्ध होईल</span>
          </div>
        </div>

        <div className="event-detail-sections">
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">📺</span>
              <h2 className="ed-section-title">YouTube Live</h2>
            </div>
            <div className="ed-livestream-card">
              <div className="ed-livestream-badge">🔴 LIVE — १६ सप्टेंबर २०२६</div>
              <p className="ed-section-text">
                भगवान श्री चक्रधर स्वामी जयंती २०२६ — ८०५ वा ऐतिहासिक अवतारदिन सोहळा — १६ सप्टेंबर २०२६ रोजी सकाळी १० वाजल्यापासून आमच्या YouTube Channel वर थेट प्रक्षेपित केला जाईल.
              </p>
              <p className="ed-section-text" style={{marginTop: "0.5rem"}}>
                आतापासूनच Channel Subscribe करा आणि Bell Icon चालू ठेवा, जेणेकरून Live सुरू झाल्यावर लगेच सूचना मिळेल.
              </p>
              <div className="ed-livestream-actions">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--youtube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 2 12 2 12 2s-4.8 0-7.3.1c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S.3 8.4.3 10.6v2.1c0 2.2.2 4.4.2 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.3 12 21.3 12 21.3s4.8 0 7.3-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.2-2.2.2-4.4v-2.1c0-2.2-.2-4.4-.2-4.4zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
                  </svg>
                  YouTube Channel वर जा
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
