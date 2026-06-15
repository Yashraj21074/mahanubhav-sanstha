// ============================================================
// TempleSkyline.tsx
// SVG decorative bottom — temple spires + Mumbai city skyline
// Subtle, elegant, not overcrowded
// ============================================================

export default function TempleSkyline() {
  return (
    <div className="home-skyline">
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Water reflection gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8b0000" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Far background city silhouette */}
        <rect x="0" y="130" width="1440" height="90" fill="url(#skyGrad)" opacity="0.5" />

        {/* Water / river base */}
        <ellipse cx="720" cy="210" rx="800" ry="30" fill="url(#waterGrad)" />

        {/* ---- LEFT TEMPLE CLUSTER ---- */}
        {/* Main left temple */}
        <g opacity="0.55" fill="#8b5e1a">
          {/* Central spire */}
          <polygon points="90,40 100,80 80,80" fill="#c9a227" opacity="0.5"/>
          <rect x="78" y="80" width="24" height="70" rx="2" />
          {/* Left spire */}
          <polygon points="55,65 62,90 48,90" fill="#c9a227" opacity="0.4"/>
          <rect x="46" y="90" width="16" height="55" rx="2" />
          {/* Right spire */}
          <polygon points="128,65 135,90 121,90" fill="#c9a227" opacity="0.4"/>
          <rect x="120" y="90" width="16" height="55" rx="2" />
          {/* Base */}
          <rect x="40" y="143" width="104" height="10" rx="2" />
          {/* Steps */}
          <rect x="50" y="150" width="84" height="5" rx="1" />
          <rect x="60" y="153" width="64" height="17" rx="2" />
        </g>

        {/* Second left temple */}
        <g opacity="0.4" fill="#7a4a15" transform="translate(-20, 20)">
          <polygon points="210,60 218,85 202,85" fill="#c9a227" opacity="0.35"/>
          <rect x="200" y="85" width="18" height="65" rx="1" />
          <rect x="195" y="148" width="28" height="8" rx="2" />
          <rect x="190" y="154" width="38" height="16" rx="2" />
        </g>

        {/* City buildings left */}
        <g opacity="0.25" fill="#5c3317">
          <rect x="160" y="110" width="18" height="60" rx="2" />
          <rect x="182" y="95" width="22" height="75" rx="2" />
          <rect x="208" y="120" width="14" height="50" rx="2" />
          <rect x="226" y="105" width="20" height="65" rx="2" />
          <rect x="250" y="115" width="16" height="55" rx="2" />
          <rect x="270" y="100" width="24" height="70" rx="2" />
          <rect x="298" y="125" width="12" height="45" rx="2" />
        </g>

        {/* ---- RIGHT TEMPLE CLUSTER ---- */}
        <g opacity="0.55" fill="#8b5e1a" transform="scale(-1,1) translate(-1440,0)">
          {/* Mirror of left */}
          <polygon points="90,40 100,80 80,80" fill="#c9a227" opacity="0.5"/>
          <rect x="78" y="80" width="24" height="70" rx="2" />
          <polygon points="55,65 62,90 48,90" fill="#c9a227" opacity="0.4"/>
          <rect x="46" y="90" width="16" height="55" rx="2" />
          <polygon points="128,65 135,90 121,90" fill="#c9a227" opacity="0.4"/>
          <rect x="120" y="90" width="16" height="55" rx="2" />
          <rect x="40" y="143" width="104" height="10" rx="2" />
          <rect x="50" y="150" width="84" height="5" rx="1" />
          <rect x="60" y="153" width="64" height="17" rx="2" />
        </g>

        {/* City buildings right */}
        <g opacity="0.25" fill="#5c3317" transform="scale(-1,1) translate(-1440,0)">
          <rect x="160" y="110" width="18" height="60" rx="2" />
          <rect x="182" y="95" width="22" height="75" rx="2" />
          <rect x="208" y="120" width="14" height="50" rx="2" />
          <rect x="226" y="105" width="20" height="65" rx="2" />
          <rect x="250" y="115" width="16" height="55" rx="2" />
          <rect x="270" y="100" width="24" height="70" rx="2" />
          <rect x="298" y="125" width="12" height="45" rx="2" />
        </g>

        {/* ---- CENTER DOME / ARCH OUTLINE ---- */}
        <g opacity="0.20" fill="none" stroke="#c9a227" strokeWidth="1.5">
          <path d="M680,150 Q720,100 760,150" />
          <line x1="680" y1="150" x2="680" y2="175" />
          <line x1="760" y1="150" x2="760" y2="175" />
        </g>

        {/* ---- GROUND LINE ---- */}
        <line x1="0" y1="170" x2="1440" y2="170" stroke="#c9a227" strokeWidth="1" opacity="0.3" />

        {/* Water ripple lines */}
        <ellipse cx="720" cy="185" rx="400" ry="8" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.2" />
        <ellipse cx="720" cy="195" rx="600" ry="10" fill="none" stroke="#c9a227" strokeWidth="0.6" opacity="0.12" />
      </svg>
    </div>
  );
}
