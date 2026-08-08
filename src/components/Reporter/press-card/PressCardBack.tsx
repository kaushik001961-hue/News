"use client";

import QRCode from "react-qr-code";
import {
  Globe,
  Phone,
  Mail,
  ShieldCheck,
  TriangleAlert,
  CheckCircle2,
} from "lucide-react";

import { PressCardData } from "./types";

interface Props {
  reporter: PressCardData;
}

export default function PressCardBack({
  reporter,
}: Props) {
  return (
    <div className="relative h-[540px] w-[860px] overflow-hidden rounded-[28px] bg-white shadow-2xl">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50" />

      {/* Decorative Background */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/10" />
      <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-yellow-400/10" />

      {/* Header */}

      <div className="bg-gradient-to-r from-slate-900 via-red-700 to-red-600 px-10 py-7">

        <h2 className="text-3xl font-bold text-white">
          CARD VERIFICATION
        </h2>

        <p className="mt-1 text-white/80">
          Scan the QR Code to verify reporter identity.
        </p>

      </div>

      {/* Content */}

      <div className="grid grid-cols-2 gap-10 px-10 py-8">

        {/* Left */}

        <div>

          <div className="rounded-3xl border bg-white p-6 shadow">

            <div className="flex justify-center">

              <QRCode
                value={reporter.qrCode}
                size={180}
              />

            </div>

            <p className="mt-5 text-center text-sm text-slate-500">
              Scan using any QR Scanner
            </p>

          </div>

          <div className="mt-6 rounded-2xl bg-red-50 p-5">

            <h3 className="mb-4 flex items-center gap-2 font-bold text-red-700">

              <ShieldCheck size={20} />

              Security Features

            </h3>

            <ul className="space-y-3 text-sm">

              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 text-green-600"
                />
                Unique QR Verification
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 text-green-600"
                />
                Official Reporter Database
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 text-green-600"
                />
                Tamper Resistant Design
              </li>

            </ul>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="rounded-3xl bg-slate-50 p-6">

            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Terms & Conditions
            </h3>

            <ul className="space-y-3 text-sm leading-6 text-slate-700">

              <li>
                • This ID Card remains the property of AGS NEWS.
              </li>

              <li>
                • Carry this card while performing official duties.
              </li>

              <li>
                • Misuse of this card is punishable under applicable law.
              </li>

              <li>
                • Report immediately if this card is lost or stolen.
              </li>

              <li>
                • Expired cards are automatically invalid.
              </li>

            </ul>

          </div>

          <div className="mt-6 rounded-3xl border p-6">

            <h3 className="mb-5 font-bold text-slate-800">
              Verification Contact
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-red-600"
                />

                +91-XXXXXXXXXX

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-red-600"
                />

                info@agsnews.com

              </div>

              <div className="flex items-center gap-3">

                <Globe
                  size={18}
                  className="text-red-600"
                />

                www.agsnews.com

              </div>

            </div>

          </div>

          <div className="mt-6 flex justify-between">

            <div className="text-center">

              <div className="mb-3 h-14 w-44 border-b-2 border-slate-700" />

              <p className="text-sm font-semibold">
                Authorized Signature
              </p>

            </div>

            <div className="rounded-full border-4 border-red-600 px-7 py-6 text-center">

              <TriangleAlert
                className="mx-auto mb-2 text-red-600"
                size={28}
              />

              <p className="text-xs font-bold">
                OFFICIAL
              </p>

              <p className="text-xs">
                SEAL
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="absolute bottom-0 w-full bg-slate-900 px-10 py-4">

        <p className="text-center text-xs text-slate-300">

          © {new Date().getFullYear()} AGS NEWS. All Rights Reserved.

        </p>

      </div>

    </div>
  );
}