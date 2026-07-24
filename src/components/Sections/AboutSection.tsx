"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/UI/SectionHeading";
import PersonaCard from "@/components/UI/PersonaCard";
import { Assets } from "@/lib/AssetLoader";
import { useMounted } from "@/hooks/useMounted";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cards = [
    {
      title: "Who I Am",
      description:
        "I’m Fawwaz, a student developer who enjoys building interactive experiences at the intersection of games, web, and design.",
      image: Assets.img.aboutMe,
      rotation: -2,
    },
    {
      title: "What I Build",
      description:
        "I create game projects, web interfaces, and UI-focused experiences that aim to feel clear, playful, and memorable.",
      image: Assets.img.funFact,
      rotation: 1,
    },
    {
      title: "How I Learn",
      description:
        "I’m always exploring new tools and technologies, from Unity and C# to React, Next.js, and modern digital product design.",
      image: Assets.img.hobby,
      rotation: -1.5,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-base relative py-32 px-8 md:px-20"
    >
      {/* decorative watermark removed per user request */}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative mb-12">
          <SectionHeading title="About Me" subtitle="// Building interactive worlds and digital products" />
        </div>

        {/* Speech bubble intro */}
        <motion.div
          className="speech-bubble max-w-2xl mb-16"
          initial={{ scale: mounted ? 0 : 1, opacity: mounted ? 0 : 1 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: mounted ? 0 : 1, opacity: mounted ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
        >
          <p className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: "var(--font-family-markin)", lineHeight: 1.7 }}>
            &ldquo;I’m driven by the idea that great digital experiences should feel thoughtful, interactive, and personal.&rdquo;
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {cards.map((card, i) => (
            <PersonaCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageSrc={card.image}
              rotation={card.rotation}
              index={i}
            />
          ))}
        </div>

        {/* Diagonal red accent */}
        <motion.div
          className="absolute -right-4 top-[40%] w-2 h-[300px] bg-p5-red"
          style={{ transform: "skewY(-20deg)" }}
          initial={{ height: mounted ? 0 : 300 }}
          animate={isInView ? { height: 300 } : { height: mounted ? 0 : 300 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </section>
  );
}
