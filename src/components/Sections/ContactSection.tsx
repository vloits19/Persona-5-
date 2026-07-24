"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/UI/SectionHeading";
import MagneticButton from "@/components/UI/MagneticButton";
import { useSFX } from "@/hooks/useSFX";
import { useMounted } from "@/hooks/useMounted";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useMounted();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { playHover } = useSFX();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mvzewlvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error || "Unable to send your message. Please try again later.");
        return;
      }

      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => {
        if (typeof window === "undefined") return;
        const el = document.getElementById("thankyou");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch (err) {
      setError("Unable to send your message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full bg-p5-gray/50 text-p5-white border-2 border-p5-gray-light focus:border-p5-red px-5 py-3 text-sm uppercase tracking-wider outline-none transition-colors duration-200";

  const socials = [
    { name: "GitHub", url: "https://github.com/vloits19" },
    { name: "Email", url: "mailto:fawwazayq@gmail.com" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-base relative py-32 px-8 md:px-20">
      {/* decorative watermark removed per user request */}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative mb-10">
          <SectionHeading title="Contact" subtitle="// Let’s build something memorable" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Contact form */}
          <motion.form
            className="space-y-5"
            onSubmit={handleSubmit}
            initial={{ opacity: mounted ? 0 : 1, x: mounted ? -60 : 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: mounted ? 0 : 1, x: mounted ? -60 : 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <label className="text-p5-red text-[0.7rem] uppercase mb-1 block"
                style={{ fontFamily: "var(--font-family-menu)", letterSpacing: "0.3em" }}>
                Name
              </label>
              <input
                type="text"
                className={inputBaseClass}
                style={{
                  fontFamily: "var(--font-family-markin)",
                  clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                }}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                onFocus={playHover}
                required
                data-hover
              />
            </div>

            <div>
              <label className="text-p5-red text-[0.7rem] uppercase mb-1 block"
                style={{ fontFamily: "var(--font-family-menu)", letterSpacing: "0.3em" }}>
                Email
              </label>
              <input
                type="email"
                className={inputBaseClass}
                style={{
                  fontFamily: "var(--font-family-markin)",
                  clipPath: "polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)",
                }}
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                onFocus={playHover}
                required
                data-hover
              />
            </div>

            <div>
              <label className="text-p5-red text-[0.7rem] uppercase mb-1 block"
                style={{ fontFamily: "var(--font-family-menu)", letterSpacing: "0.3em" }}>
                Message
              </label>
              <textarea
                className={`${inputBaseClass} min-h-35 resize-none`}
                style={{
                  fontFamily: "var(--font-family-markin)",
                  letterSpacing: "0.02em",
                  clipPath: "polygon(1% 0%, 100% 0%, 99% 100%, 0% 100%)",
                }}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={playHover}
                required
                data-hover
              />
            </div>

            <MagneticButton type="submit" variant="red" disabled={submitting}>
              {submitting ? "Sending..." : submitted ? "Message Sent ✓" : "Send Message →"}
            </MagneticButton>
            {error ? (
              <p className="mt-2 text-sm text-p5-red" style={{ fontFamily: "var(--font-family-markin)" }}>
                {error}
              </p>
            ) : null}
          </motion.form>

          {/* Social links */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: mounted ? 0 : 1, x: mounted ? 60 : 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: mounted ? 0 : 1, x: mounted ? 60 : 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h3
              className="text-p5-white-pure text-2xl uppercase mb-8"
              style={{ fontFamily: "var(--font-persona-menu)", letterSpacing: "0.16em", lineHeight: 1.2 }}
            >
              Connect
            </h3>

            <div className="space-y-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  onMouseEnter={playHover}
                  data-hover
                >
                  <div
                    className="w-2 h-2 bg-p5-red group-hover:w-8 transition-all duration-300"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                  />
                  <span
                    className="text-p5-white/80 text-lg uppercase group-hover:text-p5-red transition-colors"
                    style={{ fontFamily: "var(--font-family-menu)", letterSpacing: "0.2em", lineHeight: 1.4 }}
                  >
                    {social.name}
                  </span>
                  <span className="text-p5-red opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-12 relative">
              <div className="w-16 h-0.5 bg-p5-red" />
              <p className="text-p5-white/40 text-xs uppercase tracking-[0.3em] mt-3"
                 style={{ fontFamily: "var(--font-family-markin)" }}>
                I’m open to creative collaborations, freelance work, and conversations about game and web projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
