"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { AudioManager } from "@/lib/AudioManager";

interface AppState {
  introComplete: boolean;
  currentSection: number;
  isMuted: boolean;
  bgmEnabled: boolean;
  sfxEnabled: boolean;
  isMenuOpen: boolean;
  isTransitioning: boolean;
  hasInteracted: boolean;
  setIntroComplete: (v: boolean) => void;
  setCurrentSection: (v: number) => void;
  setIsMuted: (v: boolean) => void;
  setBgmEnabled: (v: boolean) => void;
  setSfxEnabled: (v: boolean) => void;
  setIsMenuOpen: (v: boolean) => void;
  setIsTransitioning: (v: boolean) => void;
  setHasInteracted: (v: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
  { id: "thankyou", label: "Thank You" },
] as const;

export function AppProvider({ children }: { children: ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [bgmEnabled, setBgmEnabledState] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("portfolio-bgm-enabled");
    return saved === null ? true : saved === "true";
  });
  const [sfxEnabled, setSfxEnabledState] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = window.localStorage.getItem("portfolio-sfx-enabled");
    return saved === null ? true : saved === "true";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    AudioManager.init();
    // Ensure BGM volume is initialized to a safer 25%
    AudioManager.setVolume(0.25);
    AudioManager.setBgmEnabled(bgmEnabled);
    AudioManager.setSfxEnabled(sfxEnabled);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-bgm-enabled", String(bgmEnabled));
      window.localStorage.setItem("portfolio-sfx-enabled", String(sfxEnabled));
    }
  }, [bgmEnabled, sfxEnabled]);

  const handleSetIntroComplete = useCallback((v: boolean) => setIntroComplete(v), []);
  const handleSetCurrentSection = useCallback((v: number) => setCurrentSection(v), []);
  const handleSetIsMuted = useCallback((v: boolean) => setIsMuted(v), []);
  const handleSetBgmEnabled = useCallback((v: boolean) => {
    setBgmEnabledState(v);
    setIsMuted(false);
  }, []);
  const handleSetSfxEnabled = useCallback((v: boolean) => {
    setSfxEnabledState(v);
    setIsMuted(false);
  }, []);
  const handleSetIsMenuOpen = useCallback((v: boolean) => setIsMenuOpen(v), []);
  const handleSetIsTransitioning = useCallback((v: boolean) => setIsTransitioning(v), []);
  const handleSetHasInteracted = useCallback((v: boolean) => setHasInteracted(v), []);

  return (
    <AppContext.Provider
      value={{
        introComplete,
        currentSection,
        isMuted,
        bgmEnabled,
        sfxEnabled,
        isMenuOpen,
        isTransitioning,
        hasInteracted,
        setIntroComplete: handleSetIntroComplete,
        setCurrentSection: handleSetCurrentSection,
        setIsMuted: handleSetIsMuted,
        setBgmEnabled: handleSetBgmEnabled,
        setSfxEnabled: handleSetSfxEnabled,
        setIsMenuOpen: handleSetIsMenuOpen,
        setIsTransitioning: handleSetIsTransitioning,
        setHasInteracted: handleSetHasInteracted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
