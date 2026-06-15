// OrnamentDivider.tsx
// Single-line: [ornament left] — subtitle text — [ornament right]
// Rendered as one flex row in Home.tsx

export default function OrnamentDivider() {
  return (
    <svg
      viewBox="0 0 160 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "160px", height: "24px", display: "block" }}
      aria-hidden="true"
    >
      {/* fade line */}
      <line x1="0" y1="12" x2="16" y2="12" stroke="#c9a227" strokeWidth="1" opacity="0.4"/>
      {/* dots */}
      <circle cx="20" cy="12" r="1.5" fill="#c9a227" opacity="0.65"/>
      <circle cx="26" cy="12" r="1.5" fill="#c9a227" opacity="0.65"/>
      {/* leaf pair */}
      <path d="M32,12 Q38,6 44,12 Q38,18 32,12Z" fill="#c9a227"/>
      <path d="M46,12 Q52,6 58,12 Q52,18 46,12Z" fill="#c9a227" opacity="0.7"/>
      {/* diamond */}
      <path d="M62,12 L67,7 L72,12 L67,17 Z" fill="#c9a227"/>
      {/* arrow */}
      <path d="M76,8 L84,12 L76,16"
        fill="none" stroke="#c9a227" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* accent dot */}
      <circle cx="90" cy="12" r="2.5" fill="#c9a227"/>
    </svg>
  );
}
