// FestivalMode.tsx — Optional festival petal/particle rain
// Usage: import { FestivalParticles, useFestival } from "./FestivalMode"
// Toggle: set festivalMode = true below, or wrap with context
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";
import "../styles/festival.css";

// ── Config ────────────────────────────────────────────────────
// Set to true to enable festival mode by default (e.g. on Jayanti day)
export const DEFAULT_FESTIVAL_MODE = false;

interface FestivalContextType {
  festivalMode: boolean;
  toggleFestival: () => void;
}

const FestivalContext = createContext<FestivalContextType>({
  festivalMode: DEFAULT_FESTIVAL_MODE,
  toggleFestival: () => {},
});

export function FestivalProvider({ children }: { children: ReactNode }) {
  const [festivalMode, setFestivalMode] = useState(DEFAULT_FESTIVAL_MODE);
  const toggleFestival = () => setFestivalMode((v) => !v);
  return (
    <FestivalContext.Provider value={{ festivalMode, toggleFestival }}>
      {children}
    </FestivalContext.Provider>
  );
}

export function useFestival() {
  return useContext(FestivalContext);
}

// ── Petal/particle shape types ────────────────────────────────
type PetalShape = "flower" | "leaf" | "spark" | "ring";

interface Petal {
  id: number;
  shape: PetalShape;
  size: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  drift: number;
  rotate: number;
}

const PETAL_COLORS = [
  "#c9a227", // gold
  "#e8c44a", // light gold
  "#d4700a", // saffron
  "#ff9f50", // orange
  "#f5d090", // cream gold
  "#fff0c0", // pale gold
];

function randomPetal(id: number): Petal {
  const shapes: PetalShape[] = ["flower", "leaf", "spark", "ring"];
  return {
    id,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: 6 + Math.random() * 10,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 7 + Math.random() * 8,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    drift: (Math.random() - 0.5) * 120,
    rotate: Math.random() * 720 - 360,
  };
}

const PETAL_COUNT = 28;

export function FestivalParticles() {
  const { festivalMode } = useFestival();
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => randomPetal(i))
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Extra golden glow on body when festival mode
  useEffect(() => {
    if (festivalMode) {
      document.body.classList.add("festival-active");
    } else {
      document.body.classList.remove("festival-active");
    }
    return () => document.body.classList.remove("festival-active");
  }, [festivalMode]);

  if (!festivalMode) return null;

  return (
    <div ref={containerRef} className="festival-layer" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`festival-petal festival-petal--${p.shape}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            color: p.color,
            "--drift" : `${p.drift}px`,
            "--rotate": `${p.rotate}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── Festival toggle button (small, unobtrusive) ───────────────
export function FestivalToggle() {
  const { festivalMode, toggleFestival } = useFestival();
  return (
    <button
      className={`festival-toggle ${festivalMode ? "festival-toggle--on" : ""}`}
      onClick={toggleFestival}
      title={festivalMode ? "Festival Mode बंद करा" : "Festival Mode चालू करा"}
      aria-label="Toggle festival mode"
    >
      🪔
    </button>
  );
}
