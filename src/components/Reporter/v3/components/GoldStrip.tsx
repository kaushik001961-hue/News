"use client";

export default function GoldStrip() {
  return (
    <div className="relative h-4 w-full overflow-hidden rounded-t-[18px]">

      <div className="absolute inset-0 bg-gradient-to-r
        from-yellow-200
        via-yellow-400
        via-30%
        to-yellow-200"
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg,transparent 0px,transparent 6px,rgba(255,255,255,.5) 6px,rgba(255,255,255,.5) 8px)",
        }}
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(90deg,transparent,rgba(255,255,255,.8),transparent)",
        }}
      />

    </div>
  );
}