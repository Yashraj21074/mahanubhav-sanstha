import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../admin/AdminAuthContext";
import "../styles/admin.css";

const MENU = [
  { label: "डॅशबोर्ड", labelEn: "Dashboard", to: "/admin/dashboard", icon: "📊" },
  { label: "कार्यक्रम", labelEn: "Events", to: "/admin/events", icon: "🎪" },
  { label: "नोंदणी", labelEn: "Registrations", to: "/admin/registrations", icon: "📝" },
  { label: "गॅलरी", labelEn: "Gallery", to: "/admin/gallery", icon: "🖼️" },
];

export default function AdminSidebar() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__brand-icon">🕉️</span>
        <div className="admin-sidebar__brand-text">
          <strong>Admin Panel</strong>
          <span>Mahanubhav Sanstha</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              "admin-sidebar__link" + (isActive ? " admin-sidebar__link--active" : "")
            }
          >
            <span className="admin-sidebar__link-icon">{item.icon}</span>
            <span className="admin-sidebar__link-label">
              <span className="admin-sidebar__link-mr">{item.label}</span>
              <span className="admin-sidebar__link-en">{item.labelEn}</span>
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <span>🔓</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
