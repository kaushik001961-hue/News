"use client";

import QRCode from "react-qr-code";
import { ShieldCheck, QrCode } from "lucide-react";
import { ReporterCardData } from "../ReporterIdCardV3";

interface QRSectionProps {
  reporter: ReporterCardData;
}

export default function QRSection({
  reporter,
}: QRSectionProps) {
  const qrValue =
    reporter.qrCode ||
    JSON.stringify({
      reporterId: reporter.reporterId,
      name: `${reporter.firstName} ${reporter.lastName}`,
      designation: reporter.designation,
      district: reporter.district,
      state: reporter.state,
      phone: reporter.phone,
      validTill: reporter.expiryDate,
    });

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-md">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <QrCode
            size={15}
            className="text-red-700"
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
            Verify
          </span>
        </div>

        <ShieldCheck
          size={14}
          className="text-emerald-600"
        />
      </div>

      {/* QR Frame */}
      <div className="flex justify-center">
        <div className="rounded-xl border-2 border-yellow-400 bg-white p-2 shadow-lg">
          <QRCode
            value={qrValue}
            size={76}
            bgColor="#ffffff"
            fgColor="#111827"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-700">
          Scan to Verify
        </p>

        <p className="mt-1 text-[8px] text-gray-500">
          Official AGS NEWS Verification
        </p>
      </div>
    </section>
  );
}