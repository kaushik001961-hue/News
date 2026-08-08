"use client";

interface ReporterDetailsProps {
  reporter: {
    firstName?: string;
    lastName?: string;
    reporterId?: string;
    designation?: string;
    bloodGroup?: string;
    phone?: string;
    district?: string;
    state?: string;
    PressCard?: {
      cardNumber?: string;
      expiryDate?: string | Date;
    } | null;
  };
}

function Row({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/20 py-2 last:border-b-0">
      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-red-100">
        {label}
      </span>

      <span className="max-w-[55%] truncate text-right text-[10px] font-bold text-white">
        {value || "--"}
      </span>
    </div>
  );
}

export default function ReporterDetails({
  reporter,
}: ReporterDetailsProps) {
  return (
    <div className="relative z-20 flex flex-col">

      {/* Name */}
      <div className="text-center">

        <h2 className="text-lg font-black uppercase tracking-wide text-white">
          {`${reporter.firstName ?? ""} ${reporter.lastName ?? ""}`.trim()}
        </h2>

        <div className="mt-2 inline-flex rounded-full bg-white px-4 py-1 shadow">

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-700">
            {reporter.designation || "REPORTER"}
          </span>

        </div>

      </div>

      {/* Details */}
      <div className="mt-4 rounded-xl bg-white/10 p-3 backdrop-blur-md">

        <Row
          label="Reporter ID"
          value={reporter.reporterId}
        />

        <Row
          label="Card No"
          value={reporter.PressCard?.cardNumber}
        />

        <Row
          label="Blood"
          value={reporter.bloodGroup}
        />

        <Row
          label="Phone"
          value={reporter.phone}
        />

        <Row
          label="District"
          value={reporter.district}
        />

        <Row
          label="State"
          value={reporter.state}
        />

        <Row
          label="Valid Till"
          value={
            reporter.PressCard?.expiryDate
              ? new Date(
                  reporter.PressCard.expiryDate
                ).toLocaleDateString("en-GB")
              : "--"
          }
        />

      </div>

    </div>
  );
}