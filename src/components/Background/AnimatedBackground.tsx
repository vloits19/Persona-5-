"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Assets } from "@/lib/AssetLoader";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate floating shapes once on mount
    const container = containerRef.current;
    if (!container) return;

    const shapes = container.querySelectorAll<HTMLElement>(".bg-shape");
    shapes.forEach((shape, i) => {
      shape.style.animationDelay = `${i * 0.8}s`;
      shape.style.animationDuration = `${15 + i * 3}s`;
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-p5-black via-p5-black-light to-p5-black" />

      {/* Hero image layer */}
      <div className="absolute inset-0 opacity-20 saturate-50">
        <Image src={Assets.img.skill} alt="" fill className="object-cover" sizes="100vw" />
      </div>

      {/* Overlay glow (top-left removed per user request) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.1),transparent_45%)]" />

      {/* Diagonal red accent lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full diagonal-stripes" />
      </div>

      {/* Floating geometric shapes (avoid top-left shapes) */}
      {[...Array(5)].map((_, idx) => {
        const i = idx + 1; // start at 1 to avoid far top-left placement
        return (
          <motion.div
            key={i}
            className="bg-shape absolute"
            style={{
              width: `${40 + i * 30}px`,
              height: `${40 + i * 30}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 16}%`,
              border: `2px solid rgba(255, 0, 0, ${0.05 + i * 0.02})`,
              transform: `rotate(${45 + i * 15}deg)`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [45 + i * 15, 45 + i * 15 + 180, 45 + i * 15 + 360],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Large red circle accent — top right */}
      <motion.div
        className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Large red circle accent — bottom left */}
      <motion.div
        className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(204,0,0,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moving diagonal bar */}
      <motion.div
        className="absolute w-[3px] h-[200vh] bg-p5-red opacity-[0.04]"
        style={{ top: "-50%", left: "30%", transform: "rotate(-15deg)" }}
        animate={{ x: [-200, 200] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />
      <motion.div
        className="absolute w-[2px] h-[200vh] bg-p5-red opacity-[0.03]"
        style={{ top: "-50%", left: "65%", transform: "rotate(-15deg)" }}
        animate={{ x: [200, -200] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
