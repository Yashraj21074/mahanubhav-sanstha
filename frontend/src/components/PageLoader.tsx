// PageLoader.tsx — Premium golden mandala loader
// Shows for up to 2 seconds then fades out
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/loader.css";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide after 2 seconds or when window load fires, whichever is first
    const timer = setTimeout(() => setVisible(false), 1800);
    const onLoad = () => setVisible(false);
    window.addEventListener("load", onLoad);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          style={{ pointerEvents: visible ? "all" : "none" }}
        >
          {/* Outer ring */}
          <div className="loader-mandala">
            <svg
              viewBox="0 0 160 160"
              width="120"
              height="120"
              className="loader-svg"
              aria-hidden="true"
            >
              {/* Outer petals ring */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <g key={i} transform={`rotate(${deg} 80 80)`}>
                  <path
                    d="M80 14 Q90 46 80 68 Q70 46 80 14Z"
                    fill="none"
                    stroke="#c9a227"
                    strokeWidth="1.2"
                    opacity="0.7"
                  />
                </g>
              ))}
              {/* Mid ring */}
              <circle cx="80" cy="80" r="40" fill="none" stroke="#c9a227" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              {/* Inner circle */}
              <circle cx="80" cy="80" r="20" fill="none" stroke="#c9a227" strokeWidth="1.5" opacity="0.6" />
              {/* Center dot */}
              <circle cx="80" cy="80" r="5" fill="#c9a227" opacity="0.8" />
              {/* Om symbol approximation — center text */}
              <text
                x="80"
                y="86"
                textAnchor="middle"
                fontSize="18"
                fill="#8b0000"
                fontFamily="serif"
                opacity="0.85"
              >
                ॐ
              </text>
            </svg>
          </div>

          {/* Glow beneath */}
          <div className="loader-glow" />

          {/* Title */}
          <motion.p
            className="loader-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
          >
            मुंबई व उपनगर
          </motion.p>
          <motion.p
            className="loader-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.55, duration: 0.5 } }}
          >
            महानुभाव पंथीय संस्था
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
