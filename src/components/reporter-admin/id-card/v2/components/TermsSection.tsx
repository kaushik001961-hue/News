"use client";

import {
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Ban,
} from "lucide-react";

const terms = [
  {
    icon: ShieldCheck,
    title: "Official Property",
    text: "This card remains the property of AGS NEWS.",
  },
  {
    icon: QrCode,
    title: "Verification",
    text: "Scan the QR code to verify reporter identity.",
  },
  {
    icon: AlertTriangle,
    title: "Lost Card",
    text: "Report any loss immediately to the head office.",
  },
  {
    icon: Ban,
    title: "Misuse",
    text: "Unauthorized use will result in cancellation.",
  },
];

export default function TermsSection() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">

      <div className="mb-2 flex items-center justify-between">

        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
          Security Notice
        </h3>

        <ShieldCheck
          size={16}
          className="text-yellow-300"
        />

      </div>

      <div className="space-y-2">

        {terms.map(({ icon: Icon, title, text }) => (

          <div
            key={title}
            className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-2"
          >

            <div className="mt-0.5 rounded-md bg-yellow-300/15 p-1">

              <Icon
                size={11}
                className="text-yellow-300"
              />

            </div>

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-wide text-white">
                {title}
              </p>

              <p className="mt-0.5 text-[8px] leading-3 text-white/75">
                {text}
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-3 rounded-lg border border-red-300/20 bg-red-900/20 px-2 py-1.5">

        <p className="text-center text-[8px] font-semibold uppercase tracking-widest text-red-100">
          Unauthorized Use Strictly Prohibited
        </p>

      </div>

    </div>
  );
}