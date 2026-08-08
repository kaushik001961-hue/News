"use client";

export default function ReporterHologram() {
  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/40 shadow-lg">

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <defs>

          <linearGradient
            id="holoGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="25%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="75%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>

          <pattern
            id="hexPattern"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M5 0 L10 3 L10 7 L5 10 L0 7 L0 3 Z"
              fill="none"
              stroke="rgba(255,255,255,.18)"
              strokeWidth="0.6"
            />
          </pattern>

        </defs>

        {/* Base */}

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#holoGradient)"
        />

        {/* Security Pattern */}

        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#hexPattern)"
        />

        {/* Inner Ring */}

        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="rgba(255,255,255,.55)"
          strokeWidth="2"
        />

        {/* Center */}

        <text
          x="50"
          y="47"
          textAnchor="middle"
          fill="white"
          fontSize="10"
          fontWeight="700"
        >
          AGS
        </text>

        <text
          x="50"
          y="60"
          textAnchor="middle"
          fill="white"
          fontSize="6"
          letterSpacing="1"
        >
          VERIFIED
        </text>

      </svg>

      {/* Shine */}

      <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent" />

    </div>
  );
}