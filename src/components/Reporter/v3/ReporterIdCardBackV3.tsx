"use client";

import { ReporterCardData } from "./ReporterIdCardV3";

import BackBackground from "./components/BackBackground";
import BackHeader from "./components/BackHeader";
import CardInfoGrid from "./components/CardInfoGrid";
import QRVerification from "./components/QRVerification";
import SecurityNotice from "./components/SecurityNotice";
import AuthoritySignature from "./components/AuthoritySignature";
import BackFooter from "./components/BackFooter";

import SecurityBorder from "./components/SecurityBorder";
import LaminationOverlay from "./components/LaminationOverlay";
import Watermark from "./components/Watermark";
import PrintSafeArea from "./components/PrintSafeArea";

interface Props {
  reporter: ReporterCardData;
  className?: string;
}

export default function ReporterIdCardBackV3({
  reporter,
  className = "",
}: Props) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white ${className}`}
    >
      {/* Background */}
      <BackBackground />

      {/* Security Layers */}
      <Watermark />
      <LaminationOverlay />
      <SecurityBorder />

      {/* Safe Print Area */}
      <PrintSafeArea>
        <div className="relative z-20 flex h-full flex-col">
          {/* Header */}
          <BackHeader />

          {/* Body */}
          <main className="flex flex-1 flex-col gap-3 px-4 py-3">
            {/* Reporter Information */}
            <CardInfoGrid reporter={reporter} />

            {/* QR Verification */}
            <QRVerification reporter={reporter} />

            {/* Security Instructions */}
            <SecurityNotice />

            {/* Signature */}
            <AuthoritySignature reporter={reporter} />
          </main>

          {/* Footer */}
          <BackFooter />
        </div>
      </PrintSafeArea>
    </div>
  );
}