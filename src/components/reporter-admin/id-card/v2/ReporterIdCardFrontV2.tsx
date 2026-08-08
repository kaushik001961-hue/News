"use client";

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
import PrintSafeArea from "./components/PrintSafeArea";

interface ReporterIdCardFrontV2Props {
  reporter: any;
}

export default function ReporterIdCardFrontV2({
  reporter,
}: ReporterIdCardFrontV2Props) {
  return (
   <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl shadow-2xl">

      <CardBackground />

      <LaminationOverlay />

      <SecurityBorder />

      <PrintSafeArea>

        <div className="flex h-full flex-col">

          {/* Header */}
          <CardHeader reporter={reporter} />

          {/* Main Body */}
          <div className="mt-4 flex flex-1 gap-4">

            {/* Left */}
            <div className="flex w-[38%] flex-col items-center">

              <PhotoSection reporter={reporter} />

              <div className="mt-3">
                <ReporterBadge
                  designation={reporter.designation}
                />
              </div>

            </div>

            {/* Right */}
            <div className="flex flex-1 flex-col">

              <ReporterDetails
                reporter={reporter}
              />

              <div className="mt-3">
                <CardValidity
                  issueDate={reporter.issueDate}
                  expiryDate={reporter.expiryDate}
                />
              </div>

            </div>

          </div>

          {/* Bottom */}
          <div className="mt-4 grid grid-cols-2 gap-4">

            <ReporterBarcode
              value={reporter.reporterId}
            />

            <QRSection
              reporter={reporter}
            />

          </div>

          <div className="mt-4">
            <CardFooter reporter={reporter} />
          </div>

        </div>

      </PrintSafeArea>

    </div>
  );
}