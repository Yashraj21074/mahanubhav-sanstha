import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdminLogin } from "../services/api";
import { useAdminAuth } from "./AdminAuthContext";
import "../styles/admin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const ok = await verifyAdminLogin(username, password);
      if (ok) {
        login();
        navigate("/admin/dashboard");
      } else {
        setError("चुकीचा username किंवा password. / Invalid credentials.");
      }
    } catch {
      setError("Server error. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo">🕉️</div>
          <h1 className="admin-login-title">Admin Login</h1>
          <p className="admin-login-sub">Mumbai & Suburban Mahanubhav Panthi Sanstha</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label className="admin-form-label">Username</label>
            <input
              type="text"
              className="admin-form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              type="password"
              className="admin-form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-alert admin-alert--error">{error}</div>}

          <button type="submit" className="admin-btn admin-btn--primary admin-btn--full" disabled={loading}>
            {loading ? "लॉगिन होत आहे..." : "🔐 Login"}
          </button>
        </form>

        <p className="admin-login-note">
          🔒 Only authorized admin can access this panel.
        </p>
      </div>
    </div>
  );
}
