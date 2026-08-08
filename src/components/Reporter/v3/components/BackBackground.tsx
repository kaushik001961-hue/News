"use client";

export default function BackBackground() {
  return (
    <>
      {/* Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-800 to-red-900" />

      {/* Top Highlight */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent" />

      {/* Bottom Highlight */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Large Watermark Circle */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      {/* Diagonal Security Lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              white 0px,
              white 1px,
              transparent 1px,
              transparent 12px
            )
          `,
        }}
      />

      {/* Corner Decorations */}
      <div className="absolute left-0 top-0 h-36 w-36 rounded-br-full bg-white/5 blur-2xl" />

      <div className="absolute bottom-0 right-0 h-36 w-36 rounded-tl-full bg-yellow-300/10 blur-2xl" />

      {/* Gold Strip */}
      <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

      {/* Fine Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle, white 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/10" />
    </>
  );
}