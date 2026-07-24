"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChromaKey } from "@/hooks/useChromaKey";
import { Assets } from "@/lib/AssetLoader";
import { useApp } from "@/context/AppContext";
import { useMounted } from "@/hooks/useMounted";

function ChromaVideo({ src, playing, onComplete }: { src: string; playing: boolean; onComplete?: () => void }) {
  const { canvasRef, videoRef, startRendering, stopRendering } = useChromaKey({
    keyColor: [0, 255, 0],
    threshold: 0.35,
    smoothing: 0.12,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!playing) return;

    video.src = src;
    video.load();

    const handleCanPlay = () => {
      startRendering();
      video.play().catch(() => {
        console.warn("Transition video playback was blocked; continuing without it.", src);
        stopRendering();
        onComplete?.();
      });
    };

    const handleEnded = () => {
      stopRendering();
      onComplete?.();
    };

    const handleError = () => {
      console.warn("Transition video failed to load; continuing without it.", src);
      stopRendering();
      onComplete?.();
    };

    const fallbackTimer = window.setTimeout(() => {
      console.warn("Transition video stalled; continuing without it.", src);
      stopRendering();
      onComplete?.();
    }, 2500);

    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      window.clearTimeout(fallbackTimer);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      stopRendering();
    };
  }, [playing, src, startRendering, stopRendering, onComplete, videoRef]);

  return (
    <>
      <video
        ref={videoRef}
        className="hidden"
        muted
        playsInline
        preload="auto"
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[9997] pointer-events-none object-cover"
        style={{ objectFit: "cover" }}
      />
    </>
  );
}

export default function VideoTransition() {
  const { isTransitioning, setIsTransitioning } = useApp();
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const mounted = useMounted();
  const transitionCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mounted || !isTransitioning || phase !== "idle") return;

    const timer = window.setTimeout(() => {
      setPhase("out");
    }, 40);

    return () => window.clearTimeout(timer);
  }, [isTransitioning, mounted, phase]);

  useEffect(() => {
    if (phase !== "out") return;

    const fallbackTimer = window.setTimeout(() => {
      console.warn("Transition overlay timed out; exiting transition.");
      setPhase("in");
    }, 2200);

    return () => window.clearTimeout(fallbackTimer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "in") return;

    const timer = window.setTimeout(() => {
      setPhase("idle");
      setIsTransitioning(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [phase, setIsTransitioning]);

  const handleOutComplete = useCallback(() => {
    transitionCallback.current?.();
    setPhase("in");
  }, []);

  const handleInComplete = useCallback(() => {
    setPhase("idle");
    setIsTransitioning(false);
  }, [setIsTransitioning]);

  return (
    <AnimatePresence>
      {phase === "out" && (
        <ChromaVideo
          src={Assets.vid.transitionOut}
          playing={true}
          onComplete={handleOutComplete}
        />
      )}
      {phase === "in" && (
        <ChromaVideo
          src={Assets.vid.transitionIn}
          playing={true}
          onComplete={handleInComplete}
        />
      )}
    </AnimatePresence>
  );
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
