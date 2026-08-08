"use client";

import Watermark from "./Watermark";
import SecurityPattern from "./SecurityPattern";

export default function BackBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7F1D1D] via-[#B91C1C] to-[#991B1B]" />

      {/* Top Glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-red-300/10 blur-3xl" />

      {/* Bottom Right Glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-red-900/20 blur-3xl" />

      {/* Left Glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

      {/* Decorative Ring */}
      <div className="pointer-events-none absolute right-5 top-28 h-24 w-24 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute bottom-16 left-5 h-16 w-16 rounded-full border border-white/10" />

      {/* Watermark */}
      <Watermark
        text="AGS NEWS"
        opacity={0.05}
        rotate={-30}
      />

      {/* Security Pattern */}
      <SecurityPattern
        opacity={0.04}
        size={18}
      />

      {/* Gloss Effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, transparent 25%, rgba(255,255,255,.08) 50%, transparent 75%)",
        }}
      />

      {/* Bottom Shadow */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
    </>
  );
}