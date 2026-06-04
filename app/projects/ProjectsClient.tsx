"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, ExternalLink } from "lucide-react";
import { projects } from "@/lib/content/projects";
import { staggerContainer, fadeUp } from "@/lib/animations";

/** Gradient placeholder colours per card index */
const GRADIENTS = [
  "linear-gradient(135deg, hsl(28,70%,22%) 0%, hsl(20,60%,14%) 100%)",
  "linear-gradient(135deg, hsl(210,60%,18%) 0%, hsl(230,50%,12%) 100%)",
  "linear-gradient(135deg, hsl(160,55%,16%) 0%, hsl(180,45%,10%) 100%)",
  "linear-gradient(135deg, hsl(280,45%,18%) 0%, hsl(260,40%,12%) 100%)",
];

function ProjectImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        className="w-full h-full"
        style={{ background: GRADIENTS[index % GRADIENTS.length] }}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setFailed(true)}
    />
  );
}

export default function ProjectsClient() {
  return (
    <section className="min-h-[calc(100vh-5rem)] px-4 md:px-6 py-8 md:py-12 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10 md:mb-16">
        <motion.p variants={fadeUp} custom={0}
          className="font-mono text-xs md:text-sm tracking-widest uppercase mb-3"
          style={{ color: "var(--amber-glow)" }}>
          shipped &amp; open
        </motion.p>
        <motion.h1 variants={fadeUp} custom={1}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-none"
          style={{ color: "var(--text-primary)" }}>
          Projects
        </motion.h1>
        <motion.p variants={fadeUp} custom={2}
          className="text-base md:text-lg max-w-xl leading-relaxed"
          style={{ color: "var(--text-secondary)" }}>
          A selection of things I&apos;ve designed, built, and occasionally broken in production.
          Each one taught me something.
        </motion.p>
      </motion.div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center py-20">
          <p className="font-hand text-2xl" style={{ color: "var(--text-secondary)" }}>No projects yet</p>
          <p className="text-sm mt-2 font-mono" style={{ color: "var(--text-muted)" }}>
            Add entries to <code>lib/content/projects.ts</code>
          </p>
        </div>
      )}

      {/* Card grid — 1 col mobile, 2 col sm, 3 col lg */}
      {projects.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              custom={i}
              className="group relative flex flex-col rounded-2xl border overflow-hidden"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border-col)",
              }}
            >
              {/* ── Hero image ───────────────────────────── */}
              <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
                <ProjectImage
                  src={project.imageUrl}
                  alt={`${project.title} preview`}
                  index={i}
                />

                {/* Gradient overlay so text below reads well */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--surface) 95%, transparent) 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Featured badge — floats over the image */}
                {project.featured && (
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-mono border backdrop-blur-sm"
                    style={{
                      borderColor: "color-mix(in srgb, var(--amber-glow) 40%, transparent)",
                      color: "var(--amber-glow)",
                      background: "color-mix(in srgb, var(--bg) 70%, transparent)",
                    }}
                  >
                    ★ featured
                  </span>
                )}
              </div>

              {/* ── Card body ────────────────────────────── */}
              <div className="flex flex-col flex-1 p-5 md:p-6">
                {/* Year */}
                <span className="font-mono text-xs mb-2 block" style={{ color: "var(--text-muted)" }}>
                  {project.year}
                </span>

                <h2
                  className="text-lg md:text-xl font-bold mb-2 leading-snug transition-colors"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.title}
                </h2>

                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md font-mono text-xs border"
                      style={{
                        borderColor: "var(--border-col)",
                        color: "var(--text-muted)",
                        background: "var(--surface-raised)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2"
                  style={{ borderTop: "1px solid var(--border-col)" }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={`GitHub repo for ${project.title}`}
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-mono transition-colors hover:opacity-80"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={`Live site for ${project.title}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      private repo
                    </span>
                  )}
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--amber-glow) 6%, transparent) 0%, transparent 55%)" }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
