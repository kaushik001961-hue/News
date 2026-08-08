"use client";

import Image from "next/image";

import ReporterQRCode from "./ReporterQRCode";
import ReporterSeal from "./ReporterSeal";
import ReporterSignature from "./ReporterSignature";
import ReporterWatermark from "./ReporterWatermark";
import ReporterSecurityStrip from "./ReporterSecurityStrip";
import ReporterGuilloche from "./ReporterGuilloche";
import ReporterHologram from "./ReporterHologram";

import { getImagePath } from "@/lib/image";

interface Props {
  reporter: {
    reporterId: string | null;

    firstName: string;
    lastName: string;

    designation?: string | null;
    bloodGroup?: string | null;

    photo?: string | null;

    approvedAt?: Date | null;

    PressCard?: {
      cardNumber: string;
      expiryDate: Date;
    } | null;
  };
}

export default function ReporterIdCardFront({
  reporter,
}: Props) {

  const fullName =
    `${reporter.firstName} ${reporter.lastName}`;

  const issueDate =
    reporter.approvedAt
      ? new Date(reporter.approvedAt).toLocaleDateString()
      : "--";

  const expiryDate =
    reporter.PressCard?.expiryDate
      ? new Date(reporter.PressCard.expiryDate).toLocaleDateString()
      : "--";

  const qrValue =
    reporter.reporterId
      ? `${process.env.NEXT_PUBLIC_APP_URL}/verify/reporter/${reporter.reporterId}`
      : "#";

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

    <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
    <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl" />

    {/* HEADER */}

    <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">

      <div>

        <div className="text-[9px] uppercase tracking-[0.45em] text-cyan-200">
          Accredited Press
        </div>

        <h1 className="mt-1 text-3xl font-black tracking-widest">
          AGS NEWS
        </h1>

        <p className="text-[10px] uppercase tracking-[0.28em] text-blue-200">
          Official Press Identity Card
        </p>

      </div>

      <Image
        src="/logo.png"
        alt="AGS NEWS"
        width={56}
        height={56}
        className="rounded-full bg-white p-1"
      />

    </div>

    {/* BODY */}

    <div className="relative z-10 grid grid-cols-[110px_minmax(0,1fr)_90px] gap-4 px-6 py-4">

      {/* PHOTO */}

      <div className="flex flex-col items-center">

        <div className="overflow-hidden rounded-2xl border-2 border-white bg-white p-1 shadow-lg">

          <Image
 src={
  reporter.photo
    ? getImagePath(reporter.photo)
    : "/images/avatar.png"
}
            alt={fullName}
            width={96}
            height={120}
           className="h-[135px] w-[105px] rounded-xl object-cover object-top"
          />

        </div>

        <div className="mt-2 rounded-full bg-emerald-500 px-3 py-1 text-[9px] font-bold tracking-widest">
          VERIFIED
        </div>

      </div>

      {/* DETAILS */}

      <div>

      
        <h2 className="mt-1 text-xl font-black leading-tight">
          {fullName}
        </h2>

        <p className="mb-3 text-[11px] uppercase tracking-[0.20em] text-blue-200">
          {reporter.designation || "Reporter"}
        </p>

        <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">

          <div className="grid grid-cols-2 gap-x-3 gap-y-2">

            <InfoItem
              label="Reporter ID"
              value={reporter.reporterId ?? "--"}
            />

            <InfoItem
              label="Card No."
              value={reporter.PressCard?.cardNumber ?? "--"}
            />

            <InfoItem
              label="Blood Group"
              value={reporter.bloodGroup ?? "--"}
            />

            <InfoItem
              label="Issue"
              value={issueDate}
            />

            <InfoItem
              label="Expiry"
              value={expiryDate}
            />
                        <InfoItem
              label="Status"
              value="ACTIVE"
            />

          </div>

        </div>

      </div>

      {/* QR CODE */}

      <div className="flex flex-col items-center gap-3 pt-1">

 <div className="flex flex-col items-center gap-3 pt-1">

  <ReporterQRCode
    value={qrValue}
    size={64}
  />

  <p className="text-center text-[8px] font-semibold uppercase tracking-[0.15em] text-cyan-200">
    Scan to Verify
  </p>

  <ReporterHologram />

</div>

 


</div>

    </div>

    {/* FOOTER */}

    <div className="relative z-10 mt-auto border-t border-white/10 bg-[#0A2D66]/95 px-6 py-2">

    <div className="flex flex-col items-center gap-3 pt-1">

        <div className="flex flex-col items-center">

          <ReporterSignature />

          <span className="mt-1 text-[9px] uppercase tracking-widest text-blue-100">
            Authorized Signatory
          </span>

        </div>

        <div className="flex flex-col items-center">

          <ReporterSeal />

          <span className="mt-1 text-[9px] uppercase tracking-widest text-blue-100">
            Official Seal
          </span>

        </div>

      </div>

      <div className="mt-2 text-center text-[8px] tracking-[0.25em] text-blue-100">

        THIS CARD IS THE PROPERTY OF AGS NEWS • IF FOUND PLEASE RETURN TO THE ISSUING OFFICE

      </div>

    </div>

    </div>
);
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="min-w-0">

      <div className="text-[8px] uppercase tracking-[0.20em] text-cyan-200">
        {label}
      </div>

      <div
        className="truncate text-[11px] font-semibold text-white"
        title={value}
      >
        {value}
      </div>

    </div>
  );
}