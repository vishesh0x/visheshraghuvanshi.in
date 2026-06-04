"use client";

export default function StickyNote({
  text = "/now",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${className}`}
      aria-hidden="true"
    >
      {/* Shadow */}
      <rect x="6" y="8" width="62" height="62" rx="3" fill="rgba(0,0,0,0.15)" />

      {/* Note body */}
      <rect x="4" y="4" width="62" height="62" rx="3" fill="#d4a843" />

      {/* Folded corner */}
      <path d="M50 4 L66 20 L50 20 Z" fill="#b8902c" />
      <path d="M50 4 L66 20" stroke="#a07818" strokeWidth="0.5" />

      {/* Ruled lines */}
      <line x1="12" y1="26" x2="50" y2="26" stroke="#b8902c" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="34" x2="54" y2="34" stroke="#b8902c" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="42" x2="52" y2="42" stroke="#b8902c" strokeWidth="1" opacity="0.5" />
      <line x1="12" y1="50" x2="48" y2="50" stroke="#b8902c" strokeWidth="1" opacity="0.5" />

      {/* Text */}
      <text
        x="13"
        y="20"
        fontFamily="var(--font-caveat), cursive"
        fontSize="14"
        fill="#5a3a00"
        fontWeight="600"
      >
        {text}
      </text>

      {/* Small doodle squiggle */}
      <path
        d="M12 58 Q18 55 24 58 Q30 61 36 58"
        stroke="#a07818"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
