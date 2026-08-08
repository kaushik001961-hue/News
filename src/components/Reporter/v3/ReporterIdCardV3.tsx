"use client";

import ReporterIdCardFrontV3 from "./ReporterIdCardFrontV3";
import ReporterIdCardBackV3 from "./ReporterIdCardBackV3";

export interface ReporterCardData {
  reporterId: string;
  firstName: string;
  middleName?: string;
  lastName: string;

  designation: string;
  department?: string;

  email: string;
  phone: string;

  district: string;
  state: string;

  bloodGroup?: string;

  photo?: string;

  qrCode?: string;
  barcode?: string;

  issueDate: string;
  expiryDate: string;

  authority?: string;
}

interface Props {
  reporter: ReporterCardData;
  side?: "front" | "back" | "both";
  className?: string;
}

export default function ReporterIdCardV3({
  reporter,
  side = "both",
  className = "",
}: Props) {
  if (side === "front") {
    return (
      <ReporterIdCardFrontV3
        reporter={reporter}
        className={className}
      />
    );
  }

  if (side === "back") {
    return (
      <ReporterIdCardBackV3
        reporter={reporter}
        className={className}
      />
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-8 ${className}`}>
  <div className="w-[324px] h-[204px]">
    <ReporterIdCardFrontV3 reporter={reporter} />
  </div>

  <div className="w-[324px] h-[204px]">
    <ReporterIdCardBackV3 reporter={reporter} />
  </div>
</div>
  );
}