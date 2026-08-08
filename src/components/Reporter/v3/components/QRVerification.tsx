"use client";

import QRCode from "react-qr-code";
import {
  ShieldCheck,
  Smartphone,
  BadgeCheck,
} from "lucide-react";

import { ReporterCardData } from "../ReporterIdCardV3";

interface QRVerificationProps {
  reporter: ReporterCardData;
}

export default function QRVerification({
  reporter,
}: QRVerificationProps) {
  const qrValue =
    reporter.qrCode ||
    JSON.stringify({
      reporterId: reporter.reporterId,
      name: `${reporter.firstName} ${reporter.lastName}`,
      designation: reporter.designation,
      phone: reporter.phone,
      district: reporter.district,
      state: reporter.state,
      validTill: reporter.expiryDate,
    });

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-red-700 to-red-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <ShieldCheck
            size={18}
            className="text-yellow-300"
          />

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            Verification
          </span>
        </div>

        <BadgeCheck
          size={18}
          className="text-emerald-300"
        />
      </div>

      {/* Body */}
      <div className="flex items-center gap-4 p-4">
        {/* QR */}
        <div className="rounded-xl border-2 border-yellow-400 bg-white p-2 shadow">
          <QRCode
            value={qrValue}
            size={82}
            bgColor="#FFFFFF"
            fgColor="#111827"
          />
        </div>

        {/* Instructions */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Smartphone
              size={18}
              className="text-red-700"
            />

            <h3 className="text-sm font-bold text-gray-900">
              Scan & Verify
            </h3>
          </div>

          <ul className="space-y-2 text-[10px] text-gray-700">
            <li>• Verify reporter identity</li>
            <li>• Confirm card authenticity</li>
            <li>• Check validity period</li>
            <li>• View AGS NEWS profile</li>
          </ul>

          <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
              Secure Digital Verification
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}