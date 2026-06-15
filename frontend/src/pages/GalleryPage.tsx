import { useEffect, useState } from "react";
import { getGallery, groupGalleryByYear, GalleryItem } from "../services/galleryService";
import GalleryCard from "../components/GalleryCard";
import "../styles/publicPages.css";

export default function GalleryPage() {
  const [grouped, setGrouped] = useState<Record<string, GalleryItem[]>>({});
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    getGallery()
      .then(data => {
        const g = groupGalleryByYear(data);
        setGrouped(g);
        const ys = Object.keys(g).sort((a, b) => Number(b) - Number(a));
        setYears(ys);
      })
      .catch(() => setError("गॅलरी लोड करताना त्रुटी झाली."))
      .finally(() => setLoading(false));
  }, []);

  const displayYears = filterYear ? [filterYear] : years;

  return (
    <div className="pub-page">
      <div className="pub-page-hero">
        <div className="pub-page-hero__inner">
          <h1 className="pub-page-hero__title">📷 गॅलरी</h1>
          <p className="pub-page-hero__sub">कार्यक्रमांचे फोटो अल्बम — Photo Gallery</p>
        </div>
      </div>

      <div className="pub-container">
        {years.length > 1 && (
          <div className="pub-gallery-filter">
            <button
              className={`pub-year-btn ${!filterYear ? "pub-year-btn--active" : ""}`}
              onClick={() => setFilterYear("")}
            >सर्व</button>
            {years.map(y => (
              <button
                key={y}
                className={`pub-year-btn ${filterYear === y ? "pub-year-btn--active" : ""}`}
                onClick={() => setFilterYear(y)}
              >{y}</button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="pub-loading">
            <div className="pub-spinner" />
            <p>गॅलरी लोड होत आहे...</p>
          </div>
        ) : error ? (
          <div className="pub-alert pub-alert--error">{error}</div>
        ) : years.length === 0 ? (
          <div className="pub-empty-state">
            <div className="pub-empty-icon">📷</div>
            <p>सध्या कोणताही गॅलरी album उपलब्ध नाही.</p>
          </div>
        ) : (
          displayYears.map(year => (
            <section key={year} className="pub-section pub-gallery-year-section">
              <h2 className="pub-gallery-year-title">
                <span className="pub-gallery-year-line" />
                <span className="pub-gallery-year-text">📅 {year}</span>
                <span className="pub-gallery-year-line" />
              </h2>
              <div className="pub-gallery-grid">
                {(grouped[year] || [])
                  .sort((a, b) => new Date(b.CreatedDate||0).getTime() - new Date(a.CreatedDate||0).getTime())
                  .map(item => (
                    <GalleryCard key={item.GalleryID} item={item} />
                  ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
