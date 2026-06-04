"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import site from "@/lib/content/site";
import { useAppState } from "@/lib/app-state";

const links = [
  { href: "/", label: "Desk" },
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Résumé" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { modalOpen } = useAppState();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 px-4 pt-4"
        animate={{
          opacity: modalOpen ? 0 : 1,
          y: modalOpen ? -12 : 0,
          pointerEvents: modalOpen ? "none" : "auto",
        }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <nav
          className="mx-auto max-w-4xl glass rounded-2xl px-4 py-2.5 flex items-center justify-between gap-4"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Go to homepage"
            onClick={closeMobile}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
              style={{
                background: "rgba(var(--amber-glow-rgb, 217,124,42), 0.12)",
                border: "1px solid var(--amber-glow)",
                borderColor: "color-mix(in srgb, var(--amber-glow) 40%, transparent)",
              }}
            >
              <Pencil className="w-3.5 h-3.5" style={{ color: "var(--amber-glow)" }} />
            </span>
            <span
              className="font-hand text-xl tracking-wide"
              style={{ color: "var(--cream)" }}
            >
              {site.name.toLowerCase()}
            </span>
          </Link>

          {/* ── Desktop links ─────────────────────── */}
          <ul className="hidden md:flex items-center gap-1 flex-1 justify-center" role="list">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="relative px-3 py-1.5 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{
                      color: active ? "var(--cream)" : "var(--text-secondary)",
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "var(--nav-pill-bg)",
                          border: "1px solid var(--nav-pill-border)",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right controls ─────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-200"
              style={{
                borderColor: "var(--border-col)",
                background: "var(--surface-raised)",
                color: "var(--text-secondary)",
              }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile dropdown menu ────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto max-w-4xl mt-2 glass rounded-2xl overflow-hidden"
            >
              <ul className="flex flex-col py-2" role="list">
                {links.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeMobile}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors duration-150"
                        style={{
                          color: active ? "var(--amber-glow)" : "var(--text-primary)",
                          background: active ? "var(--nav-pill-bg)" : "transparent",
                        }}
                        aria-current={active ? "page" : undefined}
                      >
                        {active && (
                          <span
                            className="w-1 h-4 rounded-full"
                            style={{ background: "var(--amber-glow)" }}
                          />
                        )}
                        {!active && <span className="w-1" />}
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 md:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
