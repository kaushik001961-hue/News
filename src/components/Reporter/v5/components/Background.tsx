"use client";

export default function Background() {
  return (
    <>
      {/* Base */}
      <div className="absolute inset-0 bg-white" />

      {/* Header */}
      <div className="absolute left-0 right-0 top-0 h-[14mm] bg-gradient-to-r from-red-900 via-red-700 to-red-900" />

      {/* Gold Strip */}
      <div className="absolute left-0 right-0 top-[14mm] h-[2px] bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500" />

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-[3mm] bg-gradient-to-r from-red-900 via-red-700 to-red-900" />

      {/* Decorative Shapes */}
      <div className="absolute -right-10 top-[16mm] h-52 w-24 rotate-[18deg] bg-red-50" />

      <div className="absolute -left-10 bottom-4 h-40 w-20 -rotate-[18deg] bg-yellow-50" />

      {/* Soft Circles */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-100 opacity-40 blur-3xl" />

      <div className="absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-yellow-100 opacity-40 blur-3xl" />

      {/* Security Lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              #991B1B 0px,
              #991B1B 2px,
              transparent 2px,
              transparent 10px
            )
          `,
        }}
      />
    </>
  );
}