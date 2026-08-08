"use client";

export default function CardBackground() {
  return (
    <>
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-700 to-red-950" />

      {/* Top Glow */}
      <div className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-red-300/20 blur-3xl" />

      {/* Bottom Glow */}
      <div className="absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-yellow-400/10 blur-3xl" />

      {/* Decorative Circles */}
      <div className="absolute left-4 top-4 h-28 w-28 rounded-full border border-white/10" />
      <div className="absolute right-6 bottom-10 h-40 w-40 rounded-full border border-white/5" />

      {/* Fine Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "18px 18px",
        }}
      />

      {/* Gold Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/10" />
    </>
  );
}