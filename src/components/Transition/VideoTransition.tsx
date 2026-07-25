"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function VideoTransition() {
  return null;
}

// Export a simpler transition for menu navigation (no video, just animated)
export function SlashTransition({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9996] pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "left", background: "#FF0000" }}
        />
      )}
    </AnimatePresence>
  );
}
