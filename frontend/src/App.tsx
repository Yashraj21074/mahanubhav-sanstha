import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./data/LanguageContext";
import { AdminAuthProvider } from "./admin/AdminAuthContext";
import { FestivalProvider, FestivalToggle } from "./components/FestivalMode";
import ProtectedRoute from "./admin/ProtectedRoute";
import PageLoader from "./components/PageLoader";
import PageTransition from "./components/PageTransition";

// Existing pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Mandal from "./pages/Mandal";
import Events from "./pages/Events";
import ChakradharJayanti2026 from "./pages/ChakradharJayanti2026";
import EventSchedule from "./pages/EventSchedule";
import EventLive from "./pages/EventLive";
import EventVenue from "./pages/EventVenue";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Dynamic pages
import EventsPage from "./pages/EventsPage";
import RegistrationPage from "./pages/RegistrationPage";
import GalleryPage from "./pages/GalleryPage";

// Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEvents from "./admin/AdminEvents";
import AdminRegistrations from "./admin/AdminRegistrations";
import AdminGallery from "./admin/AdminGallery";

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin && <FestivalToggle />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ── Public routes ── */}
          <Route path="/"     element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
          <Route path="/mandal"   element={<PageTransition><Mandal /></PageTransition>} />
          <Route path="/events"   element={<PageTransition><Events /></PageTransition>} />
          <Route path="/events/chakradhar-jayanti-2026"          element={<PageTransition><ChakradharJayanti2026 /></PageTransition>} />
          <Route path="/events/chakradhar-jayanti-2026/schedule" element={<PageTransition><EventSchedule /></PageTransition>} />
          <Route path="/events/chakradhar-jayanti-2026/live"     element={<PageTransition><EventLive /></PageTransition>} />
          <Route path="/events/chakradhar-jayanti-2026/venue"    element={<PageTransition><EventVenue /></PageTransition>} />
          <Route path="/services"     element={<PageTransition><Services /></PageTransition>} />
          <Route path="/contact"      element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/all-events"   element={<PageTransition><EventsPage /></PageTransition>} />
          <Route path="/registration" element={<PageTransition><RegistrationPage /></PageTransition>} />
          <Route path="/gallery"      element={<PageTransition><GalleryPage /></PageTransition>} />

          {/* ── Admin routes (no transitions needed) ── */}
          <Route path="/admin/login"          element={<AdminLogin />} />
          <Route path="/admin/dashboard"      element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/events"         element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/registrations"  element={<ProtectedRoute><AdminRegistrations /></ProtectedRoute>} />
          <Route path="/admin/gallery"        element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <LanguageProvider>
        <FestivalProvider>
          <BrowserRouter>
            <PageLoader />
            <AppRoutes />
          </BrowserRouter>
        </FestivalProvider>
      </LanguageProvider>
    </AdminAuthProvider>
  );
}
