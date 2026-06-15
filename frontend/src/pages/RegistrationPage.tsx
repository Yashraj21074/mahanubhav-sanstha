import RegistrationForm from "../components/RegistrationForm";
import "../styles/publicPages.css";

export default function RegistrationPage() {
  return (
    <div className="pub-page">
      <div className="pub-page-hero">
        <div className="pub-page-hero__inner">
          <h1 className="pub-page-hero__title">📋 नोंदणी</h1>
          <p className="pub-page-hero__sub">कार्यक्रमासाठी ऑनलाइन नोंदणी करा</p>
        </div>
      </div>

      <div className="pub-container pub-container--narrow">
        <div className="pub-reg-card">
          <div className="pub-reg-card__header">
            <span className="pub-reg-card__icon">🕉️</span>
            <h2 className="pub-reg-card__title">नोंदणी फॉर्म</h2>
            <p className="pub-reg-card__sub">खालील माहिती भरून नोंदणी पूर्ण करा</p>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
