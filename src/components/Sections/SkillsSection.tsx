"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/UI/SectionHeading";
import BrushStroke from "@/components/UI/BrushStroke";
import { Assets } from "@/lib/AssetLoader";
import { useSFX } from "@/hooks/useSFX";
import { useMounted } from "@/hooks/useMounted";

const skills = [
  {
    category: "Programming",
    items: [
      { name: "C#", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 86 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 89 },
      { name: "Next.js", level: 86 },
      { name: "TailwindCSS", level: 84 },
    ],
  },
  {
    category: "Game Development",
    items: [
      { name: "Unity", level: 82 },
      { name: "Blender", level: 74 },
    ],
  },
  {
    category: "Database & Tools",
    items: [
      { name: "Supabase", level: 68 },
      { name: "Capcut", level: 80 },
      { name: "Git", level: 84 },
      { name: "GitHub", level: 86 },
      { name: "VS Code", level: 90 },
    ],
  },
];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { playHover } = useSFX();

    return (
    <motion.div
      ref={ref}
      className="mb-4 group"
      initial={{ x: -60, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between mb-1">
          <span className="text-p5-white text-sm uppercase tracking-wider"
            style={{ fontFamily: "var(--font-family-markin)" }}>
          {name}
        </span>
        <motion.span
          className="text-p5-red text-sm"
          style={{ fontFamily: "var(--font-family-markin)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="relative h-2.5 bg-p5-gray/80 overflow-hidden"
           style={{ clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-p5-red to-p5-crimson"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1,
            delay: index * 0.1 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        {/* Animated pulse on the bar end */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-p5-white-pure/50"
          initial={{ left: 0 }}
          animate={isInView ? { left: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="skills" className="section-base relative py-32 px-8 md:px-20">
      {/* Watermark */}
      {/* decorative watermark removed per user request */}

      {/* Halftone background panel */}
      <div className="absolute inset-0 halftone opacity-5" />

      <div className="max-w-7xl mx-auto relative z-10">

        <SectionHeading title="Skills" subtitle="// Code, design, and play in motion" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Skill image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: mounted ? 0 : 1, scale: mounted ? 0.8 : 1, rotate: mounted ? -5 : -3 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -3 } : { opacity: mounted ? 0 : 1, scale: mounted ? 0.8 : 1, rotate: mounted ? -5 : -3 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <div className="relative w-full h-[500px] overflow-hidden"
                 style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}>
              <Image
                src={Assets.img.skill}
                alt="Skills"
                fill
                className="object-cover object-[center_30%]"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-p5-red/20 mix-blend-multiply" />
            </div>
            <BrushStroke className="absolute -bottom-2 left-0" width="80%" delay={0.5} />
          </motion.div>

          {/* Skill categories */}
          <div className="lg:col-span-2 space-y-10">
            {skills.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: mounted ? 0 : 1, y: mounted ? 40 : 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: mounted ? 0 : 1, y: mounted ? 40 : 0 }}
                transition={{ duration: 0.5, delay: ci * 0.2 }}
              >
                <h3
                  className="text-p5-red text-xl sm:text-2xl uppercase mb-4 relative inline-block"
                  style={{ fontFamily: "var(--font-family-hatty)", letterSpacing: "0.18em", lineHeight: 1.2 }}
                >
                  {category.category}
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-p5-red/30" />
                </h3>
                {category.items.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={ci * 4 + si}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
