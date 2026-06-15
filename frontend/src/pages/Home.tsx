import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../data/LanguageContext";
import OrnamentTop from "../components/OrnamentTop";
import OrnamentDivider from "../components/OrnamentDivider";
import SmartInfoCard from "../components/SmartInfoCard";
import { FestivalParticles } from "../components/FestivalMode";
import "../styles/home.css";

const SAINT_IMG   = "/assets/saint-artwork-tr.png";
const DIYA_IMG    = "/assets/hanging-diya-tr.png";
const SKYLINE_IMG = "/assets/temple-skyline.png";

const PARTICLES = [
  { type: "dust"  },
  { type: "spark" },
  { type: "dust"  },
  { type: "petal" },
  { type: "drift" },
  { type: "dust"  },
  { type: "spark" },
  { type: "petal" },
  { type: "drift" },
  { type: "dust"  },
  { type: "spark" },
  { type: "dust"  },
  { type: "petal" },
  { type: "drift" },
  { type: "spark" },
];

// ── Lightweight scroll-reveal (no extra library needed) ─────
function useRevealOnScroll() {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Skip if prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);
}

export default function Home() {
  const { t } = useLang();
  useRevealOnScroll();

  return (
    <div className="home-page">

      {/* Festival petal rain (only when festivalMode = true) */}
      <FestivalParticles />

      {/* ── HERO ── */}
      <div className="home-hero">

        {/* Floating divine particles */}
        <div className="home-particles" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span key={i} className={`home-p home-p--${p.type}`} />
          ))}
        </div>

        {/* DIYAS */}
        <div className="home-diya-left">
          <img src={DIYA_IMG} alt="" aria-hidden="true" className="home-diya-img" loading="eager" />
        </div>
        <div className="home-diya-right">
          <img src={DIYA_IMG} alt="" aria-hidden="true" className="home-diya-img home-diya-img--flip" loading="eager" />
        </div>

        {/* LEFT */}
        <div className="home-left">
          <OrnamentTop />
          <h1 className="home-title">
            <span className="home-title-line1">{t("home_title_line1")}</span>
            <span className="home-title-line2">{t("home_title_line2")}</span>
            <span className="home-title-line3">{t("home_title_line3")}</span>
          </h1>
          <div className="home-subtitle-row">
            <OrnamentDivider />
            <p className="home-subtitle">{t("home_subtitle")}</p>
            <span className="home-subtitle-orn-right"><OrnamentDivider /></span>
          </div>
          <p className="home-description">{t("home_description")}</p>
          <div className="home-buttons">
            <Link to="/about" className="home-btn home-btn--primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-4h6v4"/>
              </svg>
              {t("home_btn_about")}
            </Link>
            <Link to="/mandal" className="home-btn home-btn--outline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {t("home_btn_mandal")}
            </Link>
          </div>
        </div>

        {/* CENTER — saint floats after entrance */}
        <div className="home-center">
          <div className="home-saint-wrap">
            <div className="home-saint-aura" aria-hidden="true">
              <div className="home-saint-aura-outer" />
              <div className="home-saint-aura-inner" />
            </div>
            <img
              src={SAINT_IMG}
              alt="Bhagwan Sarvadnya Shri Chakradhar Swami"
              className="home-saint-img"
              loading="eager"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="home-right">
          <SmartInfoCard />
        </div>

      </div>{/* end .home-hero */}

      {/* ── SKYLINE ── */}
      <div className="home-skyline reveal">
        <img src={SKYLINE_IMG} alt="Mumbai temple skyline" loading="lazy"
          onError={(e) => { e.currentTarget.style.display = "none"; }} />
      </div>

    </div>
  );
}
