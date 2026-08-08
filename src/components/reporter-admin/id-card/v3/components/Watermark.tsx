"use client";

export default function Watermark() {
  return (
    <div
      className="
      pointer-events-none
      absolute
      inset-0
      flex
      items-center
      justify-center
      opacity-[0.05]
      "
    >
      <div
        className="
        rotate-[-30deg]
        text-7xl
        font-black
        tracking-[0.35em]
        text-white
        "
      >
        AGS NEWS
      </div>
    </div>
  );
}