"use client";

import Watermark from "./Watermark";
import SecurityPattern from "./SecurityPattern";

export default function CardBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7F1D1D] via-[#B91C1C] to-[#991B1B]" />
      {/* Top Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-48 w-48 -translate-x-1/2 rounded-full bg-red-300/20 blur-3xl" />

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-48 w-48 rounded-full bg-red-900/40 blur-3xl" />

      {/* Right Glow */}
      <div className="pointer-events-none absolute -right-16 top-32 z-0 h-40 w-40 rounded-full bg-yellow-300/10 blur-3xl" />

      {/* World Map */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: "url('/images/world-map.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "92%",
        }}
      />

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

      {/* Diagonal Shine */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          background:
            "linear-gradient(135deg, transparent 25%, rgba(255,255,255,.35) 50%, transparent 75%)",
        }}
      />

      {/* Decorative Rings */}
      <div className="pointer-events-none absolute right-3 top-28 z-0 h-24 w-24 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute bottom-28 left-4 z-0 h-16 w-16 rounded-full border border-white/10" />

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/25 to-transparent" />
    </>
  );
}