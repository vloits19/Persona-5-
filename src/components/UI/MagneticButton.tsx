"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useSFX } from "@/hooks/useSFX";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "red" | "black" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  variant = "red",
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { playHover, playSelect } = useSFX();

  const handleClick = useCallback(() => {
    playSelect();
    onClick?.();
  }, [onClick, playSelect]);

  const variants = {
    red: "bg-p5-red text-p5-white-pure hover:bg-p5-red-dark",
    black: "bg-p5-black text-p5-white-pure border-2 border-p5-red hover:bg-p5-red",
    outline: "bg-transparent text-p5-red border-2 border-p5-red hover:bg-p5-red hover:text-p5-white-pure",
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      className={`magnetic-btn ${variants[variant]} ${className} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      data-magnetic
      data-hover
      onClick={handleClick}
      onMouseEnter={playHover}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
