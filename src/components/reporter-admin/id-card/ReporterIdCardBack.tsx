"use client";

import Image from "next/image";

import ReporterWatermark from "./ReporterWatermark";
import ReporterGuilloche from "./ReporterGuilloche";
import ReporterSecurityStrip from "./ReporterSecurityStrip";
import ReporterHologram from "./ReporterHologram";

interface Props {
  reporter: {
    reporterId: string | null;

    firstName: string;
    lastName: string;

    phone?: string | null;
    email?: string | null;

    PressCard?: {
      cardNumber: string;
      expiryDate: Date;
    } | null;
  };
}

export default function ReporterIdCardBack({
  reporter,
}: Props) {

  const expiryDate =
    reporter.PressCard?.expiryDate
      ? new Date(reporter.PressCard.expiryDate).toLocaleDateString()
      : "--";

  return (

    <div
      className="
        relative
        h-[340px]
        w-[540px]
        overflow-hidden
        rounded-[22px]
        bg-gradient-to-br
        from-[#021B3D]
        via-[#0A3C85]
        to-[#1263D6]
        text-white
        shadow-2xl
      "
    >

      <ReporterGuilloche />
      <ReporterWatermark />
      <ReporterSecurityStrip />

      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

      {/* HEADER */}

      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">

        <div>

          <div className="text-[9px] uppercase tracking-[0.45em] text-cyan-200">
            AGS NEWS
          </div>

          <h2 className="mt-1 text-2xl font-black">
            TERMS & CONDITIONS
          </h2>

        </div>

        <Image
          src="/logo.png"
          alt="AGS NEWS"
          width={54}
          height={54}
          className="rounded-full bg-white p-1"
        />

      </div>

      {/* BODY */}

      <div className="relative z-10 px-6 py-5">

        <div className="grid grid-cols-[1fr_150px] gap-6">

  {/* LEFT SIDE */}

  <div>

    <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
      Terms & Conditions
    </h3>

    <ul className="space-y-4 text-[10px] leading-6 text-blue-50">

      <li>• This Press Identity Card is the property of AGS NEWS.</li>

      <li>• The card must be carried while performing official duties.</li>

      <li>• Misuse or unauthorized transfer of this card is strictly prohibited.</li>

      <li>• Loss of this card should be reported to AGS NEWS immediately.</li>

      <li>• AGS NEWS reserves the right to cancel this card at any time.</li>

      <li>• The holder must return this card upon resignation or termination.</li>

    </ul>

    <div className="mt-5 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur">

      <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200">
        Emergency Contact
      </h4>

      <div className="space-y-1 text-[10px]">

        <p>
          Email:
          <span className="ml-2 font-semibold">
            info@agsnews.in
          </span>
        </p>

        <p>
          Phone:
          <span className="ml-2 font-semibold">
            +91 XXXXX XXXXX
          </span>
        </p>

        <p>
          Website:
          <span className="ml-2 font-semibold">
            www.agsnews.in
          </span>
        </p>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}

  <div className="flex flex-col items-center">

    <ReporterHologram />

    <div className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">

      <h4 className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.20em] text-cyan-200">
        Card Details
      </h4>

      <InfoRow
        label="Reporter ID"
        value={reporter.reporterId ?? "--"}
      />

      <InfoRow
        label="Card No."
        value={reporter.PressCard?.cardNumber ?? "--"}
      />

      <InfoRow
        label="Expiry"
        value={expiryDate}
      />

    </div>

    <div className="mt-4 text-center text-[9px] uppercase tracking-[0.25em] text-cyan-200">
      Verify this card
    </div>

    <p className="mt-1 text-center text-[9px] leading-4 text-blue-100">
      Scan the QR code on the front side or verify through the AGS NEWS verification portal.
    </p>

  </div>

</div>

      {/* FOOTER */}

      <div className="mt-6 border-t border-white/15 pt-4">

        <div className="flex items-center justify-between">

          <div>

            <div className="text-[9px] uppercase tracking-[0.25em] text-cyan-200">
              Issuing Authority
            </div>

            <div className="mt-1 text-sm font-bold">
              AGS NEWS
            </div>

            <div className="text-[10px] text-blue-100">
              Editorial & Administration Department
            </div>

          </div>

          <div className="text-right">

            <div className="text-[9px] uppercase tracking-[0.25em] text-cyan-200">
              Card Holder
            </div>

            <div className="mt-1 text-sm font-bold">
              {reporter.firstName} {reporter.lastName}
            </div>

            <div className="text-[10px] text-blue-100">
              Accredited Reporter
            </div>

          </div>

        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-black/15 px-4 py-2 text-center">

          <p className="text-[8px] uppercase tracking-[0.30em] text-blue-100">
            This identity card remains the property of AGS NEWS and must be
            surrendered immediately upon demand or termination of service.
          </p>

        </div>

        <div className="mt-3 flex items-center justify-between text-[8px] uppercase tracking-[0.25em] text-blue-200">

          <span>© AGS NEWS</span>

          <span>www.agsnews.in</span>

        </div>

      </div>

    </div>

  </div>
);

}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="mb-2">

      <div className="text-[8px] uppercase tracking-[0.20em] text-cyan-200">
        {label}
      </div>

      <div
        className="truncate text-[10px] font-semibold text-white"
        title={value}
      >
        {value}
      </div>

    </div>
  );
}