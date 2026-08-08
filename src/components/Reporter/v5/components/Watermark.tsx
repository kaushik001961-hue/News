export default function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center">
      <span
        className="
          -rotate-45
          text-[90px]
          font-black
          tracking-[10px]
          text-slate-400
          opacity-10
          select-none
        "
      >
        AGS
      </span>
    </div>
  );
}