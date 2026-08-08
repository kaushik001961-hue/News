"use client";

import Barcode from "react-barcode";

interface Props {
  value?: string;
}

export default function ReporterBarcode({ value }: Props) {
  if (!value) return null;

  return (
    <Barcode
  value={value}
  width={0.65}
  height={14}
  margin={0}
  displayValue={false}
/>
  );
}