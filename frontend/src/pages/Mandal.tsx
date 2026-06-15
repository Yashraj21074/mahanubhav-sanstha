import { useLang } from "../data/LanguageContext";
import MandalMap from "../components/MandalMap";
import "../styles/mandal.css";

const MANDAL_IDS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

export default function Mandal() {
  const { t } = useLang();
  return (
    <div className="mandal-page page-temple-bg">
      <div className="mandal-container">

        <div className="mandal-header">
          <div className="mandal-header-orn">✦</div>
          <h1 className="mandal-title">{t("mandal_page_title")}</h1>
          <p className="mandal-subtitle">{t("mandal_page_subtitle")}</p>
          <div className="mandal-divider" />
        </div>

        <div className="mandal-grid">
          {MANDAL_IDS.map((id) => (
            <div key={id} className="mandal-card">
              <div className="mandal-card-number">{id}</div>
              <div className="mandal-card-body">
                <h3 className="mandal-card-name">{t(`mandal_${id}_name`)}</h3>
                <p className="mandal-card-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {t(`mandal_${id}_location`)}
                </p>
              </div>
              <div className="mandal-card-accent" />
            </div>
          ))}
        </div>

        <p className="mandal-footer-note">{t("mandal_footer")}</p>
      </div>

      {/* ── INTERACTIVE MAP ── */}
      <MandalMap />

    </div>
  );
}
