"use client";

import { motion } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import { overlayVariants, modalVariants } from "@/lib/animations";
import gallery from "@/lib/content/gallery";

interface GalleryModalProps {
  onClose: () => void;
}

export default function GalleryModal({ onClose }: GalleryModalProps) {
  return (
    <>
      {/* Overlay */}
      <motion.div
        key="gallery-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[55] backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        key="gallery-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Creative Gallery"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
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
            style={{
              borderColor: "var(--border-col)",
              color: "var(--text-secondary)",
            }}
            aria-label="Close gallery"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {gallery.length === 0 ? (
            /* Empty state */
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
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border-col)",
                  }}
                >
                  {/* Gradient / image */}
                  {drawing.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={drawing.imageUrl}
                      alt={drawing.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${drawing.gradient} transition-opacity duration-300 group-hover:opacity-70`} />
                      {/* Hatch texture */}
                      <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity" aria-hidden="true">
                        <pattern id={`hatch-${drawing.id}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--cream-dim)" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#hatch-${drawing.id})`} />
                      </svg>
                    </>
                  )}

                  {/* Hover info */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-hand text-base md:text-lg leading-tight" style={{ color: "var(--cream)" }}>
                      {drawing.title}
                    </h3>
                    <p className="font-mono text-[10px] md:text-xs mt-0.5" style={{ color: "var(--cream-dim)" }}>
                      {drawing.medium} · {drawing.year}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
