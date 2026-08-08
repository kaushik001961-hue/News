"use client";

import type { ReporterCardData } from "../ReporterIdCardV2";

import {
  QrCode,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

interface Props {
  reporter: ReporterCardData;
}

export default function QRVerificationSection({
  reporter,
}: Props) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">

      {/* Header */}

      <div className="mb-3 flex items-center gap-2">

        <ShieldCheck
          size={16}
          className="text-yellow-300"
        />

        <h3 className="text-[11px] font-bold uppercase tracking-widest text-white">
          QR Verification
        </h3>

      </div>

      {/* Body */}

      <div className="flex items-center gap-3">

        {/* QR */}

        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-md">

          {reporter.reporterId ? (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                reporter.reporterId
              )}`}
              alt="QR Code"
              className="h-16 w-16"
            />
          ) : (
            <QrCode
              size={44}
              className="text-slate-400"
            />
          )}

        </div>

        {/* Details */}

        <div className="flex-1">

          <p className="text-[10px] font-semibold uppercase tracking-wider text-red-100">
            Scan to Verify
          </p>

          <p className="mt-1 text-[11px] font-bold text-white">
            {reporter.reporterId}
          </p>

          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1">

            <BadgeCheck
              size={12}
              className="text-green-300"
            />

            <span className="text-[9px] font-semibold text-green-200">
              VERIFIED REPORTER
            </span>

          </div>

        </div>

      </div>

      {/* Bottom Note */}

      <div className="mt-3 rounded-lg bg-white/5 px-3 py-2">

        <p className="text-center text-[8px] leading-4 text-white/80">
          Scan this QR code to verify the authenticity of the
          reporter identity card.
        </p>

      </div>

    </div>
  );
}