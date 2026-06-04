"use client";

import { motion } from "framer-motion";
import {
  BookOpen, Code2, Headphones, Compass, Coffee,
  Pencil, Globe, Heart, Star, Zap, Film, Camera,
  ArrowLeft, CalendarDays,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { nowSections, nowLastUpdated } from "@/lib/content/now";

/** Registry of icon names → Lucide components.
 *  To add a new icon, add an entry here then use its key in now.ts. */
const iconRegistry: Record<string, LucideIcon> = {
  code:       Code2,
  book:       BookOpen,
  compass:    Compass,
  headphones: Headphones,
  coffee:     Coffee,
  pencil:     Pencil,
  globe:      Globe,
  heart:      Heart,
  star:       Star,
  zap:        Zap,
  film:       Film,
  camera:     Camera,
};

export default function NowClient() {
  // Filter out sections with no items
  const activeSections = nowSections.filter((s) => s.items.length > 0);

  return (
    <section className="min-h-[calc(100vh-5rem)] px-4 md:px-6 py-8 md:py-12 max-w-2xl mx-auto">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 md:mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono transition-colors"
          style={{ color: "var(--text-secondary)" }}
          aria-label="Back to desk"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          back to the desk
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-10 md:mb-14"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="font-mono text-xs md:text-sm tracking-widest uppercase mb-3"
          style={{ color: "var(--amber-glow)" }}
        >
          a snapshot in time
        </motion.p>
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-none"
          style={{ color: "var(--text-primary)" }}
        >
          What I&apos;m doing{" "}
          <span className="font-hand" style={{ color: "var(--amber-glow)" }}>
            now
          </span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-sm md:text-base leading-relaxed max-w-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "color-mix(in srgb, var(--amber-glow) 80%, transparent)" }}
          >
            Derek Sivers&apos; /now movement
          </a>
          . This is what I&apos;d tell a friend if they asked{" "}
          <em>&ldquo;so what are you up to these days?&rdquo;</em>
        </motion.p>

        <motion.div variants={fadeUp} custom={3} className="mt-4 md:mt-5">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono"
            style={{ borderColor: "var(--border-col)", color: "var(--text-muted)" }}
          >
            <CalendarDays className="w-3 h-3" />
            Last updated: {nowLastUpdated}
          </span>
        </motion.div>
      </motion.div>

      {/* Empty state — when all sections have no items */}
      {activeSections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="font-hand text-2xl" style={{ color: "var(--text-secondary)" }}>
            Nothing yet!
          </p>
          <p className="text-sm mt-2 font-mono" style={{ color: "var(--text-muted)" }}>
            Add sections to <code>lib/content/now.ts</code>
          </p>
        </motion.div>
      )}

      {/* Sections */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-8 md:space-y-10"
      >
        {activeSections.map((section, i) => {
          const Icon = iconRegistry[section.iconName] ?? Code2;
          return (
            <motion.article key={section.id} variants={fadeUp} custom={i}>
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <span
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-xl border flex items-center justify-center shrink-0 ${section.colorClass}`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </span>
                <h2
                  className="text-lg md:text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.heading}
                </h2>
                <div className="flex-1 h-px" style={{ background: "var(--border-col)" }} aria-hidden="true" />
              </div>

              {/* Items */}
              <ul className="space-y-3 md:space-y-4 pl-11 md:pl-12" role="list">
                {section.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 + j * 0.06, duration: 0.4 }}
                    className="group"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-colors"
                        style={{ background: "color-mix(in srgb, var(--amber-glow) 40%, transparent)" }}
                        aria-hidden="true"
                      />
                      <div>
                        <p
                          className="leading-snug transition-colors"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.text}
                        </p>
                        {item.note && (
                          <p
                            className="font-mono text-xs mt-0.5 italic"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Footer */}
      {activeSections.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 md:mt-20 pt-6 md:pt-8"
          style={{ borderTop: "1px solid var(--border-col)" }}
        >
          <p className="font-hand text-base md:text-lg text-center" style={{ color: "var(--text-muted)" }}>
            This page changes when my life does. Check back sometime. ☕
          </p>
        </motion.div>
      )}
    </section>
  );
}
