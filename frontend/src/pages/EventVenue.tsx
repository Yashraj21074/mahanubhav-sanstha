import { Link } from "react-router-dom";
import "../styles/event-detail.css";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Yashwantrao%20Chavan%20Centre%2C%20Mumbai%2C%20MH";

export default function EventVenue() {
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
          <div className="event-detail-badge">📍 स्थळ माहिती</div>
          <h1 className="event-detail-title">स्थळ माहिती</h1>
          <div className="event-detail-meta-row">
            <span>भगवान श्री चक्रधर स्वामी जयंती २०२६</span>
          </div>
        </div>

        <div className="event-detail-sections">
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">🏛</span>
              <h2 className="ed-section-title">कार्यक्रमाचे ठिकाण</h2>
            </div>
            <div className="ed-venue-card ed-venue-card--large">
              <div className="ed-venue-name">यशवंतराव चव्हाण सेंटर</div>
              <div className="ed-venue-address">नरिमन पॉइंट, मुंबई, महाराष्ट्र ४०० ०२१</div>
              <p className="ed-section-text" style={{marginTop: "0.75rem"}}>
                यशवंतराव चव्हाण सेंटर हे मुंबईच्या मध्यवर्ती नरिमन पॉइंट येथे स्थित आहे. हे ठिकाण सार्वजनिक वाहतुकीने सहज उपलब्ध आहे.
              </p>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--maps">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Google Maps वर उघडा
              </a>
            </div>
          </div>

          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">🚌</span>
              <h2 className="ed-section-title">कसे पोहोचाल</h2>
            </div>
            <div className="ed-travel-grid ed-travel-grid--full">
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🚇</span>
                <div>
                  <div className="ed-travel-mode">मेट्रो / लोकल</div>
                  <div className="ed-travel-detail">चर्चगेट स्टेशन — ५ मिनिटे चालत • CST — १५ मिनिटे टॅक्सी</div>
                </div>
              </div>
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🚌</span>
                <div>
                  <div className="ed-travel-mode">BEST बस</div>
                  <div className="ed-travel-detail">नरिमन पॉइंट थांबा — अनेक मार्ग उपलब्ध</div>
                </div>
              </div>
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🚕</span>
                <div>
                  <div className="ed-travel-mode">टॅक्सी / ऑटो</div>
                  <div className="ed-travel-detail">Ola / Uber — "Yashwantrao Chavan Centre, Nariman Point" टाइप करा</div>
                </div>
              </div>
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🅿️</span>
                <div>
                  <div className="ed-travel-mode">पार्किंग</div>
                  <div className="ed-travel-detail">जवळच पेड पार्किंग उपलब्ध आहे</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
