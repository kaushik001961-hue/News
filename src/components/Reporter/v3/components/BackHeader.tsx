"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";

interface BackHeaderProps {
  logo?: string;
}

export default function BackHeader({
  logo = "/images/ags-news-logo.png",
}: BackHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/15">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-800 to-red-900" />

      {/* Gold Bottom Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-yellow-300 bg-white shadow-md">
            <Image
              src={logo}
              alt="AGS NEWS"
              width={32}
              height={32}
              priority
              className="h-auto w-auto object-contain"
            />
          </div>

          <div>
            <h2 className="text-base font-bold tracking-wide text-white">
              AGS NEWS
            </h2>

            <p className="text-[9px] uppercase tracking-[0.25em] text-yellow-200">
              Verification Information
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-full border border-yellow-300/60 bg-yellow-400/10 px-2.5 py-1">
          <ShieldCheck
            size={14}
            className="text-yellow-300"
          />

          <span className="text-[8px] font-bold uppercase tracking-wider text-yellow-100">
            Secure
          </span>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -top-6 right-0 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
    </header>
  );
}