import CardContainer from "./components/CardContainer";
import GoldBorder from "./components/GoldBorder";
import PrintSafeArea from "./components/PrintSafeArea";
import Watermark from "./components/Watermark";

import ReporterDetails from "./components/ReporterDetails";
import ReporterQRCode from "./components/QRCode";
import Signature from "./components/Signature";

import { ReporterCardData } from "./types";

interface Props {
  reporter: ReporterCardData;
}

export default function ReporterIdCardBackV5({
  reporter,
}: Props) {
  return (
    <CardContainer>
      <Watermark />
      <GoldBorder />

      <PrintSafeArea>
      <div className="grid h-full grid-rows-[48px_1fr_90px_18px] gap-2">

          {/* Header */}
          <div className="rounded-md bg-gradient-to-r from-red-900 via-red-700 to-red-900 px-2 py-1 text-center text-white shadow">
            <h2 className="text-[13px] font-extrabold tracking-[2px]">
              AGS NEWS
            </h2>

            <p className="text-[7px] uppercase tracking-[3px]">
              REPORTER INFORMATION
            </p>
          </div>

          {/* Information */}
          <div className="rounded-lg border border-gray-200 bg-white px-2 py-2 shadow-sm">

            <ReporterDetails
              label="Blood Group"
              value={reporter.bloodGroup}
            />

            <ReporterDetails
              label="Date Of Birth"
              value={reporter.dob}
            />

            <ReporterDetails
              label="State"
              value={reporter.state}
            />

            {/* Terms */}
            <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 p-2">
              <h3 className="mb-1 text-[8px] font-bold uppercase text-red-700">
                Terms & Conditions
              </h3>

              <ul className="space-y-1 text-[6px] leading-tight text-gray-700">
                <li>• This card remains the property of AGS NEWS.</li>
                <li>• Carry this ID while on official duty.</li>
                <li>• Misuse of this ID will result in cancellation.</li>
                <li>• If found, return to AGS NEWS office.</li>
                <li>• Report loss immediately.</li>
              </ul>
            </div>

          </div>

       {/* Bottom */}
<div className="flex items-end justify-between border-t border-gray-300 pt-2">

  <Signature authority={reporter.authority} />

  <div className="flex flex-col items-center">
    <span className="mb-1 text-[6px] font-bold text-gray-600">
      Scan to Verify
    </span>

    <ReporterQRCode value={reporter.qrCode} />
  </div>

</div>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-1 text-center text-[6px] text-gray-600">
            Property of <span className="font-semibold">AGS NEWS</span>
          </div>

        </div>
      </PrintSafeArea>
    </CardContainer>
  );
}