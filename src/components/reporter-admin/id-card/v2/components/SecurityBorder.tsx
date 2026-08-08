"use client";

export default function SecurityBorder() {
  return (
    <>
      {/* Outer Border */}

      <div className="pointer-events-none absolute inset-[2px] rounded-[22px] border-2 border-white/70" />

      {/* Inner Border */}

      <div className="pointer-events-none absolute inset-[8px] rounded-[16px] border border-white/20" />

      {/* Shine */}

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,.30), transparent 35%, transparent 70%, rgba(255,255,255,.10))",
        }}
      />

      {/* Top Highlight */}

      <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-white/40" />
    </>
  );
}