// ============================================================
// Navbar.tsx — uses real saint image as circular logo
// ============================================================

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLang } from "../data/LanguageContext";
import LanguageDropdown from "./LanguageDropdown";
import "../styles/navbar.css";

const NAV_ITEMS = [
  { key: "nav_home",     to: "/" },
  { key: "nav_about",    to: "/about" },
  { key: "nav_mandal",   to: "/mandal" },
  { key: "nav_events",   to: "/events" },
  { key: "nav_gallery",  to: "/gallery" },
  { key: "nav_services", to: "/services" },
  { key: "nav_contact",  to: "/contact" },
];

export default function Navbar() {
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMobile}>
          <div className="navbar__logo-icon">
            <img
              src="/assets/chakradhar-swami-main.png"
              alt="Logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const p = e.currentTarget.parentElement;
                if (p) p.innerHTML = `<span style="font-size:1.6rem">🕉️</span>`;
              }}
            />
          </div>
          <div className="navbar__logo-text">
            <span>{t("nav_logo_line1")}</span>
            <span>{t("nav_logo_line2")}</span>
            <span>{t("nav_logo_line3")}</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  "navbar__nav-link" + (isActive ? " active" : "")
                }
              >
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="navbar__actions">
          <LanguageDropdown />
          <Link to="/registration" className="navbar__register-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {t("nav_register_btn")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar__mobile-menu${mobileOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              "navbar__mobile-link" + (isActive ? " active" : "")
            }
            onClick={closeMobile}
          >
            {t(item.key)}
          </NavLink>
        ))}
        <div className="navbar__mobile-actions">
          <LanguageDropdown />
          <Link to="/registration" className="navbar__register-btn" onClick={closeMobile}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            {t("nav_register_btn")}
          </Link>
        </div>
      </div>
    </>
  );
}
