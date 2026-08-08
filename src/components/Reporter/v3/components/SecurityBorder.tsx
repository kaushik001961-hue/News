"use client";

export default function SecurityBorder() {
  return (
    <>
      {/* Outer Gold Border */}
      <div className="pointer-events-none absolute inset-[4px] rounded-[20px] border border-yellow-300/70" />

      {/* Inner White Border */}
      <div className="pointer-events-none absolute inset-[8px] rounded-[16px] border border-white/20" />

      {/* Corner Marks */}
      {[
        "top-3 left-3",
        "top-3 right-3",
        "bottom-3 left-3",
        "bottom-3 right-3",
      ].map((position) => (
        <div
          key={position}
          className={`absolute ${position} h-4 w-4 border-yellow-300`}
        >
          <div className="absolute inset-0 border-l-2 border-t-2" />
        </div>
      ))}

      {/* Security Pattern */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[22px] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, white 0, white 1px, transparent 1px, transparent 10px)",
        }}
      />
    </>
  );
}