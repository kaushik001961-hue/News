"use client";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building2,
} from "lucide-react";

import { ReporterCardData } from "../ReporterIdCardV3";

interface ReporterDetailsProps {
  reporter: ReporterCardData;
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-2 rounded-lg bg-white/80 px-2.5 py-2 shadow-sm backdrop-blur-sm">
      <div className="mt-0.5 text-red-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>

        <p className="truncate text-[12px] font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ReporterDetails({
  reporter,
}: ReporterDetailsProps) {
  const fullName = [
    reporter.firstName,
    reporter.middleName,
    reporter.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex h-full flex-col">
      {/* Name */}
      <div className="rounded-xl bg-gradient-to-r from-red-700 to-red-900 p-3 text-white shadow-lg">
        <p className="text-[10px] uppercase tracking-[0.25em] text-red-100">
          Reporter
        </p>

        <h2 className="mt-1 text-lg font-extrabold leading-tight">
          {fullName}
        </h2>

        <p className="mt-1 text-sm font-medium text-yellow-200">
          {reporter.designation}
        </p>

        {reporter.department && (
          <p className="text-[10px] uppercase tracking-wider text-red-100">
            {reporter.department}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="mt-3 flex flex-1 flex-col gap-2">
        <DetailRow
          icon={<Briefcase size={15} />}
          label="Designation"
          value={reporter.designation}
        />

        {reporter.department && (
          <DetailRow
            icon={<Building2 size={15} />}
            label="Department"
            value={reporter.department}
          />
        )}

        <DetailRow
          icon={<Phone size={15} />}
          label="Phone"
          value={reporter.phone}
        />

        <DetailRow
          icon={<Mail size={15} />}
          label="Email"
          value={reporter.email}
        />

        <DetailRow
          icon={<MapPin size={15} />}
          label="Location"
          value={`${reporter.district}, ${reporter.state}`}
        />
      </div>
    </div>
  );
}