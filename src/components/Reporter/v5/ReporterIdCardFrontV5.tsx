import CardContainer from "./components/CardContainer";
import PrintSafeArea from "./components/PrintSafeArea";
import GoldBorder from "./components/GoldBorder";
import Watermark from "./components/Watermark";
import ReporterPhoto from "./components/ReporterPhoto";
import ReporterDetails from "./components/ReporterDetails";
import ReporterBarcode from "./components/Barcode";
import ReporterQRCode from "./components/QRCode";
import Hologram from "./components/Hologram";

import { ReporterCardData } from "./types";

interface Props {
  reporter: ReporterCardData;
}

export default function ReporterIdCardFrontV5({
  reporter,
}: Props) {
  return (
    <CardContainer>
      {/* Background Elements */}
      <Watermark />
      <GoldBorder />

      <PrintSafeArea>
        <div className="grid h-full grid-rows-[46px_88px_34px_1fr_52px_22px] gap-1">

          {/* Header */}
          <div className="rounded-md bg-gradient-to-r from-red-900 via-red-700 to-red-900 py-2 text-center text-white shadow">
            <h2 className="text-[13px] font-extrabold tracking-[2px]">
              AGS NEWS
            </h2>

            <p className="text-[7px] uppercase tracking-[3px]">
              PRESS IDENTITY CARD
            </p>
          </div>

          {/* Photo */}
          <div className="flex items-center justify-center pt-2">
            <ReporterPhoto photo={reporter.photo} />
          </div>

          {/* Name */}
          <div className="text-center">
            <h3 className="text-[11px] font-extrabold uppercase leading-tight text-black pt-2">
              {reporter.firstName} {reporter.lastName}
            </h3>

            <p className="text-[8px] font-semibold uppercase text-red-700">
              {reporter.designation}
            </p>
          </div>

          {/* Details */}
          <div className="rounded-lg border border-black-200 bg-white/90 px-2 py-1 shadow-sm">
            <ReporterDetails
              label="Reporter ID"
              value={reporter.reporterId}
            />

            <ReporterDetails
              label="Phone"
              value={reporter.phone}
            />

             <ReporterDetails
  label="Email"
  value={reporter.email || "--"}
/>

            <ReporterDetails
              label="State"
              value={reporter.state}
            />
          </div>

          {/* Barcode + QR */}
<div className="border-t pt-1">

  <div className="flex items-start justify-between">

    {/* Left : Barcode */}
    <div className="flex-1">
      <ReporterBarcode value={reporter.barcode} />
    </div>

    {/* Right : QR */}
    <div className="ml-2">
      <ReporterQRCode value={reporter.qrCode} />
    </div>

  </div>

  {/* Center Hologram */}
  <div className="mt-0 flex justify-center">
    <Hologram />
  </div>

</div>

          {/* Footer */}
          <div className="flex items-end justify-between border-t pt-1 text-[7px]">
            <div>
              <div className="font-bold text-black">
                VALID UP TO
              </div>

              <div className="font-medium text-black">
  {reporter.expiryDate || "--"}
</div>
            </div>

            <div className="rounded-full bg-emerald-600 px-3 py-1 text-[7px] font-bold text-white shadow">
              ✓ VERIFIED
            </div>
          </div>

        </div>
      </PrintSafeArea>
    </CardContainer>
  );
}