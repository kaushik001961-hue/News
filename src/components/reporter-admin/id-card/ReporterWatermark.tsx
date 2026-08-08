"use client";

export default function ReporterWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">

      <svg
        viewBox="0 0 600 400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>

          <radialGradient id="wmGradient">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

        </defs>

        {/* Large Background Circle */}

        <circle
          cx="300"
          cy="200"
          r="130"
          fill="url(#wmGradient)"
        />

        {/* Outer Ring */}

        <circle
          cx="300"
          cy="200"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="3"
        />

        {/* Inner Ring */}

        <circle
          cx="300"
          cy="200"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
        />

        {/* AGS */}

        <text
          x="300"
          y="190"
          textAnchor="middle"
          fontSize="72"
          fontWeight="900"
          fill="rgba(255,255,255,0.05)"
          letterSpacing="6"
        >
          AGS
        </text>

        <text
          x="300"
          y="225"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill="rgba(255,255,255,0.05)"
          letterSpacing="5"
        >
          NEWS
        </text>

        {/* Diagonal Security Text */}

        <g transform="rotate(-28 300 200)">

          <text
            x="70"
            y="120"
            fontSize="12"
            letterSpacing="6"
            fill="rgba(255,255,255,0.04)"
          >
            AGS NEWS • OFFICIAL PRESS • VERIFIED
          </text>

          <text
            x="30"
            y="280"
            fontSize="12"
            letterSpacing="6"
            fill="rgba(255,255,255,0.04)"
          >
            AGS NEWS • OFFICIAL PRESS • VERIFIED
          </text>

        </g>

      </svg>

    </div>
  );
}