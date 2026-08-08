"use client";

import QRCode from "react-qr-code";

interface Props {
  value?: string;
}

export default function ReporterQRCode({
  value,
}: Props) {
  if (!value) return null;

  return (
    <div className="rounded bg-white p-1 shadow">
      <QRCode
        value={value}
        size={34}
      />
    </div>
  );
}