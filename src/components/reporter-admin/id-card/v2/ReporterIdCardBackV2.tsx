"use client";

import type { ReporterCardData } from "./ReporterIdCardV2";

import BackBackground from "./components/BackBackground";
import BackHeader from "./components/BackHeader";
import CardInfoSection from "./components/CardInfoSection";
import QRVerificationSection from "./components/QRVerificationSection";
import TermsSection from "./components/TermsSection";
import AuthoritySignature from "./components/AuthoritySignature";
import BackFooter from "./components/BackFooter";

import LaminationOverlay from "./components/LaminationOverlay";
import SecurityBorder from "./components/SecurityBorder";
import PrintSafeArea from "./components/PrintSafeArea";

interface Props {
  reporter: ReporterCardData;
}

export default function ReporterIdCardBackV2({
  reporter,
}: Props) {
  return (
   <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-2xl">

      <BackBackground />

      <LaminationOverlay />

      <SecurityBorder />

      <PrintSafeArea>

        <div className="flex h-full flex-col">

          {/* Header */}

          <BackHeader reporter={reporter} />

          {/* Information */}

          <div className="mt-2 px-3">

            <CardInfoSection reporter={reporter} />

          </div>

          {/* QR */}

          <div className="mt-2 px-3">

            <QRVerificationSection reporter={reporter} />

          </div>

          {/* Terms */}

          <div className="mt-2 px-3">

            <TermsSection />

          </div>

          {/* Signature */}

          <div className="mt-2 px-3">

            <AuthoritySignature />

          </div>

          {/* Footer */}

          <div className="mt-auto">

            <BackFooter />

          </div>

        </div>

      </PrintSafeArea>

    </div>
  );
}