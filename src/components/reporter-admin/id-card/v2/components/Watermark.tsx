interface WatermarkProps {
  text?: string;
  opacity?: number;
  rotate?: number;
  className?: string;
}

export default function Watermark({
  text = "AGS NEWS",
  opacity = 0.05,
  rotate = -30,
  className = "",
}: WatermarkProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
    >
      <span
        className="select-none whitespace-nowrap font-black uppercase tracking-[12px] text-white"
        style={{
          opacity,
          transform: `rotate(${rotate}deg)`,
          fontSize: "72px",
          lineHeight: 1,
        }}
      >
        {text}
      </span>
    </div>
  );
}