"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { AudioManager } from "@/lib/AudioManager";
import { useSFX } from "@/hooks/useSFX";

export default function MuteButton() {
  const { bgmEnabled, sfxEnabled, setBgmEnabled, setSfxEnabled } = useApp();
  const { playSelect } = useSFX();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleBgm = () => {
    const next = !bgmEnabled;
    AudioManager.setBgmEnabled(next);
    setBgmEnabled(next);
    playSelect();
  };

  const handleToggleSfx = () => {
    const next = !sfxEnabled;
    AudioManager.setSfxEnabled(next);
    setSfxEnabled(next);
    playSelect();
  };

  const handleTogglePanel = () => {
    setIsOpen((current) => !current);
    if (!isOpen) {
      setShowButton(false);
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[9999] flex items-end justify-end"
    >
      {!isOpen && showButton && (
        <button
          type="button"
          onClick={handleTogglePanel}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-p5-red/40 bg-p5-black/95 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Audio controls</span>
          <svg viewBox="0 0 44 44" className="h-8 w-8 fill-current text-p5-white-pure">
            <path d="M14 18H8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h6l10 8V10l-10 8z" />
            <path d="M28.5 14.5c1.8 1.8 2.9 4.4 2.9 7.2s-1.1 5.4-2.9 7.2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M32 10c3.8 3.8 3.8 10 0 13.9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <motion.span
            className="absolute -bottom-1 right-0 h-3 w-3 rounded-full bg-p5-red border border-p5-black"
            animate={{ scale: isOpen ? 1.2 : 1, opacity: isOpen ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      )}

      <AnimatePresence onExitComplete={() => setShowButton(true)}>
        {isOpen && (
          <motion.div
            key="audio-panel"
            initial={{ opacity: 0, x: 20, y: -8, scale: 0.92, rotate: -6 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: 20, y: -8, scale: 0.92, rotate: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="ml-4 w-[240px] rounded-[1.5rem] border border-p5-red/20 bg-p5-black/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-p5-red">Audio</p>
                <p className="text-sm uppercase tracking-[0.18em] text-p5-white/80">Controls</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-p5-white/70 transition-colors hover:text-p5-red"
                aria-label="Close audio panel"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleToggleBgm}
                className="flex items-center justify-between w-full rounded-2xl border border-p5-red/20 bg-p5-black/80 px-4 py-3 text-left transition-colors hover:border-p5-red"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-p5-white/70">BGM</p>
                  <p className="text-sm uppercase text-p5-white">{mounted ? (bgmEnabled ? "ON" : "OFF") : "Loading"}</p>
                </div>
                <span className={`h-3 w-3 rounded-full ${mounted && bgmEnabled ? "bg-p5-red" : "bg-p5-gray-light"}`} />
              </button>

              <button
                type="button"
                onClick={handleToggleSfx}
                className="flex items-center justify-between w-full rounded-2xl border border-p5-red/20 bg-p5-black/80 px-4 py-3 text-left transition-colors hover:border-p5-red"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-p5-white/70">SFX</p>
                  <p className="text-sm uppercase text-p5-white">{mounted ? (sfxEnabled ? "ON" : "OFF") : "Loading"}</p>
                </div>
                <span className={`h-3 w-3 rounded-full ${mounted && sfxEnabled ? "bg-p5-red" : "bg-p5-gray-light"}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
