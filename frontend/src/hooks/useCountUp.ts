// useCountUp.ts — Smooth number count-up on viewport entry
import { useEffect, useRef, useState } from "react";

interface Options {
  target: number;
  duration?: number;
  suffix?: string;
  enabled?: boolean;
}

export function useCountUp({ target, duration = 1400, suffix = "", enabled = true }: Options) {
  const [display, setDisplay] = useState("0" + suffix);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    setDisplay("0" + suffix);
    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, suffix, enabled]);

  return display;
}
