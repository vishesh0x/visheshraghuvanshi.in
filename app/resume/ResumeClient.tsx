"use client";

import { motion } from "framer-motion";
import {
  Download, ExternalLink, Briefcase, GraduationCap,
  Code2, GitBranch, Globe, Mail, Phone, Link2, Trophy
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { timeline, skills } from "@/lib/content/resume";
import { projects } from "@/lib/content/projects";
import { staggerContainer, fadeUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

// ── Type helpers ──────────────────────────────────────────────────────────────

const typeIcon: Record<string, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  freelance: Code2,
};

const typeColorClass: Record<string, string> = {
  work:      "text-amber-400 border-amber-400/40 bg-amber-400/10",
  education: "text-blue-400  border-blue-400/40  bg-blue-400/10",
  freelance: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
};

const skillCategoryStyle: Record<string, React.CSSProperties> = {
  language:  { borderColor: "color-mix(in srgb, var(--amber-glow) 30%, transparent)",  color: "var(--amber-glow)",  background: "color-mix(in srgb, var(--amber-glow) 8%, transparent)" },
  framework: { borderColor: "rgba(96,165,250,0.3)",  color: "rgb(147,197,253)", background: "rgba(96,165,250,0.08)" },
  tool:      { borderColor: "rgba(52,211,153,0.3)",  color: "rgb(110,231,183)", background: "rgba(52,211,153,0.08)" },
  design:    { borderColor: "rgba(196,132,252,0.3)", color: "rgb(216,180,254)", background: "rgba(196,132,252,0.08)" },
};

const GRADIENTS = [
  "linear-gradient(135deg, hsl(28,70%,22%) 0%, hsl(20,60%,14%) 100%)",
  "linear-gradient(135deg, hsl(210,60%,18%) 0%, hsl(230,50%,12%) 100%)",
  "linear-gradient(135deg, hsl(160,55%,16%) 0%, hsl(180,45%,10%) 100%)",
  "linear-gradient(135deg, hsl(280,45%,18%) 0%, hsl(260,40%,12%) 100%)",
];

function ProjectThumb({ src, alt, index }: { src: string; alt: string; index: number }) {
  const [failed, setFailed] = useState(!src);
  if (failed || !src) return (
    <div className="w-full h-full" style={{ background: GRADIENTS[index % GRADIENTS.length] }} aria-hidden="true" />
  );
  return (
    <Image src={src} alt={alt} fill className="object-cover" sizes="80px" onError={() => setFailed(true)} />
  );
}

// ── Professional Summary ──────────────────────────────────────────────────────

const SUMMARY =
  "Backend engineer with a sharp focus on correctness and scale. I build systems that handle " +
  "concurrency without breaking — APIs engineered to stay consistent under load, distributed " +
  "architectures designed to fail gracefully, and data pipelines that don't lose a record. " +
  "My stack centres on Java and Spring Boot: from JWT-secured REST APIs and Hibernate-optimised " +
  "queries to distributed transaction patterns with Kafka and Redis. Every project I ship is " +
  "a deliberate study in the trade-offs that separate systems that work from systems that hold.";

// ── Obfuscated contact — decoded client-side only, invisible to crawlers ──────

// atob("KzkxLTg5ODkyMDIxNDc=") === "+91-8989202147"
// atob("bWVAdmlzaGVzaHJhZ2h1dmFuc2hpLmlu") === "me@visheshraghuvanshi.in"
const B64_PHONE = "KzkxLTg5ODkyMDIxNDc=";
const B64_EMAIL = "bWVAdmlzaGVzaHJhZ2h1dmFuc2hpLmlu";

function ObfuscatedContactItem({
  b64,
  prefix,
  icon,
}: {
  b64: string;
  prefix: string;
  icon: React.ReactNode;
}) {
  const [decoded, setDecoded] = useState<string | null>(null);

  useEffect(() => {
    try { setDecoded(atob(b64)); } catch { /* noop */ }
  }, [b64]);

  if (!decoded) {
    return (
      <span className="flex items-center gap-2 text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
        <span style={{ color: "var(--amber-glow)" }}>{icon}</span>
        <span style={{ color: "var(--text-muted)", letterSpacing: "0.05em" }}>••••••••••</span>
      </span>
    );
  }

  return (
    <a
      href={`${prefix}${decoded}`}
      target={prefix === "mailto:" || prefix === "tel:" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs font-mono transition-opacity hover:opacity-70 group"
      style={{ color: "var(--text-secondary)" }}
    >
      <span className="shrink-0" style={{ color: "var(--amber-glow)" }}>{icon}</span>
      <span className="truncate group-hover:underline underline-offset-2">{decoded}</span>
    </a>
  );
}

function ContactItem({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs font-mono truncate transition-opacity hover:opacity-70 group"
      style={{ color: "var(--text-secondary)" }}>
      <span className="shrink-0" style={{ color: "var(--amber-glow)" }}>{icon}</span>
      <span className="truncate group-hover:underline underline-offset-2">{label}</span>
    </a>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
        {children}
      </h2>
      <div className="flex-1 h-px" style={{ background: "var(--border-col)" }} aria-hidden="true" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ResumeClient() {
  return (
    <section className="min-h-[calc(100vh-5rem)] px-4 md:px-6 py-8 md:py-12 max-w-3xl mx-auto">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <motion.p variants={fadeUp} custom={0}
            className="font-mono text-xs md:text-sm tracking-widest uppercase mb-3"
            style={{ color: "var(--amber-glow)" }}>
            experience &amp; background
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
            style={{ color: "var(--text-primary)" }}>
            Résumé
          </motion.h1>
          <motion.p variants={fadeUp} custom={2}
            className="mt-3 leading-relaxed text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}>
            The professional bits. More interesting conversations start with the personal ones.
          </motion.p>
        </div>

        <motion.div variants={fadeUp} custom={3} className="shrink-0">
          <a href="/resume.pdf" download
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-medium text-sm border-2 transition-all duration-200"
            style={{ borderColor: "color-mix(in srgb, var(--amber-glow) 50%, transparent)", color: "var(--amber-glow)" }}
            aria-label="Download résumé as PDF">
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </motion.div>
      </motion.div>

      {/* ── Contact info card ────────────────────────────────────────────────── */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-10 md:mb-12">
        <motion.div variants={fadeUp} custom={0}
          className="rounded-xl md:rounded-2xl border p-5 md:p-6"
          style={{ background: "var(--surface)", borderColor: "var(--border-col)" }}>
          <h2 className="text-lg md:text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Vishesh Kumar
          </h2>
          <p className="text-sm mb-4 font-mono" style={{ color: "var(--amber-glow)" }}>
            Backend Software Engineer
          </p>

          {/* 2-col grid — email & phone decoded client-side only */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <ObfuscatedContactItem b64={B64_EMAIL} prefix="mailto:" icon={<Mail className="w-3.5 h-3.5" />} />
            <ObfuscatedContactItem b64={B64_PHONE} prefix="tel:"    icon={<Phone className="w-3.5 h-3.5" />} />
            <ContactItem icon={<Globe className="w-3.5 h-3.5" />} href="https://visheshraghuvanshi.in"    label="visheshraghuvanshi.in" />
            <ContactItem icon={<Link2 className="w-3.5 h-3.5" />} href="https://linkedin.com/in/vishesh0x" label="linkedin.com/in/vishesh0x" />
            <ContactItem icon={<GitBranch className="w-3.5 h-3.5" />} href="https://github.com/vishesh0x"  label="github.com/vishesh0x" />
            <ContactItem icon={<Trophy className="w-3.5 h-3.5" />}    href="https://leetcode.com/u/visheshkr" label="leetcode.com/u/visheshkr" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Professional summary ─────────────────────────────────────────────── */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mb-12 md:mb-16">
        <SectionHeading>Professional Summary</SectionHeading>
        <motion.p variants={fadeUp} custom={0}
          className="text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}>
          {SUMMARY}
        </motion.p>
      </motion.div>

      {/* ── Education timeline ───────────────────────────────────────────────── */}
      {timeline.length > 0 && (
        <div className="mb-12 md:mb-16">
          <SectionHeading>Education</SectionHeading>

          <div className="relative">
            <div className="absolute left-4 md:left-6 top-3 bottom-3 w-px"
              style={{ background: "linear-gradient(180deg, transparent, color-mix(in srgb, var(--amber-glow) 30%, transparent), color-mix(in srgb, var(--amber-glow) 15%, transparent), transparent)" }}
              aria-hidden="true" />

            <motion.div variants={staggerContainer} initial="hidden" animate="visible"
              className="space-y-5 md:space-y-7 pl-12 md:pl-16">
              {timeline.map((entry, i) => {
                const Icon = typeIcon[entry.type] ?? Briefcase;
                return (
                  <motion.article key={entry.id} variants={fadeUp} custom={i} className="relative">
                    <div className={`absolute -left-8 md:-left-10 top-1 w-7 h-7 md:w-8 md:h-8 rounded-full border flex items-center justify-center ${typeColorClass[entry.type]}`}
                      aria-hidden="true">
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>

                    <div className="rounded-xl md:rounded-2xl border p-4 md:p-6"
                      style={{ background: "var(--surface)", borderColor: "var(--border-col)" }}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-base md:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                            {entry.role}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                            {entry.companyUrl ? (
                              <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer"
                                className="text-sm font-medium flex items-center gap-1"
                                style={{ color: "var(--amber-glow)" }}>
                                {entry.company}<ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-sm font-medium" style={{ color: "var(--amber-glow)" }}>
                                {entry.company}
                              </span>
                            )}
                            <span style={{ color: "var(--text-muted)" }}>·</span>
                            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{entry.location}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                          {entry.period}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                        {entry.description}
                      </p>

                      <ul className="space-y-1.5 mb-3" role="list">
                        {entry.highlights.map((h, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                            <span className="font-mono text-xs mt-0.5 shrink-0"
                              style={{ color: "color-mix(in srgb, var(--amber-glow) 60%, transparent)" }}>›</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {entry.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.skills.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded-md font-mono text-xs border"
                              style={{ borderColor: "var(--border-col)", color: "var(--text-muted)", background: "var(--surface-raised)" }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Projects ────────────────────────────────────────────────────────── */}
      {projects.length > 0 && (
        <div className="mb-12 md:mb-16">
          <SectionHeading>Projects</SectionHeading>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="space-y-4 md:space-y-5">
            {projects.map((project, i) => (
              <motion.article key={project.id} variants={fadeUp} custom={i}
                className="rounded-xl md:rounded-2xl border overflow-hidden"
                style={{ background: "var(--surface)", borderColor: "var(--border-col)" }}>
                <div className="flex gap-4 p-4 md:p-5">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden shrink-0">
                    <ProjectThumb src={project.imageUrl} alt={project.title} index={i} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm md:text-base font-bold leading-snug" style={{ color: "var(--text-primary)" }}>
                        {project.title}
                        {project.featured && (
                          <span className="ml-2 text-xs font-mono px-1.5 py-0.5 rounded-full border"
                            style={{
                              borderColor: "color-mix(in srgb, var(--amber-glow) 30%, transparent)",
                              color: "var(--amber-glow)",
                              background: "color-mix(in srgb, var(--amber-glow) 8%, transparent)",
                            }}>★</span>
                        )}
                      </h3>
                      <span className="font-mono text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                        {project.year}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded font-mono text-[10px] border"
                          style={{ borderColor: "var(--border-col)", color: "var(--text-muted)", background: "var(--surface-raised)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-mono transition-colors hover:opacity-80"
                          style={{ color: "var(--text-secondary)" }}>
                          <GitBranch className="w-3 h-3" /> Source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-mono transition-colors hover:opacity-80"
                          style={{ color: "var(--text-secondary)" }}>
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Technical skills ─────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} className="mb-12 md:mb-16">
          <SectionHeading>Technical Skills</SectionHeading>

          <motion.p variants={fadeUp} custom={0} className="text-sm mb-6"
            style={{ color: "var(--text-secondary)" }}>
            Core stack and tools I work with or am actively learning. Dots = proficiency.
          </motion.p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeUp} custom={i * 0.4}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-mono border"
                style={skillCategoryStyle[skill.category] ?? skillCategoryStyle.tool}>
                {skill.name}
                <span className="flex gap-0.5" aria-label={`Proficiency: ${skill.level} out of 5`}>
                  {Array.from({ length: 5 }).map((_, d) => (
                    <span key={d} className="w-1 h-1 rounded-full"
                      style={{ background: "currentColor", opacity: d < skill.level ? 1 : 0.2 }} />
                  ))}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
