"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Mail, GitBranch, MessageCircle, Link2, ExternalLink } from "lucide-react";
import { overlayVariants, drawerVariants } from "@/lib/animations";
import site from "@/lib/content/site";

interface ContactDrawerProps {
  onClose: () => void;
}

type FormState = "idle" | "sending" | "sent" | "error";

// ── Obfuscated recipient ─────────────────────────────────────────────────────
// Stored as base64 so static crawlers can't harvest it.
// Decode only happens in-browser on form submit.
const RECIPIENT_B64 = "bWVAdmlzaGVzaHJhZ2h1dmFuc2hpLmlu";
function getRecipient(): string {
  if (typeof window === "undefined") return "";
  return atob(RECIPIENT_B64);
}
// ─────────────────────────────────────────────────────────────────────────────

/** Instagram icon — inline SVG since lucide-react doesn't ship it */
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Map platform name → icon element */
function PlatformIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p.includes("instagram")) return <InstagramIcon />;
  if (p.includes("github"))    return <GitBranch className="w-4 h-4" />;
  if (p.includes("twitter") || p.includes(" x")) return <MessageCircle className="w-4 h-4" />;
  if (p.includes("linkedin"))  return <Link2 className="w-4 h-4" />;
  if (p.includes("email") || p.includes("mail")) return <Mail className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
}

export default function ContactDrawer({ onClose }: ContactDrawerProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  // Only show socials with a non-empty href
  const activeSocials = site.socials.filter((s) => s.href.trim() !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Build the mailto URL — recipient is decoded from base64 at click time
    const to = getRecipient();
    const subject = encodeURIComponent(`Hey from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Vishesh,\n\n${form.message}\n\n—\nName:  ${form.name}\nEmail: ${form.email}`
    );

    // Small delay so the "Launching…" state is visible, then open mail client
    setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  };

  return (
    <>
      {/* Overlay — z-[55] sits above navbar (z-40) */}
      <motion.div
        key="contact-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[55] backdrop-blur-sm"
        style={{ background: "rgba(0,0,0,0.55)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — z-[60] sits above the overlay */}
      <motion.aside
        key="contact-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Contact drawer"
        variants={drawerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-md glass flex flex-col overflow-y-auto"
        style={{ borderLeft: "1px solid var(--glass-border)" }}
      >
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-6 shrink-0"
          style={{ borderBottom: "1px solid var(--border-col)" }}>
          <div className="flex items-start justify-between">
            <div className="pr-4">
              <p className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "color-mix(in srgb, var(--amber-glow) 70%, transparent)" }}>
                drop a line
              </p>
              <h2 className="font-hand text-3xl md:text-4xl mt-1" style={{ color: "var(--cream)" }}>
                Launch a signal
              </h2>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                I read every message. No auto-reply bots, just me.
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="mt-1 w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors"
              style={{
                borderColor: "var(--border-col)",
                color: "var(--text-secondary)",
                background: "var(--surface-raised)",
              }}
              aria-label="Close contact drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Social links — only shown if there are active socials */}
        {activeSocials.length > 0 && (
          <div className="px-6 md:px-8 py-5 md:py-6 shrink-0"
            style={{ borderBottom: "1px solid var(--border-col)" }}>
            <p className="font-mono text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              find me elsewhere
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {activeSocials.map(({ platform, href, handle }) => (
                <a
                  key={platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-200 group"
                  style={{ borderColor: "var(--border-col)", background: "var(--surface-raised)" }}
                  aria-label={`${platform}: ${handle}`}
                >
                  <span className="shrink-0 transition-colors"
                    style={{ color: "var(--text-secondary)" }}>
                    <PlatformIcon platform={platform} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate leading-tight"
                      style={{ color: "var(--text-secondary)" }}>
                      {platform}
                    </p>
                    <p className="font-mono text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                      {handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Message form */}
        <div className="flex-1 px-6 md:px-8 py-5 md:py-6">
          <p className="font-mono text-xs mb-4 md:mb-5" style={{ color: "var(--text-muted)" }}>
            or send a message directly
          </p>

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10 md:py-12 gap-4"
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "color-mix(in srgb, var(--amber-glow) 15%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--amber-glow) 30%, transparent)",
                }}
              >
                <Send className="w-6 h-6 md:w-7 md:h-7" style={{ color: "var(--amber-glow)" }} />
              </div>
              <div>
                <h3 className="font-hand text-2xl" style={{ color: "var(--cream)" }}>
                  Mail client opened! 🚀
                </h3>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                  Your email app should have launched with the message pre-filled.
                  Hit send whenever you&apos;re ready!
                </p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Field
                id="contact-name"
                label="Your name"
                type="text"
                placeholder="Ada Lovelace"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                id="contact-email"
                label="Your email (for my reply)"
                type="email"
                placeholder="ada@example.com"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs mb-1.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Say something interesting..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-colors"
                  style={{
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border-col)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 md:py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, var(--amber-glow), var(--amber-soft))",
                  color: "var(--bg)",
                }}
              >
                {status === "sending" ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Opening mail app…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Launch a signal
                  </>
                )}
              </motion.button>

              <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>
                Opens your default email app with the message pre-filled.
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 pb-6 md:pb-8 shrink-0">
          <p className="text-xs font-mono text-center" style={{ color: "var(--text-muted)" }}>
            no newsletters · no spam · just conversation
          </p>
        </div>
      </motion.aside>
    </>
  );
}

function Field({
  id, label, type, placeholder, value, onChange, required,
}: {
  id: string; label: string; type: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs mb-1.5"
        style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <input
        id={id} type={type} placeholder={placeholder}
        value={value} onChange={(e) => onChange(e.target.value)} required={required}
        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--border-col)",
          color: "var(--text-primary)",
        }}
      />
    </div>
  );
}
