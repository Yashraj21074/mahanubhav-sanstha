// OrnamentTop.tsx — decorative scrollwork above the sanstha title
// Central jewel/flower with bilateral scroll arms

export default function OrnamentTop() {
  return (
    <svg
      viewBox="0 0 360 50"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "360px", height: "auto", display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#c9a227" stopOpacity="0"/>
          <stop offset="60%" stopColor="#c9a227" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c9a227" stopOpacity="0.6"/>
          <stop offset="40%"  stopColor="#c9a227" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#c9a227" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* === CENTER JEWEL === */}
      {/* Petals */}
      <path d="M180 5  Q186 14 180 23 Q174 14 180 5Z"  fill="#c9a227"/>
      <path d="M180 23 Q186 32 180 41 Q174 32 180 23Z" fill="#c9a227"/>
      <path d="M180 5  Q189 9  191 19 Q182 18 180 5Z"  fill="#c9a227" opacity="0.7"/>
      <path d="M180 5  Q171 9  169 19 Q178 18 180 5Z"  fill="#c9a227" opacity="0.7"/>
      <path d="M180 23 Q189 27 191 37 Q182 36 180 23Z" fill="#c9a227" opacity="0.65"/>
      <path d="M180 23 Q171 27 169 37 Q178 36 180 23Z" fill="#c9a227" opacity="0.65"/>
      {/* Center rings */}
      <circle cx="180" cy="23" r="8.5" fill="#c9a227"/>
      <circle cx="180" cy="23" r="6"   fill="#e8c44a"/>
      <circle cx="180" cy="23" r="3.5" fill="#c9a227"/>
      <circle cx="180" cy="23" r="1.8" fill="#ffe87c"/>

      {/* === LEFT SCROLL ARM === */}
      {/* Main arm */}
      <path d="M171,23 Q152,23 138,14 Q126,7 118,14 Q110,21 118,25 Q126,27 133,22"
        fill="none" stroke="#c9a227" strokeWidth="1.7" strokeLinecap="round"/>
      {/* Curl end */}
      <path d="M133,22 Q128,17 131,12 Q136,7 141,12"
        fill="none" stroke="#c9a227" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Lower secondary curl */}
      <path d="M168,28 Q154,33 141,29 Q132,25 137,20"
        fill="none" stroke="#c9a227" strokeWidth="1.1" opacity="0.6" strokeLinecap="round"/>
      {/* Diamond accent */}
      <path d="M110,23 L115,18 L120,23 L115,28 Z" fill="#c9a227" opacity="0.85"/>
      {/* Dot trail */}
      <circle cx="102" cy="23" r="2.2" fill="#c9a227" opacity="0.85"/>
      <circle cx="93"  cy="23" r="1.7" fill="#c9a227" opacity="0.7"/>
      <circle cx="85"  cy="23" r="1.3" fill="#c9a227" opacity="0.55"/>
      <circle cx="78"  cy="23" r="1.0" fill="#c9a227" opacity="0.4"/>
      {/* Fade line */}
      <line x1="4" y1="23" x2="74" y2="23" stroke="url(#fadeLeft)" strokeWidth="1.2"/>

      {/* === RIGHT SCROLL ARM (mirror) === */}
      <path d="M189,23 Q208,23 222,14 Q234,7 242,14 Q250,21 242,25 Q234,27 227,22"
        fill="none" stroke="#c9a227" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M227,22 Q232,17 229,12 Q224,7 219,12"
        fill="none" stroke="#c9a227" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M192,28 Q206,33 219,29 Q228,25 223,20"
        fill="none" stroke="#c9a227" strokeWidth="1.1" opacity="0.6" strokeLinecap="round"/>
      <path d="M250,23 L245,18 L240,23 L245,28 Z" fill="#c9a227" opacity="0.85"/>
      <circle cx="258" cy="23" r="2.2" fill="#c9a227" opacity="0.85"/>
      <circle cx="267" cy="23" r="1.7" fill="#c9a227" opacity="0.7"/>
      <circle cx="275" cy="23" r="1.3" fill="#c9a227" opacity="0.55"/>
      <circle cx="282" cy="23" r="1.0" fill="#c9a227" opacity="0.4"/>
      <line x1="286" y1="23" x2="356" y2="23" stroke="url(#fadeRight)" strokeWidth="1.2"/>
    </svg>
  );
}
