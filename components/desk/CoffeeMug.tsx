"use client";

export default function CoffeeMug({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Steam wisps */}
      <g className="steam-1" style={{ transformOrigin: "26px 32px" }}>
        <path
          d="M26 32 Q28 26 24 22"
          stroke="#b8895a"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g className="steam-2" style={{ transformOrigin: "36px 28px" }}>
        <path
          d="M36 28 Q38 22 34 18"
          stroke="#b8895a"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g className="steam-3" style={{ transformOrigin: "46px 32px" }}>
        <path
          d="M46 32 Q44 26 48 22"
          stroke="#b8895a"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Mug body */}
      <rect
        x="16"
        y="38"
        width="44"
        height="30"
        rx="6"
        fill="#2a2420"
        stroke="#4a3828"
        strokeWidth="2"
      />

      {/* Coffee liquid surface */}
      <ellipse cx="38" cy="41" rx="18" ry="5" fill="#4a2e1a" />

      {/* Amber highlight on liquid */}
      <ellipse cx="33" cy="40" rx="6" ry="2.5" fill="#7a4510" opacity="0.6" />

      {/* Mug rim */}
      <rect
        x="16"
        y="35"
        width="44"
        height="8"
        rx="4"
        fill="#332820"
        stroke="#4a3828"
        strokeWidth="2"
      />

      {/* Handle */}
      <path
        d="M60 46 Q72 46 72 54 Q72 62 60 62"
        stroke="#4a3828"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Saucer */}
      <ellipse
        cx="38"
        cy="70"
        rx="26"
        ry="5"
        fill="#1e1c19"
        stroke="#3a3530"
        strokeWidth="1.5"
      />

      {/* Warm glow on hover */}
      <ellipse
        cx="38"
        cy="54"
        rx="22"
        ry="14"
        fill="url(#mugGlow)"
        opacity="0.15"
      />

      <defs>
        <radialGradient id="mugGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d97c2a" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}
