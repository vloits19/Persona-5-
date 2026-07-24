"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".heading-char");
    gsap.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "back.out(1.7)",
      }
    );
  }, [isInView]);

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const titleChars = title.split("");

  return (
    <div ref={containerRef} className={`relative mb-16 ${alignClass} ${className}`}>
      {/* Red diagonal bar behind text */}
      <motion.div
        className="absolute -left-4 top-1/2 -translate-y-1/2 h-[120%] bg-p5-red -z-10"
        initial={{ width: 0, skewX: -12 }}
        animate={isInView ? { width: "110%", skewX: -12 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main title */}
      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-p5-white-pure uppercase relative z-10"
        style={{ fontFamily: "var(--font-family-hatty)", letterSpacing: "0.16em", lineHeight: 1.05 }}
      >
        {titleChars.map((char, i) => (
          <span
            key={i}
            className="heading-char inline-block"
            style={{ opacity: 0 }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-p5-red text-sm sm:text-base md:text-lg mt-3 uppercase relative z-10"
          style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.24em", lineHeight: 1.5 }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Brush stroke underline */}
      <motion.svg
        className="absolute -bottom-4 left-0 w-48 h-3 z-10"
        viewBox="0 0 200 12"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.path
          d="M2 6 C 30 2, 50 10, 80 4 C 110 -2, 140 10, 198 6"
          stroke="#FF0000"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.svg>
    </div>
  );
}
