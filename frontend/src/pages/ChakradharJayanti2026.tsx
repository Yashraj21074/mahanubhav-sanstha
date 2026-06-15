import { Link } from "react-router-dom";
import EventCountdown from "../components/EventCountdown";
import "../styles/event-detail.css";

const REGISTRATION_URL = "https://docs.google.com/spreadsheets/d/1osLmjz1t0B_Q83lPgrmkgBmD7cKW19c16NZfmmD9evY/edit?usp=sharing";
const WHATSAPP_URL     = "https://chat.whatsapp.com/Ez25J5hfRZE2WJsZzfRnzF?s=sh&p=a&ilr=0";
const YOUTUBE_URL      = "https://youtube.com/@mumbaivupanagarmahanubhavpanth?si=ubNP9ti90B2snk5o";
const MAPS_URL         = "https://www.google.com/maps/search/?api=1&query=Yashwantrao%20Chavan%20Centre%2C%20Mumbai%2C%20MH";

export default function ChakradharJayanti2026() {
  return (
    <div className="event-detail-page page-mandala-bg">
      <div className="event-detail-container">

        {/* Back */}
        <Link to="/events" className="event-detail-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          कार्यक्रम यादीकडे परत
        </Link>

        {/* ── 1. EVENT OVERVIEW ── */}
        <div className="event-detail-hero">
          <div className="event-detail-badge">८०५ वा ऐतिहासिक अवतारदिन सोहळा</div>
          <h1 className="event-detail-title">
            भगवान श्री चक्रधर स्वामी जयंती २०२६
          </h1>
          <div className="event-detail-meta-row">
            <span>📅 १६ सप्टेंबर २०२६</span>
            <span className="event-detail-meta-sep">•</span>
            <span>🕙 सकाळी १० ते सायं ४</span>
            <span className="event-detail-meta-sep">•</span>
            <span>📍 यशवंतराव चव्हाण सेंटर, मुंबई</span>
          </div>
          <p className="event-detail-overview-text">
            महानुभाव पंथाचे संस्थापक भगवान श्री चक्रधर स्वामी यांचा ८०५ वा ऐतिहासिक अवतारदिन सोहळा मुंबई व उपनगर महानुभाव पंथीय संस्थेतर्फे भव्य स्वरूपात साजरा केला जाणार आहे. सर्व भक्तांना सादर आमंत्रण आहे.
          </p>

          {/* Quick action buttons */}
          <div className="event-detail-quick-btns">
            <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--primary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              नोंदणी करा
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--whatsapp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Group Join करा
            </a>
          </div>
        </div>

        <div className="event-detail-sections">

          {/* ── 2. COUNTDOWN ── */}
          <div className="ed-section ed-section--countdown">
            <div className="ed-section-header">
              <span className="ed-section-icon">⏳</span>
              <h2 className="ed-section-title">सोहळ्यासाठी उलटी गणती</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown outside container for full-width */}
      <EventCountdown />

      <div className="event-detail-container">
        <div className="event-detail-sections">

          {/* ── 3. REGISTRATION ── */}
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">📝</span>
              <h2 className="ed-section-title">नोंदणी माहिती</h2>
            </div>
            <div className="ed-registration-card">
              <p className="ed-section-text">
                सोहळ्यात सहभागी होण्यासाठी कृपया आगाऊ नोंदणी करावी. नोंदणी Google Form द्वारे केली जाते. WhatsApp Group मध्ये सामील व्हा आणि सर्व अपडेट्स मिळवा.
              </p>
              <div className="ed-reg-btns">
                <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--primary ed-btn--wide">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  नोंदणी करा
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--whatsapp ed-btn--wide">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Group Join करा
                </a>
              </div>
            </div>
          </div>

          {/* ── 4. SCHEDULE PREVIEW ── */}
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">🗓</span>
              <h2 className="ed-section-title">कार्यक्रम वेळापत्रक</h2>
            </div>
            <div className="ed-schedule-preview">
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सकाळी १०:०० </span>
                <span className="ed-schedule-event">सोहळ्याचा प्रारंभ</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सकाळी ११:०० </span>
                <span className="ed-schedule-event">पूजा व अभिषेक</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">दुपारी १२:३०</span>
                <span className="ed-schedule-event">महाप्रसाद</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">दुपारी २:०० </span>
                <span className="ed-schedule-event">कीर्तन व प्रवचन</span>
              </div>
              <div className="ed-schedule-row">
                <span className="ed-schedule-time">सायं ४:०० </span>
                <span className="ed-schedule-event">सोहळ्याचा समारोप</span>
              </div>
              <div className="ed-schedule-note">
                * सविस्तर वेळापत्रक लवकरच जाहीर केले जाईल.
              </div>
            </div>
            <Link to="/events/chakradhar-jayanti-2026/schedule" className="ed-btn ed-btn--outline ed-btn--sm">
              संपूर्ण वेळापत्रक पहा →
            </Link>
          </div>

          {/* ── 5. LIVE STREAM ── */}
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">📺</span>
              <h2 className="ed-section-title">थेट प्रक्षेपण</h2>
            </div>
            <div className="ed-livestream-card">
              <div className="ed-livestream-badge">🔴 LIVE — १६ सप्टेंबर २०२६</div>
              <p className="ed-section-text">
                सोहळ्याचे थेट प्रक्षेपण आमच्या YouTube Channel वर उपलब्ध असेल. सब्स्क्राइब करा आणि नोटिफिकेशन चालू ठेवा.
              </p>
              <div className="ed-livestream-actions">
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--youtube">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 2 12 2 12 2s-4.8 0-7.3.1c-.6.1-1.9.1-3 1.3-.9.8-1.2 2.8-1.2 2.8S.3 8.4.3 10.6v2.1c0 2.2.2 4.4.2 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.3 12 21.3 12 21.3s4.8 0 7.3-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.2-2.2.2-4.4v-2.1c0-2.2-.2-4.4-.2-4.4zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
                  </svg>
                  YouTube Channel वर जा
                </a>
                <Link to="/events/chakradhar-jayanti-2026/live" className="ed-btn ed-btn--outline ed-btn--sm">
                  थेट प्रक्षेपण माहिती →
                </Link>
              </div>
            </div>
          </div>

          {/* ── 6. VENUE ── */}
          <div className="ed-section">
            <div className="ed-section-header">
              <span className="ed-section-icon">📍</span>
              <h2 className="ed-section-title">कार्यक्रमाचे ठिकाण</h2>
            </div>
            <div className="ed-venue-card">
              <div className="ed-venue-name">यशवंतराव चव्हाण सेंटर</div>
              <div className="ed-venue-address">नरिमन पॉइंट, मुंबई, महाराष्ट्र</div>
              <div className="ed-venue-btns">
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="ed-btn ed-btn--maps">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Google Maps वर पहा
                </a>
                <Link to="/events/chakradhar-jayanti-2026/venue" className="ed-btn ed-btn--outline ed-btn--sm">
                  स्थळ माहिती →
                </Link>
              </div>
            </div>
            <div className="ed-travel-grid">
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🚇</span>
                <div>
                  <div className="ed-travel-mode">मेट्रो</div>
                  <div className="ed-travel-detail">चर्चगेट स्टेशन — ५ मिनिटे चालत</div>
                </div>
              </div>
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🚌</span>
                <div>
                  <div className="ed-travel-mode">बस</div>
                  <div className="ed-travel-detail">BEST बस — नरिमन पॉइंट थांबा</div>
                </div>
              </div>
              <div className="ed-travel-item">
                <span className="ed-travel-icon">🅿️</span>
                <div>
                  <div className="ed-travel-mode">पार्किंग</div>
                  <div className="ed-travel-detail">जवळच पेड पार्किंग उपलब्ध</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
