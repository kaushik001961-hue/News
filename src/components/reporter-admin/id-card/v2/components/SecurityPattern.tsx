interface SecurityPatternProps {
  opacity?: number;
  size?: number;
}

export default function SecurityPattern({
  opacity = 0.04,
  size = 18,
}: SecurityPatternProps) {
  return (
    <>
      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`,
        }}
      />

      {/* Dot Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: opacity / 2,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.8) 1px, transparent 0)",
          backgroundSize: `${size - 4}px ${size - 4}px`,
        }}
      />

      {/* Diagonal Security Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: opacity / 2,
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 12px, rgba(255,255,255,.18) 13px, transparent 14px)",
        }}
      />
    </>
  );
}