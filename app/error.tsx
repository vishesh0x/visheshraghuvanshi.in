"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 md:px-6 text-center">
      {/* Spilled coffee animation */}
      <div className="relative mb-10 flex justify-center">
        {/* Mug tilting */}
        <motion.div
          initial={{ rotate: 0, y: 0 }}
          animate={{ rotate: 95, y: 20 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom center" }}
          className="relative z-10"
        >
          <svg width="80" height="90" viewBox="0 0 80 90" fill="none" aria-hidden="true">
            <rect x="16" y="38" width="44" height="30" rx="6" fill="#2a2420" stroke="#4a3828" strokeWidth="2" />
            <ellipse cx="38" cy="41" rx="18" ry="5" fill="#4a2e1a" />
            <rect x="16" y="35" width="44" height="8" rx="4" fill="#332820" stroke="#4a3828" strokeWidth="2" />
            <path d="M60 46 Q72 46 72 54 Q72 62 60 62" stroke="#4a3828" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <ellipse cx="38" cy="70" rx="26" ry="5" fill="#1e1c19" stroke="#3a3530" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Coffee spill puddle */}
        <motion.div
          initial={{ scaleX: 0, scaleY: 0, opacity: 0 }}
          animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center top" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <svg width="160" height="40" viewBox="0 0 160 40" fill="none" aria-hidden="true">
            <ellipse cx="80" cy="20" rx="70" ry="18" fill="#3a2010" opacity="0.8" />
            <ellipse cx="80" cy="20" rx="50" ry="12" fill="#4a2e18" opacity="0.6" />
            {/* Steam/drips */}
            <path d="M30 10 Q40 0 50 10" stroke="#5a3820" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
            <path d="M110 8 Q120 -2 130 8" stroke="#5a3820" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4" />
          </svg>
        </motion.div>
      </div>

      {/* Copy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="max-w-sm"
      >
        <h1 className="font-hand text-3xl md:text-4xl mb-3" style={{ color: "var(--cream)" }}>
          We spilled the coffee.
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-2" style={{ color: "var(--text-secondary)" }}>
          Server error — something went wrong on our end. The coffee is on us.
        </p>
        {error.digest && (
          <p className="font-mono text-xs mb-8" style={{ color: "var(--text-muted)" }}>
            error id: {error.digest}
          </p>
        )}
        {!error.digest && <div className="mb-8" />}

        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
          className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-medium text-sm"
          style={{
            background: "linear-gradient(135deg, var(--amber-glow), var(--amber-soft))",
            color: "var(--bg)",
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Brew a fresh cup
        </motion.button>
      </motion.div>
    </section>
  );
}
