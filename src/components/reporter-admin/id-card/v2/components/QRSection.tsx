"use client";

import Image from "next/image";

interface QRSectionProps {
  reporter: {
    qrCode?: string | null;
    reporterId?: string;
  };
}

export default function QRSection({
  reporter,
}: QRSectionProps) {
  const qrImage =
    reporter.qrCode ||
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
      reporter.reporterId || "AGS NEWS"
    )}`;

  return (
    <div className="flex flex-col items-center rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">

      <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-white p-1">

        <Image
          src={qrImage}
          alt="QR Code"
          fill
          sizes="96px"
          className="object-contain"
          unoptimized
        />

      </div>

      <p className="mt-2 text-[9px] font-semibold uppercase tracking-[2px] text-white">
        Scan to Verify
      </p>

      <p className="mt-1 font-mono text-[8px] text-slate-200">
        {reporter.reporterId || "--"}
      </p>

    </div>
  );
}