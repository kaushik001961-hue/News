"use client";

export default function Hologram() {
  return (
    <div
      className="
      relative
      h-12
      w-12
      rounded-full
      border
      border-white/40
      bg-gradient-to-br
      from-cyan-300
      via-pink-300
      to-yellow-300
      shadow-lg
      "
    >

      <div
        className="absolute inset-2 rounded-full border border-white/50"
      />

      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background:
            "conic-gradient(red,orange,yellow,lime,cyan,blue,purple,red)",
        }}
      />

    </div>
  );
}