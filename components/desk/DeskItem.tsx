"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { deskItemVariants, elasticScale } from "@/lib/animations";

interface DeskItemProps {
  index?: number;
  label: string;
  tooltip: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export default function DeskItem({
  index = 0,
  label,
  tooltip,
  onClick,
  className = "",
  children,
}: DeskItemProps) {
  return (
    <motion.div
      custom={index}
      variants={deskItemVariants}
      initial="hidden"
      animate="visible"
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* Elastic scale wrapper */}
      <motion.div
        variants={elasticScale}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </motion.div>

      {/* Tooltip — hidden on touch/mobile, shown on hover for pointer devices */}
      <div
        role="tooltip"
        className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap
          pointer-events-none z-50 font-mono
          opacity-0 translate-y-2 scale-95
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
          transition-all duration-200
          hidden md:block"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--glass-border)",
          color: "var(--cream-dim)",
        }}
      >
        {tooltip}
        {/* Arrow */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid var(--glass-border)",
          }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
