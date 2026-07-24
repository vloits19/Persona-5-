"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/UI/SectionHeading";
import { useMounted } from "@/hooks/useMounted";

const experiences = [
  {
    year: "2024 — Present",
    role: "Student • Game Development",
    company: "SMK Negeri 1 Bawang",
    description: "Studying game development while building creative projects that combine coding, UI design, and interactive storytelling.",
  },
  {
    year: "2024 — Present",
    role: "Independent Developer",
    company: "Personal Projects",
    description: "Explored web development and game ideas through portfolio work, small prototypes, and UI experiments using React, Next.js, and Unity.",
  },
  {
    year: "2021 - Present",
    role: "Editing Video",
    company: "Self-directed",
    description: "Learning video editing to create engaging content, promote my projects, and continuously improve my creative skills.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="experience" className="section-base relative py-32 px-8 md:px-20">
      {/* decorative watermark removed per user request */}

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Experience" subtitle="// My path so far" />

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-p5-red/30 -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                className={`relative flex items-center mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
                initial={{
                  opacity: mounted ? 0 : 1,
                  x: mounted ? (isLeft ? -80 : 80) : 0,
                }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: mounted ? 0 : 1, x: mounted ? (isLeft ? -80 : 80) : 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 w-4 h-4 bg-p5-red -translate-x-1/2 z-10"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                  initial={{ scale: mounted ? 0 : 1 }}
                  animate={isInView ? { scale: 1 } : { scale: mounted ? 0 : 1 }}
                  transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                />

                {/* Content card */}
                <div
                  className={`md:w-[45%] ml-8 md:ml-0 ${
                    isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <motion.div
                    className="bg-p5-black-light p-6 relative overflow-hidden"
                    style={{
                      clipPath: isLeft
                        ? "polygon(0% 0%, 98% 2%, 100% 100%, 2% 98%)"
                        : "polygon(2% 0%, 100% 0%, 98% 98%, 0% 100%)",
                      border: "1px solid rgba(255,0,0,0.2)",
                    }}
                    whileHover={{
                      borderColor: "rgba(255,0,0,0.6)",
                      transition: { duration: 0.2 },
                    }}
                    data-hover
                  >
                    {/* Year */}
                    <p className="text-p5-red text-xs sm:text-sm uppercase mb-2"
                       style={{ fontFamily: "var(--font-family-markin)", letterSpacing: "0.12em", lineHeight: 1.4 }}>
                      {exp.year}
                    </p>

                    {/* Role */}
                    <h3
                      className="text-p5-white-pure text-lg md:text-xl uppercase mb-2"
                      style={{ fontFamily: "var(--font-family-markin)", letterSpacing: "0.02em", lineHeight: 1.2 }}
                    >
                      {exp.role}
                    </h3>

                    {/* Company */}
                    <p className="text-p5-yellow text-sm uppercase mb-3"
                       style={{ fontFamily: "var(--font-family-markin)", letterSpacing: "0.02em", lineHeight: 1.4 }}>
                      @ {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-p5-white/80 text-sm md:text-[0.95rem] leading-relaxed"
                       style={{ fontFamily: "var(--font-family-markin)", lineHeight: 1.7 }}>
                      {exp.description}
                    </p>

                    {/* Corner accent */}
                    <div
                      className="absolute top-0 w-8 h-8"
                      style={{
                        [isLeft ? "left" : "right"]: 0,
                        borderTop: "2px solid #FF0000",
                        [isLeft ? "borderLeft" : "borderRight"]: "2px solid #FF0000",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
