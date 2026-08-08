"use client";

export default function Guilloche() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      viewBox="0 0 600 400"
      preserveAspectRatio="none"
    >
      <defs>

        <pattern
          id="guilloche"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="30"
            cy="30"
            r="24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.8"
          />

          <circle
            cx="30"
            cy="30"
            r="18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.6"
          />

          <circle
            cx="30"
            cy="30"
            r="12"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

        </pattern>

      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#guilloche)"
      />
    </svg>
  );
}