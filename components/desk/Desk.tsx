"use client";

import { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import DeskItem from "./DeskItem";
import CoffeeMug from "./CoffeeMug";
import StickyNote from "./StickyNote";
import GalleryModal from "@/components/modals/GalleryModal";
import BrewWidget from "@/components/modals/BrewWidget";
import ContactDrawer from "@/components/ContactDrawer";
import { staggerContainer, fadeUp } from "@/lib/animations";
import site from "@/lib/content/site";
import brew from "@/lib/content/brew";
import { useAppState } from "@/lib/app-state";

type ActiveModal = "gallery" | "brew" | "contact" | null;

/* ── Polished 3-D style SVG icons ─────────────────────────────────────────── */

function SketchbookIcon() {
  return (
    <svg viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-auto sm:w-16 md:w-[72px] drop-shadow-lg" aria-hidden="true">
      {/* Stack of pages */}
      <rect x="14" y="10" width="50" height="66" rx="3" fill="color-mix(in srgb, var(--cream) 12%, transparent)" />
      <rect x="12" y="7" width="50" height="66" rx="3" fill="color-mix(in srgb, var(--cream) 18%, transparent)" />
      {/* Main cover */}
      <rect x="10" y="4" width="50" height="70" rx="4" fill="color-mix(in srgb, var(--cream) 26%, transparent)"
        stroke="color-mix(in srgb, var(--cream-dim) 35%, transparent)" strokeWidth="1" />
      {/* Spine */}
      <rect x="10" y="4" width="10" height="70" rx="2" fill="color-mix(in srgb, var(--amber-glow) 22%, transparent)" />
      {/* Spiral holes on spine */}
      {[14, 24, 34, 44, 54, 64].map((y) => (
        <circle key={y} cx="15" cy={y} r="2.5"
          fill="var(--bg)"
          stroke="color-mix(in srgb, var(--amber-glow) 50%, transparent)" strokeWidth="1" />
      ))}
      {/* Page lines */}
      <line x1="25" y1="22" x2="54" y2="22" stroke="color-mix(in srgb, var(--border-col) 60%, transparent)" strokeWidth="1" />
      <line x1="25" y1="30" x2="52" y2="30" stroke="color-mix(in srgb, var(--border-col) 60%, transparent)" strokeWidth="1" />
      <line x1="25" y1="38" x2="54" y2="38" stroke="color-mix(in srgb, var(--border-col) 60%, transparent)" strokeWidth="1" />
      {/* Pencil sketch — a face */}
      <circle cx="39" cy="53" r="10" stroke="color-mix(in srgb, var(--amber-glow) 45%, transparent)" strokeWidth="1.5" fill="none" />
      <path d="M35 51 Q39 47 43 51" stroke="color-mix(in srgb, var(--amber-glow) 45%, transparent)"
        strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <circle cx="36" cy="55" r="1.2" fill="color-mix(in srgb, var(--amber-glow) 40%, transparent)" />
      <circle cx="42" cy="55" r="1.2" fill="color-mix(in srgb, var(--amber-glow) 40%, transparent)" />
      <path d="M36 59 Q39 62 42 59" stroke="color-mix(in srgb, var(--amber-glow) 40%, transparent)"
        strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Top shine */}
      <rect x="10" y="4" width="50" height="3" rx="2"
        fill="color-mix(in srgb, white 12%, transparent)" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-auto sm:w-16 md:w-[72px] drop-shadow-lg" aria-hidden="true">
      {/* Screen back */}
      <rect x="10" y="2" width="60" height="42" rx="4"
        fill="color-mix(in srgb, var(--surface-raised) 90%, transparent)"
        stroke="color-mix(in srgb, var(--border-col) 80%, transparent)" strokeWidth="1.5" />
      {/* Screen bezel */}
      <rect x="14" y="6" width="52" height="34" rx="2"
        fill="color-mix(in srgb, var(--amber-glow) 6%, transparent)"
        stroke="color-mix(in srgb, var(--amber-glow) 20%, transparent)" strokeWidth="1" />
      {/* Code on screen */}
      <rect x="18" y="11" width="22" height="2" rx="1" fill="color-mix(in srgb, var(--amber-glow) 55%, transparent)" />
      <rect x="20" y="16" width="30" height="2" rx="1" fill="color-mix(in srgb, var(--text-muted) 60%, transparent)" />
      <rect x="20" y="21" width="24" height="2" rx="1" fill="color-mix(in srgb, var(--text-muted) 50%, transparent)" />
      <rect x="20" y="26" width="28" height="2" rx="1" fill="color-mix(in srgb, var(--text-muted) 40%, transparent)" />
      <rect x="20" y="31" width="18" height="2" rx="1" fill="color-mix(in srgb, var(--amber-glow) 35%, transparent)" />
      {/* Cursor blink */}
      <rect x="39" y="31" width="1.5" height="8" rx="0.5" fill="color-mix(in srgb, var(--amber-glow) 70%, transparent)" />
      {/* Camera dot */}
      <circle cx="40" cy="4.5" r="1.5" fill="color-mix(in srgb, var(--text-muted) 50%, transparent)" />
      {/* Hinge */}
      <rect x="8" y="43" width="64" height="3" rx="1"
        fill="color-mix(in srgb, var(--surface-raised) 80%, transparent)" />
      {/* Base */}
      <rect x="4" y="46" width="72" height="9" rx="4"
        fill="color-mix(in srgb, var(--surface-raised) 90%, transparent)"
        stroke="color-mix(in srgb, var(--border-col) 60%, transparent)" strokeWidth="1" />
      {/* Trackpad */}
      <rect x="28" y="49" width="24" height="4" rx="2"
        fill="color-mix(in srgb, var(--border-col) 70%, transparent)" />
      {/* Screen top shine */}
      <rect x="14" y="6" width="52" height="3" rx="1"
        fill="color-mix(in srgb, white 8%, transparent)" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-auto sm:w-16 md:w-[72px] drop-shadow-lg" aria-hidden="true">
      {/* Shadow */}
      <rect x="6" y="8" width="64" height="44" rx="5"
        fill="color-mix(in srgb, var(--amber-glow) 8%, transparent)" />
      {/* Envelope body */}
      <rect x="4" y="6" width="64" height="44" rx="5"
        fill="color-mix(in srgb, var(--amber-glow) 14%, transparent)"
        stroke="color-mix(in srgb, var(--amber-glow) 40%, transparent)" strokeWidth="1.5" />
      {/* Envelope flap (top) */}
      <path d="M4 11 L36 32 L68 11" stroke="color-mix(in srgb, var(--amber-glow) 40%, transparent)"
        strokeWidth="1.5" fill="none" />
      {/* Bottom fold lines */}
      <path d="M4 50 L26 32" stroke="color-mix(in srgb, var(--amber-glow) 30%, transparent)" strokeWidth="1" />
      <path d="M68 50 L46 32" stroke="color-mix(in srgb, var(--amber-glow) 30%, transparent)" strokeWidth="1" />
      {/* Wax seal dot */}
      <circle cx="36" cy="36" r="6"
        fill="color-mix(in srgb, var(--amber-glow) 60%, transparent)"
        stroke="color-mix(in srgb, var(--amber-glow) 80%, transparent)" strokeWidth="1" />
      <text x="36" y="40" textAnchor="middle"
        fontFamily="serif" fontSize="7"
        fill="color-mix(in srgb, var(--bg) 90%, transparent)">
        V
      </text>
      {/* Top shine */}
      <rect x="4" y="6" width="64" height="4" rx="2"
        fill="color-mix(in srgb, white 10%, transparent)" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg viewBox="0 0 60 76" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-auto sm:w-14 md:w-[60px] drop-shadow-lg" aria-hidden="true">
      {/* Paper stack effect */}
      <rect x="8" y="8" width="48" height="64" rx="3" fill="var(--surface)" />
      <rect x="6" y="5" width="48" height="64" rx="3" fill="var(--surface)"
        stroke="color-mix(in srgb, var(--border-col) 70%, transparent)" strokeWidth="1" />
      {/* Main sheet */}
      <rect x="4" y="2" width="48" height="64" rx="4" fill="var(--surface-raised)"
        stroke="color-mix(in srgb, var(--border-col) 90%, transparent)" strokeWidth="1.5" />
      {/* Clip at top */}
      <rect x="18" y="0" width="20" height="6" rx="2"
        fill="color-mix(in srgb, var(--amber-glow) 70%, transparent)"
        stroke="color-mix(in srgb, var(--amber-glow) 90%, transparent)" strokeWidth="0.5" />
      {/* Avatar placeholder */}
      <circle cx="14" cy="20" r="8"
        fill="color-mix(in srgb, var(--amber-glow) 15%, transparent)"
        stroke="color-mix(in srgb, var(--amber-glow) 30%, transparent)" strokeWidth="1" />
      <circle cx="14" cy="18" r="3.5" fill="color-mix(in srgb, var(--amber-glow) 25%, transparent)" />
      <path d="M7 26 Q14 22 21 26" fill="color-mix(in srgb, var(--amber-glow) 20%, transparent)" />
      {/* Name lines */}
      <rect x="26" y="14" width="22" height="3" rx="1.5" fill="var(--text-secondary)" />
      <rect x="26" y="20" width="16" height="2" rx="1" fill="var(--text-muted)" />
      {/* Divider */}
      <line x1="8" y1="34" x2="48" y2="34" stroke="color-mix(in srgb, var(--border-col) 80%, transparent)" strokeWidth="1" />
      {/* Content lines */}
      <rect x="8" y="39" width="36" height="2" rx="1" fill="var(--text-muted)" />
      <rect x="8" y="45" width="32" height="2" rx="1" fill="var(--text-muted)" />
      <rect x="8" y="51" width="28" height="2" rx="1" fill="var(--text-muted)" />
      {/* CTA button */}
      <rect x="8" y="57" width="22" height="6" rx="3"
        fill="color-mix(in srgb, var(--amber-glow) 70%, transparent)" />
      {/* Top shine */}
      <rect x="4" y="2" width="48" height="3" rx="1"
        fill="color-mix(in srgb, white 10%, transparent)" />
    </svg>
  );
}

/* ── Main Desk component ──────────────────────────────────────────────────── */

export default function Desk() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const router = useRouter();
  const { openModal, closeModal } = useAppState();

  // Sync modal open state with context (so NavBar can fade out)
  useEffect(() => {
    if (activeModal !== null) {
      openModal();
    } else {
      closeModal();
    }
  }, [activeModal, openModal, closeModal]);

  const open = (m: ActiveModal) => setActiveModal(m);
  const close = () => setActiveModal(null);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-10 md:py-16 overflow-hidden">

      {/* ── Ambient radial glow ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 65%, color-mix(in srgb, var(--amber-glow) 9%, transparent) 0%, transparent 70%)" }} />

      {/* ── Hero copy ── */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible"
        className="relative z-10 text-center mb-8 md:mb-12 px-2">
        <motion.p variants={fadeUp} custom={0}
          className="font-mono text-xs md:text-sm tracking-widest uppercase mb-3"
          style={{ color: "var(--amber-glow)" }}>
          pull up a chair
        </motion.p>
        <motion.h1 variants={fadeUp} custom={1}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4"
          style={{ color: "var(--text-primary)" }}>
          Hey, I&apos;m{" "}
          <span className="font-hand" style={{ color: "var(--amber-glow)" }}>{site.name}</span>
        </motion.h1>
        <motion.p variants={fadeUp} custom={2}
          className="text-base md:text-lg max-w-md mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}>
          {site.tagline} {site.bio}
        </motion.p>
      </motion.div>

      {/* ── 3-D Desk ── */}
      <div className="relative z-10 w-full max-w-3xl px-2">

        {/* Desk surface — top face */}
        <div
          className="relative rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-10"
          style={{
            background: "linear-gradient(160deg, color-mix(in srgb, var(--surface-raised) 95%, var(--amber-glow) 5%) 0%, color-mix(in srgb, var(--surface) 90%, var(--amber-dim) 10%) 60%, color-mix(in srgb, var(--bg) 95%, transparent) 100%)",
            boxShadow: "0 2px 0 0 color-mix(in srgb, white 8%, transparent) inset, 0 -1px 0 0 rgba(0,0,0,0.3) inset, 0 12px 40px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25)",
            border: "1px solid color-mix(in srgb, var(--border-col) 80%, transparent)",
          }}
        >
          {/* Top-edge highlight line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl md:rounded-t-3xl pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent 5%, color-mix(in srgb, white 18%, transparent) 50%, transparent 95%)" }}
            aria-hidden="true" />

          {/* Subtle wood-grain overlay */}
          <svg className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl opacity-[0.03] pointer-events-none"
            aria-hidden="true">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          {/* Grid of items — 2 cols mobile, 3 cols md+ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 place-items-center">

            {/* ① Sketchbook */}
            <DeskItem index={0} label="Open creative gallery" tooltip="✏️ flip through the sketchbook"
              onClick={() => open("gallery")}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <SketchbookIcon />
                <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Sketchbook</span>
              </div>
            </DeskItem>

            {/* ② Coffee Mug */}
            {brew.enabled && (
              <DeskItem index={1} label="Open daily brew widget" tooltip={`☕ today's cup is a ${brew.drink.toLowerCase()}`}
                onClick={() => open("brew")}>
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <CoffeeMug size={64} className="w-14 h-auto sm:w-16 md:w-[68px] drop-shadow-lg" />
                  <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Daily Brew</span>
                </div>
              </DeskItem>
            )}

            {/* ③ Laptop / Projects */}
            <DeskItem index={2} label="Browse projects" tooltip="💻 things I've shipped"
              onClick={() => router.push("/projects")}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <LaptopIcon />
                <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Projects</span>
              </div>
            </DeskItem>

            {/* ④ Sticky Note / Now */}
            <DeskItem index={3} label="View now page" tooltip="📌 what I'm up to right now"
              onClick={() => router.push("/now")}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <div className="w-14 sm:w-16 md:w-[68px] drop-shadow-lg">
                  <StickyNote text="/now" />
                </div>
                <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Now</span>
              </div>
            </DeskItem>

            {/* ⑤ Contact — envelope */}
            <DeskItem index={4} label="Open contact drawer" tooltip="📬 launch a signal"
              onClick={() => open("contact")}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <EnvelopeIcon />
                <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Contact</span>
              </div>
            </DeskItem>

            {/* ⑥ Résumé */}
            <DeskItem index={5} label="View résumé" tooltip="📄 experience & timeline"
              onClick={() => router.push("/resume")}>
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <ResumeIcon />
                <span className="font-hand text-sm md:text-base" style={{ color: "var(--cream-dim)" }}>Résumé</span>
              </div>
            </DeskItem>

          </div>

          {/* Desk label */}
          <div className="mt-8 md:mt-10 flex justify-center">
            <p className="font-hand text-sm" style={{ color: "var(--text-muted)" }}>
              hover to explore · click to open
            </p>
          </div>
        </div>

        {/* ── 3-D desk front face (creates depth illusion) ── */}
        <div
          className="h-4 md:h-5 rounded-b-xl md:rounded-b-2xl mx-1"
          style={{
            background: "linear-gradient(180deg, color-mix(in srgb, var(--surface) 60%, black) 0%, color-mix(in srgb, var(--bg) 80%, black) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
            borderLeft: "1px solid color-mix(in srgb, var(--border-col) 30%, transparent)",
            borderRight: "1px solid color-mix(in srgb, var(--border-col) 30%, transparent)",
            borderBottom: "1px solid color-mix(in srgb, var(--border-col) 20%, transparent)",
          }}
          aria-hidden="true"
        />

        {/* ── Desk legs ── */}
        <div className="flex justify-between px-12 sm:px-20" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i}
              className="w-3 h-8 md:h-10 rounded-b-sm"
              style={{
                background: "linear-gradient(180deg, color-mix(in srgb, var(--surface-raised) 80%, black) 0%, color-mix(in srgb, var(--bg) 60%, black) 100%)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              }}
            />
          ))}
        </div>

        {/* Floor shadow */}
        <div
          className="h-3 mx-6 sm:mx-12 rounded-full mt-1 blur-md"
          style={{ background: "rgba(0,0,0,0.35)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {activeModal === "gallery" && <GalleryModal onClose={close} />}
        {activeModal === "brew" && <BrewWidget onClose={close} />}
        {activeModal === "contact" && <ContactDrawer onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
