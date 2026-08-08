"use client";

import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function ReporterBarcode({
  value,
}: Props) {
  return (
    <div className="rounded-lg bg-white p-2">
      <Barcode
        value={value}
        width={1.4}
        height={38}
        fontSize={12}
        displayValue={false}
        background="#ffffff"
      />
    </div>
  );
}