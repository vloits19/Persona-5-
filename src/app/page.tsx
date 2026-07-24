"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import IntroOverlay from "@/components/Sections/IntroOverlay";
import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import SkillsSection from "@/components/Sections/SkillsSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import ExperienceSection from "@/components/Sections/ExperienceSection";
import ContactSection from "@/components/Sections/ContactSection";
import ThankYouSection from "@/components/Sections/ThankYouSection";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { hasInteracted, setHasInteracted } = useApp();

  // Initialize smooth scroll
  useLenis(true);
  useSectionObserver();

  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted, setHasInteracted]);

  return (
    <>
      {/* Cinematic Intro Video Overlay */}
      <IntroOverlay />

      {/* Sequential Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <ThankYouSection />
    </>
  );
}
