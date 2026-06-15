// PageTransition.tsx — Fade page transitions via Framer Motion
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const variants = {
  initial:  { opacity: 0, y: 8 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -6 },
};

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
