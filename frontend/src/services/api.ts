// ============================================================
// api.ts — Central API service for Google Apps Script backend
// Replace SCRIPT_URL with your deployed Google Apps Script URL
// ============================================================

export const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwOn0gCRZWkA6GX6-P3WAwU5VTVaoAdGGmK87a04TXrQKNs9h974XT0FUywPPlYL-B_/exec";

// ── Admin token (stored in sessionStorage) ──────────────────
export const ADMIN_TOKEN_KEY = "msanstha_admin_token";

export function getStoredToken(): string {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export function setStoredToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearStoredToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function isAdminLoggedIn(): boolean {
  return !!getStoredToken();
}

// ── Core fetch helper ────────────────────────────────────────
async function apiFetch<T>(payload: Record<string, unknown>): Promise<T> {
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();

  if (!data.success) throw new Error(data.error || "API error");

  return data as T;
}

// ── Public (no token needed) ─────────────────────────────────
export async function apiPublic<T>(action: string, extra: Record<string, unknown> = {}): Promise<T> {
  return apiFetch<T>({ action, ...extra });
}

// ── Admin (token required) ───────────────────────────────────
export async function apiAdmin<T>(action: string, extra: Record<string, unknown> = {}): Promise<T> {
  return apiFetch<T>({ action, token: getStoredToken(), ...extra });
}

// ── Admin login verification ─────────────────────────────────
export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  // Hardcoded admin credentials on client side for simplicity
  // In production, enhance with Apps Script side verification
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "Yashaki@21"; // Change this!
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Verify token also works with server
    setStoredToken(password);
    return true;
  }
  return false;
}
