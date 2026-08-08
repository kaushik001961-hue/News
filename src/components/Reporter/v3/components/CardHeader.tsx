"use client";

import Image from "next/image";

interface CardHeaderProps {
  logo?: string;
}

export default function CardHeader({
  logo = "/images/ags-news-logo.png",
}: CardHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/15">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-800 to-red-900" />

      {/* Gold Accent */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-500" />

      {/* Header Content */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3">
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-300 bg-white shadow-lg">
          <Image
            src={logo}
            alt="AGS NEWS"
            width={42}
            height={42}
            priority
            className="h-auto w-auto object-contain"
          />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h1 className="text-xl font-extrabold tracking-wide text-white">
            AGS NEWS
          </h1>

          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-yellow-200">
            PRESS IDENTITY CARD
          </p>

          <div className="mt-1 h-[2px] w-28 rounded-full bg-gradient-to-r from-yellow-300 to-transparent" />
        </div>

        {/* Security Badge */}
        <div className="rounded-full border border-yellow-300/70 bg-yellow-400/15 px-3 py-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-yellow-100">
            Official
          </span>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
    </header>
  );
}