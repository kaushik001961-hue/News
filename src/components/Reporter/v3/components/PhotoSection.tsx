"use client";

import Image from "next/image";
import { Camera, ShieldCheck } from "lucide-react";
import { ReporterCardData } from "../ReporterIdCardV3";

interface PhotoSectionProps {
  reporter: ReporterCardData;
}

export default function PhotoSection({
  reporter,
}: PhotoSectionProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Photo Frame */}
      <div className="relative">
        {/* Outer Gold Ring */}
        <div className="rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 p-[3px] shadow-xl">
          {/* White Border */}
          <div className="rounded-[14px] bg-white p-[3px]">
            {/* Inner Frame */}
            <div className="relative h-36 w-28 overflow-hidden rounded-xl bg-slate-100">
              {reporter.photo ? (
                <Image
                  src={reporter.photo}
                  alt={`${reporter.firstName} ${reporter.lastName}`}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-200 to-slate-300">
                  <Camera
                    size={34}
                    className="text-slate-500"
                  />

                  <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    No Photo
                  </span>
                </div>
              )}

              {/* Verified Badge */}
              <div className="absolute right-2 top-2 rounded-full bg-emerald-500 p-1 shadow-lg ring-2 ring-white">
                <ShieldCheck
                  size={12}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reporter ID Ribbon */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-700 to-red-900 px-3 py-1 shadow-lg">
          <span className="whitespace-nowrap text-[9px] font-bold tracking-wider text-white">
            {reporter.reporterId}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-3 flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700">
          VERIFIED REPORTER
        </span>
      </div>
    </div>
  );
}