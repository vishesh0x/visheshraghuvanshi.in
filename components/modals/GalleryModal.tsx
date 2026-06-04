"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { overlayVariants, modalVariants } from "@/lib/animations";
import gallery from "@/lib/content/gallery";
import { useState, useEffect, useCallback } from "react";

interface GalleryModalProps {
  onClose: () => void;
}

export default function GalleryModal({ onClose }: GalleryModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox  = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  const activeDraw = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  return (
    <>
      {/* ── Gallery overlay ──────────────────────────────────────────────── */}
      <motion.div
        key="gallery-overlay"
        variants={overlayVariants}
        initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 z-[55] backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={lightboxIndex !== null ? closeLightbox : onClose}
        aria-hidden="true"
      />

      {/* ── Gallery modal ─────────────────────────────────────────────────── */}
      <motion.div
        key="gallery-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Creative Gallery"
        variants={modalVariants}
        initial="hidden" animate="visible" exit="exit"
        className="fixed inset-3 md:inset-8 lg:inset-16 z-[60] glass rounded-2xl md:rounded-3xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 shrink-0"
          style={{ borderBottom: "1px solid var(--border-col)" }}
        >
          <div>
            <h2 className="font-hand text-2xl md:text-3xl" style={{ color: "var(--cream)" }}>
              The Sketchbook
            </h2>
            <p className="font-mono text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              selected works · ink, graphite &amp; curiosity
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0"
            style={{ borderColor: "var(--border-col)", color: "var(--text-secondary)" }}
            aria-label="Close gallery"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <div
                className="w-16 h-16 rounded-2xl border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: "var(--border-col)" }}
              >
                <ImageIcon className="w-7 h-7" style={{ color: "var(--text-muted)" }} />
              </div>
              <div>
                <p className="font-hand text-2xl" style={{ color: "var(--text-secondary)" }}>
                  Coming soon
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  Add drawings to <code className="font-mono text-xs">lib/content/gallery.ts</code>
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {gallery.map((drawing, i) => (
                <motion.article
                  key={drawing.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="group relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden border cursor-pointer"
                  style={{ background: "var(--surface)", borderColor: "var(--border-col)" }}
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${drawing.title} full size`}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
                >
                  {/* Image or gradient placeholder */}
                  {drawing.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={drawing.imageUrl}
                      alt={drawing.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${drawing.gradient} transition-opacity duration-300 group-hover:opacity-70`} />
                      <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
                        <pattern id={`hatch-${drawing.id}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--cream-dim)" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#hatch-${drawing.id})`} />
                      </svg>
                    </>
                  )}

                  {/* Hover info + zoom hint */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h3 className="font-hand text-base md:text-lg leading-tight" style={{ color: "var(--cream)" }}>
                          {drawing.title}
                        </h3>
                        <p className="font-mono text-[10px] md:text-xs mt-0.5" style={{ color: "var(--cream-dim)" }}>
                          {drawing.medium} · {drawing.year}
                        </p>
                      </div>
                      <ZoomIn className="w-4 h-4 shrink-0" style={{ color: "var(--cream-dim)" }} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && activeDraw && (
          <>
            {/* Lightbox backdrop — above the gallery modal */}
            <motion.div
              key="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70]"
              style={{ background: "rgba(0,0,0,0.92)" }}
              onClick={closeLightbox}
              aria-hidden="true"
            />

            {/* Close button */}
            <motion.button
              key="lightbox-close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="fixed top-4 right-4 z-[80] w-10 h-10 rounded-full border flex items-center justify-center backdrop-blur-sm"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
              }}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Image + caption */}
            <motion.div
              key={`lightbox-img-${lightboxIndex}`}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-[75] flex flex-col items-center justify-center p-4 md:p-12 pointer-events-none"
            >
              {/* Image — fits viewport, preserves aspect ratio */}
              <div className="relative w-full h-full flex items-center justify-center">
                {activeDraw.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeDraw.imageUrl}
                    alt={activeDraw.title}
                    className="max-w-full max-h-full rounded-xl object-contain shadow-2xl"
                    style={{ maxHeight: "calc(100vh - 120px)" }}
                    draggable={false}
                  />
                ) : (
                  /* No image — enlarged gradient card */
                  <div
                    className={`w-full max-w-lg aspect-[4/5] rounded-2xl bg-gradient-to-br ${activeDraw.gradient} flex items-end p-8`}
                  >
                    <p className="font-hand text-3xl" style={{ color: "var(--cream)" }}>
                      {activeDraw.title}
                    </p>
                  </div>
                )}
              </div>

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 text-center pointer-events-auto"
              >
                <p className="font-hand text-xl md:text-2xl" style={{ color: "white" }}>
                  {activeDraw.title}
                </p>
                <p className="font-mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {activeDraw.medium} · {activeDraw.year}
                </p>
              </motion.div>
            </motion.div>

            {/* Prev / Next arrows — only if multiple images */}
            {gallery.length > 1 && (
              <>
                <motion.button
                  key="lightbox-prev"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-[80] w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    background: "rgba(0,0,0,0.45)",
                    color: "white",
                  }}
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  key="lightbox-next"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[80] w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center backdrop-blur-sm transition-colors"
                  style={{
                    borderColor: "rgba(255,255,255,0.15)",
                    background: "rgba(0,0,0,0.45)",
                    color: "white",
                  }}
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                {/* Image counter */}
                <motion.div
                  key="lightbox-counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] font-mono text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {lightboxIndex + 1} / {gallery.length}
                </motion.div>
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
