"use client";

import Barcode from "react-barcode";
import { ReporterCardData } from "../ReporterIdCardV3";

interface ReporterBarcodeProps {
  reporter: ReporterCardData;
}

export default function ReporterBarcode({
  reporter,
}: ReporterBarcodeProps) {
  const value = reporter.reporterId || "AGS-000000";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-3 shadow-md">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-600">
          Barcode
        </h3>

        <span className="rounded-full bg-red-700 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-white">
          ID
        </span>
      </div>

      {/* Barcode */}
      <div className="flex justify-center overflow-hidden rounded-lg bg-white py-2">
        <Barcode
          value={value}
          format="CODE128"
          width={1.2}
          height={42}
          margin={0}
          displayValue={false}
          background="transparent"
          lineColor="#111827"
        />
      </div>

      {/* Human-readable ID */}
      <div className="mt-2 text-center">
        <p className="font-mono text-[11px] font-bold tracking-[0.18em] text-gray-800">
          {value}
        </p>

        <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-gray-500">
          Scan for Internal Verification
        </p>
      </div>
    </section>
  );
}