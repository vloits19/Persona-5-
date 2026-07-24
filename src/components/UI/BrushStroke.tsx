"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BrushStrokeProps {
  color?: string;
  width?: number | string;
  height?: number;
  className?: string;
  delay?: number;
  variant?: "horizontal" | "underline" | "accent";
}

export default function BrushStroke({
  color = "#FF0000",
  width = "100%",
  height = 12,
  className = "",
  delay = 0,
  variant = "horizontal",
}: BrushStrokeProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const paths = {
    horizontal: "M2 6 C 20 2, 40 10, 60 5 C 80 0, 100 8, 120 4 C 140 0, 160 10, 180 5 C 195 2, 198 6, 198 6",
    underline: "M2 8 C 30 4, 50 10, 80 6 C 110 2, 140 10, 170 5 C 190 2, 198 7, 198 7",
    accent: "M2 2 C 10 8, 30 4, 50 10 C 70 4, 90 8, 100 3",
  };

  return (
    <svg
      ref={ref}
      className={`overflow-visible ${className}`}
      style={{ width, height }}
      viewBox={variant === "accent" ? "0 0 100 12" : "0 0 200 12"}
      preserveAspectRatio="none"
    >
      <motion.path
        d={paths[variant]}
        stroke={color}
        strokeWidth={variant === "accent" ? 3 : 4}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </svg>
  );
}
