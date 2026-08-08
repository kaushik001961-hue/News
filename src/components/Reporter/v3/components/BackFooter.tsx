"use client";

import {
  Globe,
  ShieldCheck,
  Copyright,
  ScanLine,
} from "lucide-react";

interface BackFooterProps {
  website?: string;
}

export default function BackFooter({
  website = "www.agsnews.in",
}: BackFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/15">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-red-950" />

      {/* Gold Accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

      <div className="relative z-10 px-4 py-3">
        {/* Website */}
        <div className="flex items-center justify-center gap-2">
          <Globe
            size={12}
            className="text-yellow-300"
          />

          <span className="text-[9px] font-semibold tracking-wide text-white">
            {website}
          </span>
        </div>

        {/* Disclaimer */}
        <div className="mt-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
          <p className="text-center text-[8px] leading-relaxed text-red-100">
            This identity card remains the property of <strong>AGS NEWS</strong>.
            Any misuse, alteration, duplication or unauthorized use is strictly
            prohibited.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ShieldCheck
              size={12}
              className="text-emerald-300"
            />

            <ScanLine
              size={12}
              className="text-yellow-300"
            />

            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-1 text-red-100">
            <Copyright size={10} />

            <span className="text-[8px]">
              {new Date().getFullYear()} AGS NEWS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}