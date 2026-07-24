"use client";

import { useCallback, useRef } from "react";
import { AudioManager } from "@/lib/AudioManager";

export function useSFX() {
  const lastHover = useRef(0);

  const playHover = useCallback(() => {
    if (typeof window === "undefined") return;

    const now = Date.now();
    if (now - lastHover.current < 80) return; // debounce
    lastHover.current = now;
    AudioManager.playSFX("hover");
  }, []);

  const playSelect = useCallback(() => {
    if (typeof window === "undefined") return;
    AudioManager.playSFX("select");
  }, []);

  const playBack = useCallback(() => {
    if (typeof window === "undefined") return;
    AudioManager.playSFX("back");
  }, []);

  return { playHover, playSelect, playBack };
}
