"use client";

import QRCode from "react-qr-code";

interface Props {
  value: string;
  size?: number;
}

export default function ReporterQRCode({
  value,
  size = 72,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-xl">

      <QRCode
        value={value}
        size={size}
        level="H"
        bgColor="#FFFFFF"
        fgColor="#021B3D"
      />

      <div className="mt-2 text-center">

        <div className="text-[8px] font-bold tracking-[0.18em] text-slate-700">
          AGS NEWS
        </div>

        <div className="text-[7px] uppercase tracking-[0.15em] text-slate-500">
          Official Verification
        </div>

      </div>

    </div>
  );
}