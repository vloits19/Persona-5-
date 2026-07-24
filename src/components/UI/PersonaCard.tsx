"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useSFX } from "@/hooks/useSFX";

interface PersonaCardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  rotation?: number;
  index?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function PersonaCard({
  title,
  description,
  imageSrc,
  rotation = 0,
  index = 0,
  className = "",
  children,
}: PersonaCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { playHover } = useSFX();

  return (
    <motion.div
      ref={ref}
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 60, rotate: rotation - 5 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotation } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onMouseEnter={playHover}
      data-hover
    >
      {/* Card body */}
      <div className="relative bg-p5-black-light border-3 border-p5-white-pure overflow-hidden"
        style={{
          clipPath: "polygon(3% 0%, 100% 2%, 97% 100%, 0% 98%)",
          boxShadow: "6px 6px 0px rgba(255,0,0,0.5), -2px -2px 0px rgba(255,255,255,0.1)",
        }}
      >
        {/* Image */}
        {imageSrc && (
          <div className="relative w-full h-48 md:h-56 overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-p5-black via-transparent to-transparent" />
            {/* Halftone overlay on image */}
            <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply" />
          </div>
        )}

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3
            className="text-p5-white-pure text-xl md:text-2xl uppercase mb-2"
            style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.16em", lineHeight: 1.2 }}
          >
            {title}
          </h3>
          {description && (
            <p className="text-p5-white/80 text-sm md:text-[0.95rem] leading-relaxed"
               style={{ fontFamily: "var(--font-family-markin)", lineHeight: 1.7 }}>
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-0 h-0 border-t-40 border-t-p5-red border-l-40 border-l-transparent"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        />
      </div>

      {/* Shadow element */}
      <div
        className="absolute inset-0 bg-p5-red opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
        style={{
          transform: "translate(8px, 8px)",
          clipPath: "polygon(3% 0%, 100% 2%, 97% 100%, 0% 98%)",
        }}
      />
    </motion.div>
  );
}
