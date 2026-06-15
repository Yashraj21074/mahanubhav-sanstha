import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/mandal-map.css";

interface Mandal {
  id: number;
  name: string;
  location: string;
  area: string;
  // SVG coords on the Mumbai map (0–100 scale)
  x: number;
  y: number;
  contact?: string;
}

const MANDALS: Mandal[] = [
  { id: 1,  name: "महानुभाव श्री कृष्ण ज्ञान मंदिर",                     location: "वडाळा, मुंबई",       area: "मध्य मुंबई",   x: 42, y: 48, contact: "—" },
  { id: 2,  name: "श्रीकृष्ण चक्रधर सेवा मंडळ ट्रस्ट",                  location: "नेरुळ, नवी मुंबई",   area: "नवी मुंबई",    x: 62, y: 68, contact: "—" },
  { id: 3,  name: "श्री गीता पाठशाळा",                                     location: "दादर, मुंबई",        area: "मध्य मुंबई",   x: 38, y: 44, contact: "—" },
  { id: 4,  name: "श्री गोविंदप्रभू सेवा मंडळ",                          location: "पनवेल",               area: "रायगड",        x: 74, y: 82, contact: "—" },
  { id: 5,  name: "श्री चक्रपाणी सेवा मंडळ",                             location: "घाटकोपर, मुंबई",     area: "पूर्व मुंबई",  x: 55, y: 47, contact: "—" },
  { id: 6,  name: "श्री ब्रह्मविद्या सेवा मंडळ",                         location: "विक्रोळी, मुंबई",    area: "पूर्व मुंबई",  x: 60, y: 43, contact: "—" },
  { id: 7,  name: "श्रीकृष्ण ज्ञानपीठ",                                   location: "माटुंगा, मुंबई",     area: "मध्य मुंबई",   x: 40, y: 46, contact: "—" },
  { id: 8,  name: "सर्वज्ञ वाचनालय",                                       location: "पवई, मुंबई",         area: "पूर्व मुंबई",  x: 58, y: 38, contact: "—" },
  { id: 9,  name: "श्रीकृष्ण मंदिर संकल्प संस्था",                       location: "उल्हासनगर",           area: "ठाणे जिल्हा",  x: 72, y: 32, contact: "—" },
  { id: 10, name: "धनाईसा महिला मंडळ",                                    location: "ऐरोली, नवी मुंबई",   area: "नवी मुंबई",    x: 65, y: 57, contact: "—" },
  { id: 11, name: "सर्वज्ञ समाज प्रबोधन केंद्र",                         location: "गोरेगाव, मुंबई",     area: "पश्चिम मुंबई", x: 33, y: 30, contact: "—" },
  { id: 12, name: "सर्वज्ञ सेवा प्रतिष्ठान ट्रस्ट",                     location: "नवी मुंबई",           area: "नवी मुंबई",    x: 64, y: 63, contact: "—" },
  { id: 13, name: "श्री पंचकृष्ण दर्शन ग्रुप",                           location: "कल्याण",              area: "ठाणे जिल्हा",  x: 78, y: 38, contact: "—" },
  { id: 14, name: "सर्वज्ञ सत्संग मंडळ",                                  location: "वरसई",                area: "रायगड",        x: 50, y: 88, contact: "—" },
  { id: 15, name: "श्रीकृष्ण मंदिर / गुरुमाऊली महिला मंडळ",             location: "मानखुर्द, मुंबई",    area: "दक्षिण मुंबई", x: 48, y: 56, contact: "—" },
  { id: 16, name: "महदंबा महिला मंडळ",                                    location: "डोंबिवली",            area: "ठाणे जिल्हा",  x: 82, y: 44, contact: "—" },
  { id: 17, name: "श्रीकृष्ण मंदिर महानुभाव आश्रम",                     location: "उल्हासनगर",           area: "ठाणे जिल्हा",  x: 74, y: 28, contact: "—" },
  { id: 18, name: "बदलापूर सत्संग",                                        location: "बदलापूर",             area: "ठाणे जिल्हा",  x: 88, y: 40, contact: "—" },
];

// Mumbai outline as SVG path (approximate schematic, not geodata)
const MUMBAI_PATH = `
  M 30 8
  C 32 6, 36 5, 38 8
  L 40 12, 38 18, 36 22, 34 28
  C 32 32, 30 34, 28 36
  L 26 40, 25 44, 24 48
  C 23 52, 22 56, 24 60
  L 26 64, 28 68, 30 72
  C 32 76, 34 80, 36 82
  L 38 84, 42 86, 46 88
  C 50 90, 54 90, 58 88
  L 64 84, 68 80, 72 76
  C 76 72, 78 68, 80 64
  L 82 60, 82 56, 80 52
  C 78 48, 76 44, 74 40
  L 72 36, 70 32, 68 28
  C 66 24, 64 20, 62 18
  L 60 14, 58 10, 54 8
  C 50 6, 46 5, 42 6
  Z
`;

export default function MandalMap() {
  const [selected, setSelected] = useState<Mandal | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // mobile accordion
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="mmap-section">
      <div className="mmap-inner">
        {/* Section header */}
        <div className="mmap-header">
          <span className="mmap-orn">✦</span>
          <h2 className="mmap-title">मुंबई व उपनगरातील मंडळे</h2>
          <span className="mmap-orn">✦</span>
          <p className="mmap-subtitle">१८ मंडळांचे परिचय व माहिती</p>
        </div>

        <div className="mmap-layout">
          {/* LEFT — Map */}
          <div className="mmap-map-wrap">
            <svg
              viewBox="0 0 110 100"
              xmlns="http://www.w3.org/2000/svg"
              className="mmap-svg"
              role="img"
              aria-label="मुंबई व उपनगर नकाशा"
            >
              <defs>
                <radialGradient id="mapBg" cx="50%" cy="50%" r="60%">
                  <stop offset="0%"   stopColor="#3a1800" stopOpacity="1" />
                  <stop offset="100%" stopColor="#1a0500" stopOpacity="1" />
                </radialGradient>
                <filter id="markerGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="markerGlowStrong">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background */}
              <rect width="110" height="100" fill="url(#mapBg)" rx="6" />

              {/* Grid lines */}
              {[20,40,60,80].map(v => (
                <g key={v} stroke="rgba(212,175,55,0.08)" strokeWidth="0.3">
                  <line x1={v} y1="0" x2={v} y2="100" />
                  <line x1="0" y1={v} x2="110" y2={v} />
                </g>
              ))}

              {/* Region labels */}
              <text x="22" y="20" fill="rgba(212,175,55,0.25)" fontSize="3.2" fontFamily="sans-serif">पश्चिम</text>
              <text x="50" y="15" fill="rgba(212,175,55,0.25)" fontSize="3.2" fontFamily="sans-serif">मध्य</text>
              <text x="70" y="20" fill="rgba(212,175,55,0.25)" fontSize="3.2" fontFamily="sans-serif">ठाणे</text>
              <text x="56" y="75" fill="rgba(212,175,55,0.25)" fontSize="3.2" fontFamily="sans-serif">नवी मुंबई</text>
              <text x="65" y="88" fill="rgba(212,175,55,0.25)" fontSize="3.2" fontFamily="sans-serif">रायगड</text>

              {/* Coast line suggestion */}
              <path d="M 26 10 Q 28 30 24 50 Q 22 65 28 78 Q 34 88 42 92" stroke="rgba(100,160,220,0.18)" strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" />

              {/* Connection lines between markers */}
              {MANDALS.map(m => (
                <line key={m.id}
                  x1={55} y1={50}
                  x2={m.x} y2={m.y}
                  stroke="rgba(212,175,55,0.04)"
                  strokeWidth="0.3"
                />
              ))}

              {/* Markers */}
              {MANDALS.map((m) => {
                const isSelected = selected?.id === m.id;
                const isHovered  = hovered === m.id;
                const active = isSelected || isHovered;
                return (
                  <g
                    key={m.id}
                    onClick={() => setSelected(m)}
                    onMouseEnter={() => setHovered(m.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "pointer" }}
                    className={`mmap-marker-group ${active ? "mmap-marker-group--active" : ""}`}
                  >
                    {/* Glow ring (active only) */}
                    {active && (
                      <circle
                        cx={m.x} cy={m.y}
                        r="5.5"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.8"
                        opacity="0.6"
                        className="mmap-ring"
                      />
                    )}
                    {/* Outer circle */}
                    <circle
                      cx={m.x} cy={m.y}
                      r={active ? 3.8 : 3}
                      fill={active ? "#D4AF37" : "#8B0000"}
                      stroke={active ? "#F0C040" : "rgba(212,175,55,0.5)"}
                      strokeWidth="0.6"
                      filter={active ? "url(#markerGlowStrong)" : "url(#markerGlow)"}
                      className="mmap-dot"
                    />
                    {/* Inner dot */}
                    <circle
                      cx={m.x} cy={m.y}
                      r={active ? 1.4 : 1}
                      fill={active ? "#3a1000" : "#F0C040"}
                    />
                    {/* Number label */}
                    <text
                      x={m.x + 3.5} y={m.y - 2}
                      fill={active ? "#F0C040" : "rgba(240,192,64,0.7)"}
                      fontSize="2.8"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {m.id}
                    </text>
                  </g>
                );
              })}

              {/* Center label */}
              <text x="40" y="98" fill="rgba(212,175,55,0.4)" fontSize="2.5" fontFamily="sans-serif">मुंबई महानगर क्षेत्र</text>
            </svg>
          </div>

          {/* RIGHT — Info panel */}
          <div className="mmap-panel">
            {selected ? (
              <div className="mmap-detail">
                <div className="mmap-detail-header">
                  <span className="mmap-detail-num">{selected.id}</span>
                  <div>
                    <h3 className="mmap-detail-name">{selected.name}</h3>
                    <p className="mmap-detail-area">{selected.area}</p>
                  </div>
                </div>
                <div className="mmap-detail-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{selected.location}</span>
                </div>
                <div className="mmap-detail-divider" />
                <p className="mmap-detail-desc">
                  हे मंडळ महानुभाव पंथाच्या सेवा, भक्ती आणि संस्कृतीच्या प्रसारासाठी कार्यरत आहे.
                </p>
                <Link to="/mandal" className="mmap-detail-btn">
                  संपूर्ण माहिती पहा
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <button className="mmap-close-btn" onClick={() => setSelected(null)} aria-label="बंद करा">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ) : (
              <div className="mmap-placeholder">
                <div className="mmap-placeholder-icon">🗺</div>
                <p className="mmap-placeholder-text">नकाशावरील कोणत्याही मंडळाच्या चिन्हावर क्लिक करा</p>
                <p className="mmap-placeholder-sub">Click any marker on the map to view mandal details</p>
                <div className="mmap-legend">
                  {["मध्य मुंबई", "पूर्व मुंबई", "पश्चिम मुंबई", "नवी मुंबई", "ठाणे जिल्हा", "रायगड"].map(a => (
                    <span key={a} className="mmap-legend-chip">• {a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Mandal list (scrollable) */}
            <ul className="mmap-list">
              {MANDALS.map((m) => (
                <li
                  key={m.id}
                  className={`mmap-list-item ${selected?.id === m.id ? "mmap-list-item--active" : ""}`}
                  onClick={() => setSelected(selected?.id === m.id ? null : m)}
                >
                  <span className="mmap-list-num">{m.id}</span>
                  <span className="mmap-list-name">{m.name}</span>
                  <span className="mmap-list-loc">{m.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MOBILE accordion */}
        <div className="mmap-accordion">
          {MANDALS.map((m) => (
            <div key={m.id} className={`mmap-acc-item ${openId === m.id ? "mmap-acc-item--open" : ""}`}>
              <button
                className="mmap-acc-header"
                onClick={() => setOpenId(openId === m.id ? null : m.id)}
              >
                <span className="mmap-acc-num">{m.id}</span>
                <span className="mmap-acc-name">{m.name}</span>
                <svg
                  className="mmap-acc-arrow"
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openId === m.id && (
                <div className="mmap-acc-body">
                  <div className="mmap-acc-row">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {m.location}
                  </div>
                  <div className="mmap-acc-row">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="12 2 2 7 12 22 22 7"/></svg>
                    {m.area}
                  </div>
                  <Link to="/mandal" className="mmap-acc-link">संपूर्ण माहिती →</Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mmap-footer">
          <Link to="/mandal" className="mmap-footer-btn">
            सर्व मंडळांची यादी पहा
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
