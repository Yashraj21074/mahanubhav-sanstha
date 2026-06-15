import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-countdown.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date("2026-09-16T10:00:00+05:30").getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

interface FlipBoxProps {
  value: string;
  label: string;
}

function FlipBox({ value, label }: FlipBoxProps) {
  const [current, setCurrent] = useState(value);
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (value !== current) {
      setPrev(current);
      setFlipping(true);
      const t = setTimeout(() => {
        setCurrent(value);
        setFlipping(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, current]);

  return (
    <div className="ecd-unit">
      <div className={`ecd-box ${flipping ? "ecd-box--flip" : ""}`}>
        <div className="ecd-box-top">{flipping ? prev : current}</div>
        <div className="ecd-box-bottom">{current}</div>
        <div className="ecd-box-divider" />
        {flipping && <div className="ecd-flip-card">{current}</div>}
      </div>
      <span className="ecd-label">{label}</span>
    </div>
  );
}

export default function EventCountdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isOver = Object.values(time).every((v) => v === 0);

  return (
    <section className="ecd-section">
      {/* Decorative mandala background */}
      <div className="ecd-mandala" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="rgba(212,175,55,0.18)" strokeWidth="1">
            <circle cx="200" cy="200" r="190" />
            <circle cx="200" cy="200" r="155" />
            <circle cx="200" cy="200" r="120" />
            <circle cx="200" cy="200" r="85" />
            <circle cx="200" cy="200" r="50" />
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
              <line
                key={deg}
                x1="200" y1="200"
                x2={200 + 190 * Math.cos((deg * Math.PI) / 180)}
                y2={200 + 190 * Math.sin((deg * Math.PI) / 180)}
                strokeOpacity="0.5"
              />
            ))}
            {[0,45,90,135,180,225,270,315].map((deg) => {
              const x = 200 + 155 * Math.cos((deg * Math.PI) / 180);
              const y = 200 + 155 * Math.sin((deg * Math.PI) / 180);
              return <circle key={deg} cx={x} cy={y} r="5" fill="rgba(212,175,55,0.3)" stroke="none" />;
            })}
          </g>
        </svg>
      </div>

      {/* Shimmer top border */}
      <div className="ecd-shimmer-border" aria-hidden="true" />

      <div className="ecd-inner">
        {/* Heading */}
        <div className="ecd-heading-block">
          <span className="ecd-orn">✦</span>
          <h2 className="ecd-title">८०५ वा ऐतिहासिक अवतारदिन सोहळा</h2>
          <span className="ecd-orn">✦</span>
        </div>

        {/* Event info row */}
        <div className="ecd-info-row">
          <span className="ecd-info-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            १६ सप्टेंबर २०२६
          </span>
          <span className="ecd-info-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            सकाळी १० ते सायं ४
          </span>
          <span className="ecd-info-chip">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            नरिमन पॉइंट, मुंबई
          </span>
        </div>

        {/* Countdown boxes */}
        {isOver ? (
          <p className="ecd-over">🙏 सोहळा संपन्न झाला आहे</p>
        ) : (
          <div className="ecd-boxes">
            <FlipBox value={String(time.days)}            label="दिवस" />
            <div className="ecd-separator">:</div>
            <FlipBox value={pad(time.hours)}   label="तास" />
            <div className="ecd-separator">:</div>
            <FlipBox value={pad(time.minutes)} label="मिनिटे" />
            <div className="ecd-separator">:</div>
            <FlipBox value={pad(time.seconds)} label="सेकंद" />
          </div>
        )}

        {/* CTA */}
        <Link to="/registration" className="ecd-cta">
          <span className="ecd-cta-dot" aria-hidden="true" />
          <span>कार्यक्रमासाठी नोंदणी करा</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Shimmer bottom border */}
      <div className="ecd-shimmer-border ecd-shimmer-border--bottom" aria-hidden="true" />
    </section>
  );
}
