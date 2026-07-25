"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useMounted } from "@/hooks/useMounted";
import { Assets } from "@/lib/AssetLoader";
import MagneticButton from "@/components/UI/MagneticButton";
import BrushStroke from "@/components/UI/BrushStroke";
import { useSFX } from "@/hooks/useSFX";
import { useApp } from "@/context/AppContext";
import { scrollToSection } from "@/hooks/useLenis";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true });
  const { playHover } = useSFX();

  useEffect(() => {
    if (!mounted || !isInView || !nameRef.current) return;
    const chars = nameRef.current.querySelectorAll(".hero-char");
    gsap.fromTo(
      chars,
      { y: 120, opacity: 0, rotateZ: -15, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(2)",
        delay: 0.3,
      }
    );
  }, [isInView, mounted]);

  const name = "FAWWAZ";
  const tagline = "Game Developer • Web Developer • UI/UX Enthusiast";

  const letterTransforms = [
    { rotate: -4, x: -2, y: 0 },
    { rotate: 3, x: 1, y: -1 },
    { rotate: -2, x: 0, y: 1 },
    { rotate: 2, x: 1, y: -2 },
    { rotate: -1, x: 0, y: 0 },
    { rotate: 4, x: -1, y: 1 },
  ];

  const handleExplore = () => {
    playHover();
    scrollToSection("about");
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-base relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 md:px-10 lg:px-20"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: mounted ? 0 : 0.4 }}
        animate={{ opacity: isInView ? 1 : mounted ? 0 : 0.4 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.16),transparent_38%)]" />
        <div className="absolute inset-0 opacity-20 saturate-50">
          <Image src={Assets.img.skill} alt="" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-p5-black/10 via-p5-black/40 to-p5-black/90" />
      </motion.div>

      <motion.div
        className="absolute top-8 right-[-12vw] hidden xl:block -z-20 pointer-events-none overflow-visible"
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 0.16, x: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative overflow-visible"
          style={{ width: "78vw", maxWidth: "820px", height: "100vh", opacity: 0.15, mixBlendMode: "multiply" }}
        >
          <Image
            src={Assets.img.jokerDrop}
            alt="Joker background art"
            fill
            className="object-contain"
            style={{ objectPosition: "center right" }}
          />
        </div>
      </motion.div>


      <div className="relative z-10 grid w-full max-w-7xl items-center gap-12 xl:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: mounted ? 0 : 1, x: mounted ? -60 : 0 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: mounted ? 0 : 1, x: mounted ? -60 : 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="mb-4 text-xs sm:text-sm uppercase text-p5-red"
            style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.32em", lineHeight: 1.4 }}
          >
            Persona 5
          </p>

          <h1
            ref={nameRef}
            className="mb-6 text-5xl uppercase leading-[0.95] text-p5-white-pure sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "var(--font-persona-main)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
              overflowWrap: "normal",
              fontSize: "clamp(3.8rem, 5.5vw, 5.8rem)",
              maxWidth: "min(100%, 26rem)",
            }}
          >
            <span className="inline-flex whitespace-nowrap" style={{ display: "inline-flex", flexWrap: "nowrap" }}>
              {name.split("").map((char, i) => (
                <span
                  key={i}
                  className="hero-char inline-block"
                  style={{
                    opacity: 0,
                    transform: `translate(${letterTransforms[i].x}px, ${letterTransforms[i].y}px) rotate(${letterTransforms[i].rotate}deg)`,
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <motion.div
            className="mb-8 overflow-hidden"
            initial={{ clipPath: mounted ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : { clipPath: mounted ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <p
              className="text-base uppercase text-p5-white/85 sm:text-lg md:text-2xl"
              style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.2em", lineHeight: 1.6 }}
            >
              {tagline}
            </p>
          </motion.div>

          <motion.div
            className="mb-10 h-1 w-24 bg-p5-red md:w-48"
            initial={{ scaleX: mounted ? 0 : 1 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: mounted ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: mounted ? 0 : 1, y: mounted ? 20 : 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <MagneticButton onClick={handleExplore} variant="red">
              Explore My Work
            </MagneticButton>
            <button
              className="border border-p5-red/40 px-5 py-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-p5-white/80 transition-colors hover:border-p5-red hover:text-p5-white"
              onMouseEnter={playHover}
              onClick={() => scrollToSection("contact")}
              data-hover
            >
              Contact
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={{ opacity: mounted ? 0 : 1, x: mounted ? 80 : 0 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: mounted ? 0 : 1, x: mounted ? 80 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-p5-red/30 bg-p5-black/70 p-4 shadow-[0_0_50px_rgba(255,0,0,0.18)] backdrop-blur">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.12),transparent_35%)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]">
              <Image src={Assets.img.aboutMe} alt="Featured portrait" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-p5-black via-p5-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="mb-2 text-[0.65rem] uppercase tracking-[0.4em] text-p5-red" style={{ fontFamily: "var(--font-persona-menu)" }}>
                  Featured Work
                </p>
                <p className="text-xl uppercase tracking-[0.15em] text-p5-white-pure" style={{ fontFamily: "var(--font-persona-main)", lineHeight: 1.3 }}>
                  Game dev • web • Video Editor
                </p>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -left-4 top-8 hidden w-24 rounded-lg border border-p5-red/30 bg-p5-black/70 p-3 md:flex md:flex-col md:items-center md:justify-center md:block"
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p
              className="text-sm uppercase tracking-[0.4em] text-p5-red text-center"
              style={{ fontFamily: "var(--font-persona-menu)", fontSize: "1.1rem", lineHeight: 1 }}
            >
              NAH
            </p>
            <p
              className="mt-0.5 text-base uppercase text-p5-white-pure text-center"
              style={{ fontFamily: "var(--font-persona-menu)", fontSize: "1.25rem", lineHeight: 0.95, letterSpacing: "0.04em" }}
            >
              I&apos;d
            </p>
            <p
              className="mt-0 text-base uppercase text-p5-white-pure text-center"
              style={{ fontFamily: "var(--font-persona-menu)", fontSize: "1.25rem", lineHeight: 0.95, letterSpacing: "0.04em" }}
            >
              Win
            </p>
          </motion.div>
        </motion.div>
      </div>

      <BrushStroke className="absolute bottom-8 left-8 w-40 opacity-80" width="40%" delay={0.4} />
      <motion.div className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full border border-p5-red/20" animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute right-[10%] top-[18%] h-16 w-16 rotate-45 border border-p5-red/30" animate={{ rotate: [45, 135, 45] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
    </section>
  );
}
