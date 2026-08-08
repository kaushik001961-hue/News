"use client";

import { QRCodeSVG } from "qrcode.react";

interface Props {
  value: string;
}

export default function ReporterQRCode({
  value,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-2 shadow">

      <QRCodeSVG
        value={value}
        size={90}
        bgColor="#ffffff"
        fgColor="#0f172a"
        level="H"
        includeMargin
      />

    </div>
  );
}