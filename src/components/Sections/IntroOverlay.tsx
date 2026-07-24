"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Assets } from "@/lib/AssetLoader";
import { AudioManager } from "@/lib/AudioManager";
import { useMounted } from "@/hooks/useMounted";

export default function IntroOverlay() {
  const { introComplete, setIntroComplete, setHasInteracted } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const introCompleteRef = useRef(introComplete);
  const videoPlayingRef = useRef(false);
  const [showClickPrompt, setShowClickPrompt] = useState(true);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const isMounted = useMounted();

  const dismissIntro = useCallback(() => {
    if (introCompleteRef.current) return;

    setFadeOut(true);
    window.setTimeout(() => {
      setIntroComplete(true);
      sessionStorage.setItem("introPlayed", "true");
      AudioManager.startBGM();
    }, 600);
  }, [setIntroComplete]);

  const handleStart = useCallback(() => {
    if (videoPlayingRef.current || introCompleteRef.current) return;

    setShowClickPrompt(false);
    setVideoPlaying(true);
    videoPlayingRef.current = true;
    setHasInteracted(true);

    AudioManager.init();

    const video = videoRef.current;
    if (!video) {
      dismissIntro();
      return;
    }

    const handlePlaybackFailure = () => {
      console.warn("Intro video could not start or load; continuing into the experience.", Assets.vid.intro);
      dismissIntro();
    };

    video.addEventListener("error", handlePlaybackFailure, { once: true });
    video.play().catch(handlePlaybackFailure);
  }, [dismissIntro, setHasInteracted]);

  const handleVideoEnd = useCallback(() => {
    dismissIntro();
  }, [dismissIntro]);

  useEffect(() => {
    introCompleteRef.current = introComplete;
  }, [introComplete]);

  useEffect(() => {
    videoPlayingRef.current = videoPlaying;
  }, [videoPlaying]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const played = sessionStorage.getItem("introPlayed");
      if (played) {
        setIntroComplete(true);
        setShowClickPrompt(false);
      } else {
        handleStart();
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [handleStart]);

  useEffect(() => {
    if (!videoPlaying) return;

    const fallbackTimer = window.setTimeout(() => {
      console.warn("Intro video stalled; continuing into the experience.");
      dismissIntro();
    }, 2500);

    return () => window.clearTimeout(fallbackTimer);
  }, [dismissIntro, videoPlaying]);

  useEffect(() => {
    if (!isMounted || introCompleteRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStart, isMounted]);

  if (introComplete || !isMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10002] bg-p5-black flex items-center justify-center"
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: introComplete ? "none" : "all" }}
        onClick={handleStart}
      >
        <style>{`body { overflow: hidden !important; }`}</style>

        {showClickPrompt && (
          <motion.div
            className="text-center cursor-pointer select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <p
                className="text-p5-red text-3xl md:text-5xl uppercase tracking-[0.3em] mb-4"
                style={{ fontFamily: "var(--font-persona-main)" }}
              >
                Click to Start
              </p>
              <div className="w-32 h-[2px] bg-p5-red mx-auto" />
              <p className="text-p5-white/40 text-sm mt-4 uppercase tracking-widest"
                 style={{ fontFamily: "var(--font-persona-menu)" }}>
                Best experienced with sound
              </p>
            </motion.div>
          </motion.div>
        )}

        {videoPlaying && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={handleVideoEnd}
            onError={() => {
              console.warn("Intro video failed to load; continuing into the experience.", Assets.vid.intro);
              dismissIntro();
            }}
            muted={false}
            playsInline
            preload="auto"
            autoPlay
          >
            <source src={Assets.vid.intro} type="video/webm" />
          </video>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
