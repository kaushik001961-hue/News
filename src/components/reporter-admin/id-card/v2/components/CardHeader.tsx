"use client";

import Image from "next/image";
import ReporterHologram from "../../ReporterHologram";

interface CardHeaderProps {
  reporter?: {
    reporterId?: string;
  };
}

export default function CardHeader({
  reporter,
}: CardHeaderProps) {
  return (
    <div className="relative z-20 border-b border-black/10 bg-white px-4 py-3">

      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">

          <div className="relative h-12 w-12 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="AGS NEWS"
              fill
              className="object-contain"
            />
          </div>

          <div>

            <h1 className="text-lg font-black tracking-[0.28em] text-red-700">
              AGS NEWS
            </h1>

            <p className="text-[8px] font-semibold uppercase tracking-[0.30em] text-slate-500">
              PRESS IDENTIFICATION CARD
            </p>

            {reporter?.reporterId && (
              <p className="mt-1 font-mono text-[10px] font-semibold text-slate-600">
                ID: {reporter.reporterId}
              </p>
            )}

          </div>

        </div>

        {/* Right */}
        <ReporterHologram />

      </div>

    </div>
  );
}