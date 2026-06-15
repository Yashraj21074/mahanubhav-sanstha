import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { isAdminLoggedIn, clearStoredToken } from "../services/api";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isAdminLoggedIn());

  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    clearStoredToken();
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
