// ============================================================
// PlaceholderPage.tsx — Reusable placeholder for all inner pages
// Props:
//   titleKey  — translation key for the page heading
//   descKey   — translation key for the description
//   icon      — emoji icon shown above the title
//   bgClass   — optional CSS class for page-specific background pattern
//               (defined in index.css: page-lotus-bg, page-temple-bg, etc.)
//
// Replace this component with real content when the page is ready.
// Keep the bgClass prop on the outer wrapper div of the real content.
// ============================================================

import { Link } from "react-router-dom";
import { useLang } from "../data/LanguageContext";

interface Props {
  titleKey: string;
  descKey:  string;
  icon:     string;
  bgClass?: string;  // page-specific background pattern class
}

export default function PlaceholderPage({ titleKey, descKey, icon, bgClass = "" }: Props) {
  const { t } = useLang();

  return (
    <div className={`placeholder-page${bgClass ? " " + bgClass : ""}`}>
      <span className="placeholder-page__icon">{icon}</span>
      <div className="placeholder-page__divider" />
      <span className="placeholder-page__badge">{t("page_coming_soon")}</span>
      <h1 className="placeholder-page__title">{t(titleKey)}</h1>
      <p className="placeholder-page__desc">{t(descKey)}</p>
      <Link to="/" className="placeholder-page__back">
        ← {t("page_back_home")}
      </Link>
    </div>
  );
}
