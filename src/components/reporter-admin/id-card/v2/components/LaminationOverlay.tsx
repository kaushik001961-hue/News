interface LaminationOverlayProps {
  opacity?: number;
}

export default function LaminationOverlay({
  opacity = 0.08,
}: LaminationOverlayProps) {
  return (
    <>
      {/* Main Gloss */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity,
          background:
            "linear-gradient(120deg, transparent 20%, rgba(255,255,255,.45) 38%, rgba(255,255,255,.18) 45%, transparent 58%)",
        }}
      />

      {/* Top Reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,.18), transparent)",
        }}
      />

      {/* Bottom Reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,.08), transparent)",
        }}
      />

      {/* Left Edge Highlight */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-px bg-white/20" />

      {/* Right Edge Highlight */}
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-px bg-white/20" />

      {/* Top Edge Highlight */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full bg-white/20" />

      {/* Bottom Edge Highlight */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-px w-full bg-black/20" />
    </>
  );
}