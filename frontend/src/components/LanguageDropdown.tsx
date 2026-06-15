// ============================================================
// LanguageDropdown.tsx
// Click to open, click outside to close, highlights active lang
// ============================================================

import { useState, useRef, useEffect } from "react";
import { useLang } from "../data/LanguageContext";
import { Lang } from "../data/translations";

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "mr", label: "मराठी" },
  { code: "hi", label: "हिंदी" },
  { code: "en", label: "English" },
];

export default function LanguageDropdown() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        className="lang-dropdown__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>🌐</span>
        <span>{t("nav_lang_label")}</span>
        <span style={{ fontSize: "0.7rem", marginLeft: "2px" }}>▼</span>
      </button>

      {open && (
        <div className="lang-dropdown__menu" role="listbox">
          {LANGUAGES.map((l) => (
            <div
              key={l.code}
              className={`lang-dropdown__item${lang === l.code ? " selected" : ""}`}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => handleSelect(l.code)}
            >
              <span>{l.label}</span>
              {lang === l.code && (
                <span className="lang-dropdown__check">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
