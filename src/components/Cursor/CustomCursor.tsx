"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const isMounted = useMounted();
  const pos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, [data-hover], .magnetic-btn, input, textarea, select, [role='button']"
      );
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isMounted || (typeof window !== "undefined" && "ontouchstart" in window)) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[10001] pointer-events-none"
      animate={{
        width: 18,
        height: 18,
      }}
      transition={{ duration: 0 }}
      style={{
        backgroundImage: "url('/assets/cursor/Cursor.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        willChange: "transform",
      }}
    />
  );
}
