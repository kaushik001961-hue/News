"use client";

import { ReporterCardData } from "./ReporterIdCardV3";

import CardBackground from "./components/CardBackground";
import CardHeader from "./components/CardHeader";
import PhotoSection from "./components/PhotoSection";
import ReporterDetails from "./components/ReporterDetails";
import ReporterBadge from "./components/ReporterBadge";
import CardValidity from "./components/CardValidity";
import ReporterBarcode from "./components/ReporterBarcode";
import QRSection from "./components/QRSection";
import CardFooter from "./components/CardFooter";
import SecurityBorder from "./components/SecurityBorder";
import LaminationOverlay from "./components/LaminationOverlay";
import Watermark from "./components/Watermark";
import PrintSafeArea from "./components/PrintSafeArea";

interface Props {
  reporter: ReporterCardData;
  className?: string;
}

export default function ReporterIdCardFrontV3({
  reporter,
  className = "",
}: Props) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white ${className}`}
    >
      {/* Background */}
      <CardBackground />

      {/* Security Layers */}
      <Watermark />
      <LaminationOverlay />
      <SecurityBorder />

      {/* Safe Area */}
      <PrintSafeArea>
        <div className="relative z-20 flex h-full flex-col">
          {/* Header */}
          <CardHeader />

          {/* Main Content */}
          <main className="flex flex-1 flex-col gap-3 px-4 py-3">
            {/* Photo + Details */}
            <section className="grid grid-cols-[110px_1fr] gap-3">
              <PhotoSection reporter={reporter} />

              <div className="flex flex-col gap-3">
                <ReporterDetails reporter={reporter} />
                <ReporterBadge reporter={reporter} />
              </div>
            </section>

            {/* Validity */}
            <CardValidity reporter={reporter} />

            {/* Barcode + QR */}
            <section className="grid grid-cols-[1fr_92px] items-center gap-3">
              <ReporterBarcode reporter={reporter} />
              <QRSection reporter={reporter} />
            </section>
          </main>

          {/* Footer */}
          <CardFooter />
        </div>
      </PrintSafeArea>
    </div>
  );
}