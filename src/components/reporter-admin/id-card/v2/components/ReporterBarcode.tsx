"use client";

import Barcode from "react-barcode";

interface ReporterBarcodeProps {
  value: string;
}

export default function ReporterBarcode({
  value,
}: ReporterBarcodeProps) {
  if (!value) return null;

  return (
    <div className="flex flex-col items-center rounded-xl border border-white/15 bg-white px-3 py-3 shadow-sm">

      <Barcode
        value={value}
        format="CODE128"
        width={1.3}
        height={38}
        margin={0}
        displayValue={false}
        background="#ffffff"
        lineColor="#000000"
      />

      <p className="mt-2 font-mono text-[10px] font-semibold tracking-[2px] text-slate-700">
        {value}
      </p>

    </div>
  );
}