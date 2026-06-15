import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/smart-info-card.css";

interface CardData {
  id: number;
  icon: string;
  header: string;
  content: React.ReactNode;
  buttonText: string;
  navigateTo: string;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Trigger counter when element enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === 0) return;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const CARDS: CardData[] = [
  {
    id: 0,
    icon: "🏛",
    header: "संस्था माहिती",
    content: (
      <div className="sic-content">
        <div className="sic-stats-grid">
          <div className="sic-stat-item">
            <span className="sic-stat-number">
              <AnimatedCounter target={18} />
            </span>
            <span className="sic-stat-label">संलग्न मंडळे</span>
          </div>
          <div className="sic-stat-item">
            <span className="sic-stat-number">
              <AnimatedCounter target={5000} suffix="+" />
            </span>
            <span className="sic-stat-label">भक्त परिवार</span>
          </div>
        </div>
        <div className="sic-info-row">
          <span className="sic-info-dot">✦</span>
          <span className="sic-info-text">मुंबई व उपनगर — कार्य क्षेत्र</span>
        </div>
        <div className="sic-info-row sic-goal-row">
          <span className="sic-info-dot">✦</span>
          <span className="sic-info-text sic-goal">भक्ती • सेवा • संस्कृती</span>
        </div>
      </div>
    ),
    buttonText: "संस्था जाणून घ्या",
    navigateTo: "/about",
  },
  {
    id: 1,
    icon: "🎉",
    header: "कार्यक्रम माहिती",
    content: (
      <div className="sic-content">
        <p className="sic-event-title">भगवान श्री चक्रधर स्वामी जयंती</p>
        <div className="sic-event-date-block">
          <span className="sic-event-date">१६ सप्टेंबर २०२६</span>
          <span className="sic-event-time">सकाळी १० ते सायं ४</span>
        </div>
        <div className="sic-event-badge">
          <span className="sic-event-badge-num">
            <AnimatedCounter target={805} />
          </span>
          <span className="sic-event-badge-text">वा ऐतिहासिक अवतारदिन सोहळा</span>
        </div>
      </div>
    ),
    buttonText: "कार्यक्रम पहा",
    navigateTo: "/events/chakradhar-jayanti-2026",
  },
  {
    id: 2,
    icon: "📍",
    header: "मंडळ माहिती",
    content: (
      <div className="sic-content">
        <div className="sic-list">
          <div className="sic-list-item">
            <span className="sic-list-icon">🕌</span>
            <span><AnimatedCounter target={18} /> मंडळांची संपूर्ण यादी</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">🗺</span>
            <span>मुंबई व उपनगर विभाग</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">📞</span>
            <span>स्थान व संपर्क</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">🎯</span>
            <span>कार्यक्रम व उपक्रम</span>
          </div>
        </div>
      </div>
    ),
    buttonText: "मंडळ पहा",
    navigateTo: "/mandal",
  },
  {
    id: 3,
    icon: "📸",
    header: "गॅलरी",
    content: (
      <div className="sic-content">
        <div className="sic-list">
          <div className="sic-list-item">
            <span className="sic-list-icon">🖼</span>
            <span>कार्यक्रम छायाचित्रे</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">🎬</span>
            <span>व्हिडिओ संग्रह</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">⏳</span>
            <span>ऐतिहासिक क्षण</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">🙏</span>
            <span>विशेष दर्शन</span>
          </div>
        </div>
      </div>
    ),
    buttonText: "गॅलरी पहा",
    navigateTo: "/events",
  },
  {
    id: 4,
    icon: "📞",
    header: "संपर्क",
    content: (
      <div className="sic-content">
        <div className="sic-list">
          <div className="sic-list-item">
            <span className="sic-list-icon">✉️</span>
            <span>ईमेल संपर्क</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">💬</span>
            <span>WhatsApp समूह</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">▶️</span>
            <span>YouTube Live</span>
          </div>
          <div className="sic-list-item">
            <span className="sic-list-icon">📋</span>
            <span>नोंदणी माहिती</span>
          </div>
        </div>
      </div>
    ),
    buttonText: "संपर्क करा",
    navigateTo: "/contact",
  },
];

const ROTATION_INTERVAL = 18000; // 18 seconds

export default function SmartInfoCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const goToCard = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setProgress(0);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

  const nextCard = useCallback(() => {
    const next = (activeIndex + 1) % CARDS.length;
    goToCard(next);
  }, [activeIndex, goToCard]);

  // Auto rotation
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      nextCard();
    }, ROTATION_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, nextCard]);

  // Progress bar
  useEffect(() => {
    if (isPaused) {
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    setProgress(0);
    const step = 100 / (ROTATION_INTERVAL / 100);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 100);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [activeIndex, isPaused]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToCard((activeIndex + 1) % CARDS.length);
      } else {
        goToCard((activeIndex - 1 + CARDS.length) % CARDS.length);
      }
    }
  };

  const card = CARDS[activeIndex];

  return (
    <div
      className="sic-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating particles */}
      <div className="sic-particles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`sic-particle sic-particle--${i + 1}`}>✦</span>
        ))}
      </div>

      {/* Card */}
      <div className={`sic-card ${isAnimating ? "sic-card--exit" : "sic-card--enter"}`}>

        {/* Light rays */}
        <div className="sic-rays" aria-hidden="true">
          <div className="sic-ray sic-ray--1" />
          <div className="sic-ray sic-ray--2" />
          <div className="sic-ray sic-ray--3" />
        </div>

        {/* Header */}
        <div className="sic-header">
          <div className="sic-header-glow" />
          <span className="sic-header-orn">✦</span>
          <span className="sic-header-icon">{card.icon}</span>
          <span className="sic-header-title">{card.header}</span>
          <span className="sic-header-orn">✦</span>
        </div>

        {/* Body */}
        <div className="sic-body">
          {card.content}
        </div>

        {/* Button */}
        <div className="sic-footer">
          <Link to={card.navigateTo} className="sic-btn">
            <span className="sic-btn-shine" />
            <span className="sic-btn-text">{card.buttonText}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Progress bar */}
        <div className="sic-progress-track">
          <div className="sic-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="sic-dots" role="tablist" aria-label="Card navigation">
        {CARDS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Card ${i + 1}`}
            className={`sic-dot ${i === activeIndex ? "sic-dot--active" : ""}`}
            onClick={() => goToCard(i)}
          />
        ))}
      </div>
    </div>
  );
}
