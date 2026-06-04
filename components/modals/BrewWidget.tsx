"use client";

import { motion } from "framer-motion";
import { X, Coffee, Droplets, Clock } from "lucide-react";
import { overlayVariants, modalVariants } from "@/lib/animations";
import brew from "@/lib/content/brew";

interface BrewWidgetProps {
  onClose: () => void;
}

export default function BrewWidget({ onClose }: BrewWidgetProps) {
  return (
    <>
      {/* Overlay — z-[55] so it sits above navbar (z-40) */}
      <motion.div
        key="brew-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[55] backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Widget card — z-[60] so it sits above the overlay */}
      <motion.div
        key="brew-modal"
        role="dialog"
        aria-modal="true"
        aria-label="My Daily Brew"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[calc(100vw-2rem)] max-w-sm glass rounded-2xl md:rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-5 md:px-6 py-4 md:py-5 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--amber-glow) 20%, transparent), color-mix(in srgb, var(--surface) 80%, transparent))",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "color-mix(in srgb, var(--amber-glow) 70%, transparent)" }}
              >
                My Daily Brew
              </p>
              <h2 className="font-hand text-3xl md:text-4xl mt-1" style={{ color: "var(--cream)" }}>
                {brew.drink}
              </h2>
            </div>

            {/* ← Close button — must have explicit z-index above everything */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="relative z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0"
              style={{
                borderColor: "color-mix(in srgb, var(--border-col) 60%, transparent)",
                color: "var(--text-secondary)",
                background: "var(--surface-raised)",
              }}
              aria-label="Close brew widget"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Decorative mug bg */}
          <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none" aria-hidden="true">
            <Coffee className="w-28 h-28 md:w-32 md:h-32" style={{ color: "var(--amber-glow)" }} />
          </div>
        </div>

        {/* Details */}
        <div className="px-5 md:px-6 py-4 md:py-5 space-y-3 md:space-y-4">
          <Row icon={<Coffee className="w-4 h-4" />} label="Beans" value={brew.beans} />
          <Row icon={<Droplets className="w-4 h-4" />} label="Ratio" value={brew.ratio} />
          <Row icon={<Droplets className="w-4 h-4" />} label="Grind" value={brew.grind} />
          <Row icon={<Clock className="w-4 h-4" />} label="Pull time" value={brew.time} />

          {/* Tasting note */}
          <div className="pt-2" style={{ borderTop: "1px solid var(--border-col)" }}>
            <p className="font-mono text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
              tasting note
            </p>
            <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-primary)" }}>
              &ldquo;{brew.notes}&rdquo;
            </p>
          </div>

          {/* Mood tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>current mood:</span>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor: "color-mix(in srgb, var(--amber-glow) 30%, transparent)",
                color: "var(--amber-glow)",
                background: "color-mix(in srgb, var(--amber-glow) 10%, transparent)",
              }}
            >
              {brew.mood}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 md:px-6 pb-4 md:pb-5">
          <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>
            {brew.updatedAt}
          </p>
        </div>
      </motion.div>
    </>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0" style={{ color: "color-mix(in srgb, var(--amber-glow) 60%, transparent)" }}>
        {icon}
      </span>
      <div className="min-w-0">
        <span className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
        <p className="text-sm leading-snug mt-0.5" style={{ color: "var(--text-primary)" }}>{value}</p>
      </div>
    </div>
  );
}
