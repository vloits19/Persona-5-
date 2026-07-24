"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useApp, SECTIONS } from "@/context/AppContext";
import { useSFX } from "@/hooks/useSFX";
import { scrollToSection } from "@/hooks/useLenis";
import { useCallback } from "react";

const sectionHints = ["Home", "About", "Skills", "Projects", "Experience", "Contact", "Thank You"];

export default function FullscreenMenu() {
  const { isMenuOpen, setIsMenuOpen, setCurrentSection, setIsTransitioning } = useApp();
  const { playHover, playSelect, playBack } = useSFX();

  const handleNavigate = useCallback(
    (index: number) => {
      playSelect();
      setCurrentSection(index);
      setIsMenuOpen(false);
      setIsTransitioning(true);
      setTimeout(() => {
        scrollToSection(SECTIONS[index].id);
      }, 400);
    },
    [playSelect, setCurrentSection, setIsMenuOpen, setIsTransitioning]
  );

  const handleClose = useCallback(() => {
    playBack();
    setIsMenuOpen(false);
  }, [playBack, setIsMenuOpen]);

  const menuVariants = {
    hidden: {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    visible: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0, skewX: -10 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      skewX: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (i: number) => ({
      x: 100,
      opacity: 0,
      skewX: 10,
      transition: { duration: 0.3, delay: i * 0.03 },
    }),
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 z-[9990] bg-p5-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Menu panel */}
          <motion.nav
            className="fixed inset-0 z-[9991] flex flex-col justify-center px-8 md:px-20 lg:px-32"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)",
            }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-8 right-8 text-p5-white-pure text-4xl hover:text-p5-red transition-colors"
              onClick={handleClose}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              data-hover
            >
              ✕
            </motion.button>

            {/* Decorative diagonal line */}
            <div className="absolute top-0 right-[40%] w-[2px] h-full bg-p5-red/20 transform -skew-x-12" />

            {/* Menu items */}
            <div className="space-y-2 md:space-y-4">
              {SECTIONS.map((section, i) => (
                <motion.button
                  key={section.id}
                  className="block w-full text-left group"
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => handleNavigate(i)}
                  onMouseEnter={playHover}
                  data-hover
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    {/* Number */}
                    <span className="text-p5-red/40 text-lg md:text-2xl font-mono min-w-[40px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Label */}
                    <span
                      className="text-p5-white-pure text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider group-hover:text-p5-red transition-colors duration-200 relative"
                      style={{ fontFamily: "var(--font-persona-menu)" }}
                    >
                      {section.label}
                      <span className="ml-2 text-sm md:text-base uppercase tracking-[0.3em] text-p5-white/40">
                        {sectionHints[i]}
                      </span>
                      {/* Hover underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-[3px] bg-p5-red"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>

                    {/* Arrow on hover */}
                    <motion.span
                      className="text-p5-red text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -20 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Red bar accent on hover */}
                  <motion.div
                    className="h-[1px] bg-p5-red/20 mt-2 group-hover:bg-p5-red/50 transition-colors"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-8 left-8 md:left-20">
              <p className="text-p5-red/30 text-xs uppercase tracking-[0.5em]"
                 style={{ fontFamily: "var(--font-persona-menu)" }}>
                Select your destination
              </p>
            </div>

            {/* Halftone corner */}
            <div className="absolute bottom-0 right-0 w-64 h-64 halftone-dense opacity-30" />
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
