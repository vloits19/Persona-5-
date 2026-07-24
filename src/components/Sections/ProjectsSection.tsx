"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/UI/SectionHeading";
import { useSFX } from "@/hooks/useSFX";
import { useMounted } from "@/hooks/useMounted";

const projects = [
  {
    title: "Persona-inspired Portfolio Website",
    description: "A personal portfolio experience built around a Persona-inspired feel, combining motion, storytelling, and polished interaction design. Work in Progress.",
    tags: ["Next.js", "React", "Framer Motion", "Work in Progress"],
    color: "#FF0000",
  },
  {
    title: "Unity 2D Platformer Game",
    description: "An ongoing 2D platformer project focused on gameplay flow, level design, and responsive player feedback. Work in Progress.",
    tags: ["Unity", "C#", "Game Design", "Work in Progress"],
    color: "#CC0000",
  },
  {
    title: "Web Development Projects",
    description: "A growing set of web experiments and small products exploring modern UI patterns, responsive layouts, and creative front-end development. Work in Progress.",
    tags: ["JavaScript", "TypeScript", "Tailwind", "Work in Progress"],
    color: "#DC143C",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { playHover } = useSFX();

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{
        opacity: mounted ? 0 : 1,
        x: mounted ? (isEven ? -100 : 100) : 0,
        rotate: mounted ? (isEven ? -3 : 3) : 0,
      }}
      animate={isInView ? { opacity: 1, x: 0, rotate: isEven ? -1 : 1 } : { opacity: mounted ? 0 : 1, x: mounted ? (isEven ? -100 : 100) : 0, rotate: mounted ? (isEven ? -3 : 3) : 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={playHover}
      data-hover
    >
      <motion.div
        className="relative bg-p5-black-light p-6 md:p-8 overflow-hidden"
        style={{
          clipPath: isEven
            ? "polygon(0% 0%, 97% 2%, 100% 100%, 3% 98%)"
            : "polygon(3% 0%, 100% 0%, 97% 98%, 0% 100%)",
          border: `2px solid ${project.color}40`,
        }}
        whileHover={{
          scale: 1.02,
          y: -5,
          transition: { type: "spring", stiffness: 300 },
        }}
      >
        {/* Number */}
        <div
          className="absolute top-4 right-6 text-4xl md:text-6xl font-mono leading-none select-none"
          style={{
            color: `${project.color}0F`,
            fontFamily: "var(--font-persona-menu)",
            opacity: 0.14,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Color accent bar */}
        <motion.div
          className="absolute top-0 left-0 w-1 h-full"
          style={{ background: project.color }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          whileHover={{ width: 4 }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3
            className="text-p5-white-pure text-xl md:text-2xl uppercase mb-3 project-title"
            style={{
              letterSpacing: "0.06em",
              lineHeight: 1.2,
              textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5)",
              WebkitTextStroke: ".5px rgba(0,0,0,0.65)",
            }}
          >
            {project.title}
          </h3>

          <p className="text-p5-white/80 text-sm md:text-[0.95rem] leading-relaxed mb-4 max-w-xl"
             style={{ fontFamily: "var(--font-family-markin)", lineHeight: 1.75, textShadow: "0 1px 2px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.75)", WebkitTextStroke: "0.5px rgba(0,0,0,0.9)" }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
                <span
                key={tag}
                className="px-3 py-1 text-xs uppercase tracking-wider border"
                style={{
                  borderColor: `${project.color}60`,
                  color: project.color,
                  fontFamily: "var(--font-family-markin)",
                  fontWeight: 700,
                  clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5)",
                  WebkitTextStroke: "0.35px rgba(0,0,0,0.65)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover diagonal slash */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      {/* Shadow */}
      <div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: project.color,
          opacity: 0.1,
          transform: "translate(6px, 6px)",
          clipPath: isEven
            ? "polygon(0% 0%, 97% 2%, 100% 100%, 3% 98%)"
            : "polygon(3% 0%, 100% 0%, 97% 98%, 0% 100%)",
        }}
      />
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="projects" className="section-base relative py-32 px-8 md:px-20">
      {/* decorative watermark removed per user request */}

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Projects" subtitle="// Personal work in motion" />

        <div className="space-y-6 mt-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
