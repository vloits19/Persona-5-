"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useSFX } from "@/hooks/useSFX";

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useApp();
  const { playHover, playSelect } = useSFX();

  const handleMenuClick = () => {
    playSelect();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[9980] px-6 py-6 flex items-center justify-between pointer-events-none">
      {/* Brand logo / tag */}
      <motion.div
        className="pointer-events-auto flex items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onMouseEnter={playHover}
        data-hover
      >
        <div
          className="w-10 h-10 bg-p5-red flex items-center justify-center font-bold text-p5-white-pure text-xl comic-border-white"
          style={{
            fontFamily: "var(--font-persona-main)",
            transform: "rotate(-6deg)",
          }}
        >
          P5
        </div>
        <span
          className="hidden sm:inline text-p5-white-pure text-base uppercase"
          style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.18em", lineHeight: 1.2 }}
        >
          FAWWAZ // PORTFOLIO
        </span>
      </motion.div>

      {/* Menu Trigger Button */}
      <motion.button
        className="pointer-events-auto relative px-6 py-2.5 bg-p5-black-light text-p5-white-pure border-2 border-p5-red flex items-center gap-3 overflow-hidden group"
        style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        onClick={handleMenuClick}
        onMouseEnter={playHover}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        data-hover
      >
        {/* Background slide effect */}
        <div className="absolute inset-0 bg-p5-red translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />

        <span
          className="text-sm uppercase group-hover:text-p5-white-pure transition-colors"
          style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.24em", lineHeight: 1.2 }}
        >
          {isMenuOpen ? "CLOSE" : "MENU"}
        </span>

        {/* Menu bars icon */}
        <div className="flex flex-col gap-1 w-4">
          <div className="h-[2px] bg-p5-red group-hover:bg-p5-white-pure transition-colors" />
          <div className="h-[2px] bg-p5-red group-hover:bg-p5-white-pure transition-colors translate-x-1" />
          <div className="h-[2px] bg-p5-red group-hover:bg-p5-white-pure transition-colors" />
        </div>
      </motion.button>
    </header>
  );
}
