import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { submitRegistration } from "../services/registrationService";
import { getPublicEvents, Event } from "../services/eventsService";
import "../styles/publicPages.css";

export default function RegistrationForm() {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({
    FullName: "", MobileNumber: "", Email: "",
    MandalName: "", CityArea: "", NumberOfPeople: 1, SpecialNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    getPublicEvents()
      .then(evts => {
        const open = evts.filter(e => e.RegistrationStatus === "Open");
        setEvents(open);
        const preId = searchParams.get("eventId");
        if (preId) {
          const found = open.find(e => e.EventID === preId);
          if (found) setSelectedEvent(found);
        }
      })
      .finally(() => setLoadingEvents(false));
  }, [searchParams]);

  const handleEventChange = (id: string) => {
    const ev = events.find(e => e.EventID === id) || null;
    setSelectedEvent(ev);
  };

  const f = (key: string, val: string | number) => setForm(p => ({ ...p, [key]: val }));

  const validate = () => {
    if (!form.FullName.trim()) return "पूर्ण नाव आवश्यक आहे.";
    if (!form.MobileNumber.trim() || !/^\d{10}$/.test(form.MobileNumber.trim()))
      return "10 अंकी मोबाइल नंबर आवश्यक आहे.";
    if (!selectedEvent) return "कृपया कार्यक्रम निवडा.";
    if (!form.NumberOfPeople || form.NumberOfPeople < 1) return "किमान 1 व्यक्ती आवश्यक आहे.";
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(""); setLoading(true);
    try {
      await submitRegistration({
        EventID: selectedEvent!.EventID,
        EventName: selectedEvent!.MarathiTitle || selectedEvent!.EventTitle,
        ...form,
      });
      setSuccess(true);
    } catch {
      setError("❌ नोंदणी करताना त्रुटी झाली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingEvents) return <div className="pub-loading"><div className="pub-spinner" /></div>;

  if (success) {
    return (
      <div className="pub-success-box">
        <div className="pub-success-icon">✅</div>
        <h2 className="pub-success-title">आपली नोंदणी यशस्वीरित्या पूर्ण झाली आहे!</h2>
        <p className="pub-success-sub">धन्यवाद! आपण नोंदणी केल्याबद्दल आभारी आहोत.</p>
        {selectedEvent?.WhatsAppGroupLink && (
          <div className="pub-success-whatsapp">
            <p>📱 कार्यक्रमाच्या अपडेटसाठी WhatsApp ग्रुपमध्ये सामील व्हा:</p>
            <a
              href={selectedEvent.WhatsAppGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-btn pub-btn--whatsapp"
            >
              💬 WhatsApp Group Join करा
            </a>
          </div>
        )}
        <button className="pub-btn pub-btn--outline" onClick={() => { setSuccess(false); setForm({ FullName:"",MobileNumber:"",Email:"",MandalName:"",CityArea:"",NumberOfPeople:1,SpecialNote:"" }); }}>
          आणखी नोंदणी करा
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pub-reg-form">
      <div className="pub-form-group">
        <label className="pub-form-label">कार्यक्रम निवडा (Select Event) *</label>
        {events.length === 0 ? (
          <div className="pub-no-events">सध्या कोणत्याही कार्यक्रमासाठी नोंदणी उपलब्ध नाही.</div>
        ) : (
          <select
            className="pub-form-input"
            value={selectedEvent?.EventID || ""}
            onChange={e => handleEventChange(e.target.value)}
            required
          >
            <option value="">— कार्यक्रम निवडा —</option>
            {events.map(e => (
              <option key={e.EventID} value={e.EventID}>
                {e.MarathiTitle || e.EventTitle} — {e.EventDate}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="pub-form-row">
        <div className="pub-form-group">
          <label className="pub-form-label">पूर्ण नाव (Full Name) *</label>
          <input className="pub-form-input" value={form.FullName} onChange={e=>f("FullName",e.target.value)} placeholder="आपले पूर्ण नाव" required />
        </div>
        <div className="pub-form-group">
          <label className="pub-form-label">मोबाइल नंबर (Mobile) *</label>
          <input className="pub-form-input" value={form.MobileNumber} onChange={e=>f("MobileNumber",e.target.value)} placeholder="10 अंकी मोबाइल नंबर" maxLength={10} pattern="\d{10}" required />
        </div>
      </div>

      <div className="pub-form-row">
        <div className="pub-form-group">
          <label className="pub-form-label">ईमेल (Email)</label>
          <input type="email" className="pub-form-input" value={form.Email} onChange={e=>f("Email",e.target.value)} placeholder="email@example.com" />
        </div>
        <div className="pub-form-group">
          <label className="pub-form-label">मंडळाचे नाव (Mandal Name)</label>
          <input className="pub-form-input" value={form.MandalName} onChange={e=>f("MandalName",e.target.value)} placeholder="आपल्या मंडळाचे नाव" />
        </div>
      </div>

      <div className="pub-form-row">
        <div className="pub-form-group">
          <label className="pub-form-label">शहर / परिसर (City/Area)</label>
          <input className="pub-form-input" value={form.CityArea} onChange={e=>f("CityArea",e.target.value)} placeholder="शहर किंवा परिसर" />
        </div>
        <div className="pub-form-group">
          <label className="pub-form-label">उपस्थित व्यक्ती (Number of People) *</label>
          <input type="number" min={1} max={100} className="pub-form-input" value={form.NumberOfPeople} onChange={e=>f("NumberOfPeople",parseInt(e.target.value)||1)} required />
        </div>
      </div>

      <div className="pub-form-group">
        <label className="pub-form-label">विशेष नोंद (Special Note)</label>
        <textarea className="pub-form-input pub-form-textarea" value={form.SpecialNote} onChange={e=>f("SpecialNote",e.target.value)} placeholder="काही विशेष सांगायचे असल्यास..." rows={3} />
      </div>

      {error && <div className="pub-alert pub-alert--error">⚠️ {error}</div>}

      <button type="submit" className="pub-btn pub-btn--primary pub-btn--full" disabled={loading || events.length === 0}>
        {loading ? "नोंदणी होत आहे..." : "✅ नोंदणी करा (Submit Registration)"}
      </button>
    </form>
  );
}
