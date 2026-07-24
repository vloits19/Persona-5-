"use client";

import { useEffect } from "react";
import { useApp, SECTIONS } from "@/context/AppContext";

export function useSectionObserver() {
  const { setCurrentSection } = useApp();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const index = SECTIONS.findIndex((section) => section.id === visibleEntry.target.id);
        if (index >= 0) {
          setCurrentSection(index);
        }
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: "-20% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setCurrentSection]);
}
