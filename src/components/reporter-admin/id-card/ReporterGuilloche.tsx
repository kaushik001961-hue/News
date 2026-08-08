"use client";

export default function ReporterGuilloche() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">

      <svg
        viewBox="0 0 540 340"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>

          <radialGradient id="guillocheFade">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

        </defs>

        {/* Main Guilloche */}

        <g
          fill="none"
          stroke="rgba(255,255,255,.28)"
          strokeWidth=".55"
        >

          {Array.from({ length: 22 }).map((_, i) => (

            <ellipse
              key={i}
              cx="270"
              cy="170"
              rx={45 + i * 7}
              ry={18 + i * 4}
            />

          ))}

        </g>

        {/* Decorative Circles */}

        <g
          fill="none"
          stroke="rgba(255,255,255,.18)"
          strokeWidth=".45"
        >

          {Array.from({ length: 18 }).map((_, i) => (

            <circle
              key={`c-${i}`}
              cx="270"
              cy="170"
              r={20 + i * 10}
            />

          ))}

        </g>

        {/* Left Ornament */}

        <g
          transform="translate(90 80)"
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth=".45"
        >

          {Array.from({ length: 10 }).map((_, i) => (

            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx={18 + i * 6}
              ry={10 + i * 3}
              transform={`rotate(${i * 18})`}
            />

          ))}

        </g>

        {/* Right Ornament */}

        <g
          transform="translate(450 255)"
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth=".45"
        >

          {Array.from({ length: 10 }).map((_, i) => (

            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx={18 + i * 6}
              ry={10 + i * 3}
              transform={`rotate(${i * 18})`}
            />

          ))}

        </g>

        {/* Soft Center Glow */}

        <circle
          cx="270"
          cy="170"
          r="120"
          fill="url(#guillocheFade)"
        />

      </svg>

    </div>
  );
}