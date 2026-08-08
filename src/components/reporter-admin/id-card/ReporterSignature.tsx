"use client";

export default function ReporterSignature() {
  return (
    <div className="flex flex-col items-center">

      <svg
        viewBox="0 0 260 90"
        className="h-14 w-40"
        fill="none"
      >
        {/* Signature */}

        <path
          d="
            M18 55
            C30 18 46 72 60 34
            C72 6 88 62 106 28
            C118 8 138 60 154 34
            C170 10 186 58 202 28
            C214 8 230 44 242 24
          "
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Underline */}

        <line
          x1="12"
          y1="72"
          x2="248"
          y2="72"
          stroke="rgba(255,255,255,.75)"
          strokeWidth="1.5"
        />
      </svg>

      <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-blue-100">
        Authorized Signatory
      </span>

      <span className="text-[8px] text-blue-200">
        AGS NEWS
      </span>

    </div>
  );
}