"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import MagneticButton from "@/components/UI/MagneticButton";
import { useMounted } from "@/hooks/useMounted";

export default function ThankYouSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!mounted || !isInView || !textRef.current) return;
    const chars = textRef.current.querySelectorAll(".ty-char");
    gsap.fromTo(
      chars,
      { y: 100, opacity: 0, rotateZ: -20, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(2.5)",
      }
    );
  }, [isInView, mounted]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const decorativeShapes = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: 20 + i * 10,
        top: `${(i * 17) % 100}%`,
        left: `${(i * 29) % 100}%`,
        opacity: 0.05 + (i % 6) * 0.01,
        rotate: `${i * 30}deg`,
      })),
    []
  );

  const text = "Thanks";

  return (
    <section
      ref={sectionRef}
      id="thankyou"
      className="section-base relative flex items-center justify-center min-h-screen"
    >
      {/* decorative watermark removed per user request */}

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {decorativeShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              top: shape.top,
              left: shape.left,
              border: `1px solid rgba(255, 0, 0, ${shape.opacity})`,
              transform: `rotate(${shape.rotate})`,
            }}
            animate={{
              rotate: [0, 360],
              y: [0, -50, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + shape.id * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-8">
        {/* Red flash bar */}
        <motion.div
          className="w-full max-w-xl h-0.75 bg-p5-red mx-auto mb-8"
          initial={{ scaleX: mounted ? 0 : 1 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: mounted ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Thank You text */}
        <h2
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl text-p5-white-pure uppercase mb-6"
          style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.16em", lineHeight: 1.05 }}
        >
          {text.split("").map((char, i) => (
            <span key={i} className="ty-char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <motion.p
          className="text-p5-white/70 text-sm sm:text-base md:text-lg uppercase mb-12"
          style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.24em", lineHeight: 1.6 }}
          initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          For stopping by and checking out my work
        </motion.p>

        {/* Back to top */}
        <motion.div
          initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MagneticButton onClick={handleScrollTop} variant="outline">
            ↑ Back to Top
          </MagneticButton>
        </motion.div>

        {/* Bottom red bar */}
        <motion.div
          className="w-full max-w-xl h-0.75 bg-p5-red mx-auto mt-12"
          initial={{ scaleX: mounted ? 0 : 1 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: mounted ? 0 : 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </section>
  );
}
