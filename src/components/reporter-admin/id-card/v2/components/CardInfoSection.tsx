"use client";

import type { ReporterCardData } from "../ReporterIdCardV2";

import {
  User,
  Briefcase,
  Phone,
  Droplets,
  MapPin,
  CalendarDays,
} from "lucide-react";

interface Props {
  reporter: ReporterCardData;
}

function formatDate(date?: Date | string | null) {
  if (!date) return "--";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
      <div className="mb-1 flex items-center gap-1.5">
        <Icon
          size={11}
          className="text-yellow-300"
        />
        <span className="text-[8px] font-semibold uppercase tracking-wider text-red-100">
          {label}
        </span>
      </div>

      <p className="truncate text-[10px] font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default function CardInfoSection({
  reporter,
}: Props) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">

      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-white">
        Reporter Information
      </h3>

      <div className="grid grid-cols-2 gap-2">

        <InfoItem
          icon={User}
          label="Name"
          value={`${reporter.firstName} ${reporter.lastName}`}
        />

        <InfoItem
          icon={Briefcase}
          label="Designation"
          value={reporter.designation || "Reporter"}
        />

        <InfoItem
          icon={Phone}
          label="Phone"
          value={reporter.phone || "--"}
        />

        <InfoItem
          icon={Droplets}
          label="Blood"
          value={reporter.bloodGroup || "--"}
        />

        <InfoItem
          icon={MapPin}
          label="District"
          value={reporter.district || "--"}
        />

        <InfoItem
          icon={MapPin}
          label="State"
          value={reporter.state || "--"}
        />

        <InfoItem
          icon={CalendarDays}
          label="Issued"
          value={formatDate(reporter.approvedAt)}
        />

        <InfoItem
          icon={CalendarDays}
          label="Expiry"
          value={formatDate(
            reporter.PressCard?.expiryDate
          )}
        />

      </div>

    </div>
  );
}