"use client";

export default function LaminationOverlay() {
  return (
    <>
      {/* Main Gloss */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />

      {/* Left Shine */}
      <div className="pointer-events-none absolute -left-10 top-0 h-full w-16 rotate-12 bg-white/10 blur-xl" />

      {/* Right Shine */}
      <div className="pointer-events-none absolute -right-8 bottom-0 h-full w-10 -rotate-12 bg-white/5 blur-lg" />

      {/* Top Reflection */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-14 bg-gradient-to-b from-white/18 to-transparent" />

      {/* Bottom Reflection */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/8 to-transparent" />
    </>
  );
}