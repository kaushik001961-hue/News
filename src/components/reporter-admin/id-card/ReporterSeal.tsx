"use client";

export default function ReporterSeal() {
  return (
    <div className="relative h-20 w-20">

      <svg
        viewBox="0 0 200 200"
        className="h-full w-full drop-shadow-lg"
      >
        <defs>

          <linearGradient
            id="sealGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>

        </defs>

        {/* Outer Ring */}

        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#ffffff"
          strokeWidth="6"
          opacity="0.95"
        />

        {/* Middle Ring */}

        <circle
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Center */}

        <circle
          cx="100"
          cy="100"
          r="56"
          fill="url(#sealGradient)"
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Star */}

        <polygon
          points="
            100,62
            108,88
            136,88
            114,104
            122,132
            100,116
            78,132
            86,104
            64,88
            92,88
          "
          fill="#0F172A"
        />

        {/* Top Text */}

        <text
          x="100"
          y="34"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="12"
          fontWeight="700"
          letterSpacing="2"
        >
          AGS NEWS
        </text>

        {/* Bottom Text */}

        <text
          x="100"
          y="176"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1"
        >
          OFFICIAL SEAL
        </text>

      </svg>

    </div>
  );
}