"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 md:px-6 relative overflow-hidden">
      {/* Sketchbook paper texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 31px,
              rgba(217,124,42,0.06) 31px,
              rgba(217,124,42,0.06) 32px
            )
          `,
          backgroundSize: "100% 32px",
        }}
        aria-hidden="true"
      />

      {/* Left margin line */}
      <div
        className="absolute left-20 top-0 bottom-0 w-px hidden md:block z-0"
        style={{ background: "rgba(217,124,42,0.12)" }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-lg"
      >
        {/* Animated SVG "404" sketch */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="flex justify-center mb-8"
        >
          <svg
            width="280"
            height="120"
            viewBox="0 0 280 120"
            fill="none"
            aria-label="404"
            role="img"
          >
            {/* "4" left */}
            <path
              d="M10 20 L10 65 L45 65 M30 20 L30 90 M10 20 L30 20"
              stroke="#d97c2a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sketch-path"
              style={{ animationDelay: "0s" }}
            />
            {/* "0" middle */}
            <ellipse
              cx="140"
              cy="55"
              rx="38"
              ry="42"
              stroke="#d97c2a"
              strokeWidth="4"
              strokeLinecap="round"
              className="sketch-path"
              style={{ animationDelay: "0.4s", strokeDasharray: 250, strokeDashoffset: 250 }}
            />
            {/* "4" right */}
            <path
              d="M200 20 L200 65 L235 65 M220 20 L220 90 M200 20 L220 20"
              stroke="#d97c2a"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sketch-path"
              style={{ animationDelay: "0.8s" }}
            />

            {/* Little doodle squiggles around */}
            <path
              d="M0 100 Q15 95 30 100 Q45 105 60 100"
              stroke="#7a4510"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M220 100 Q240 96 260 100 Q270 102 280 100"
              stroke="#7a4510"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Hand-written style text */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-hand text-3xl md:text-4xl text-cream mb-3 leading-snug"
        >
          You drew outside the lines.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-text-secondary text-base leading-relaxed mb-10"
        >
          This page doesn&apos;t exist — but hey, some of the best sketches start
          by accident. Let&apos;s get you back to the desk.
        </motion.p>

        {/* Return button */}
        <motion.div variants={fadeUp} custom={3}>
          <Link href="/">
            <motion.span
              className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-medium text-sm cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--amber-glow), var(--amber-soft))",
                color: "var(--bg)",
              }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 20 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to the desk
            </motion.span>
          </Link>
        </motion.div>

        {/* Pencil doodle label */}
        <motion.p
          variants={fadeUp}
          custom={4}
          className="font-hand text-text-muted text-sm mt-8"
        >
          ← sketched this error myself
        </motion.p>
      </motion.div>
    </section>
  );
}
