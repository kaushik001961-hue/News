"use client";

import Barcode from "react-barcode";

interface Props {
  value: string;
}

export default function ReporterBarcode({
  value,
}: Props) {
  return (
    <div
      className="
      rounded-xl
      bg-white
      p-2
      shadow-lg
      "
    >
      <Barcode
        value={value}
        width={1.5}
        height={38}
        fontSize={12}
        margin={0}
        displayValue={false}
        background="#ffffff"
      />
    </div>
  );
}