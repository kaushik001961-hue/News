"use client";

export default function Watermark() {
  return (
    <>
      {/* Logo Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="select-none text-[90px] font-black tracking-[0.35em] text-white/5">
          AGS
        </div>
      </div>

      {/* NEWS */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="mt-20 select-none text-4xl font-bold tracking-[0.6em] text-white/[0.03]">
          NEWS
        </div>
      </div>

      {/* Diagonal Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="rotate-[-35deg] text-[72px] font-black uppercase tracking-[0.5em] text-white/[0.025]"
        >
          PRESS
        </span>
      </div>
    </>
  );
}