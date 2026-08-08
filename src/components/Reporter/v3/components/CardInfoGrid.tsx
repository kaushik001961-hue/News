"use client";

import {
  User,
  Phone,
  MapPin,
  Droplets,
  CalendarDays,
  CreditCard,
  Briefcase,
  BadgeCheck,
} from "lucide-react";

import { ReporterCardData } from "../ReporterIdCardV3";

interface CardInfoGridProps {
  reporter: ReporterCardData;
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/90 p-2 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {label}
          </p>

          <p className="truncate text-[11px] font-bold text-gray-900">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CardInfoGrid({
  reporter,
}: CardInfoGridProps) {
  const fullName = [
    reporter.firstName,
    reporter.middleName,
    reporter.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="rounded-2xl border border-white/20 bg-white/80 p-3 shadow-lg backdrop-blur">
      {/* Heading */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-700">
            Reporter Information
          </h3>

          <p className="text-[9px] text-gray-500">
            Official Identification Details
          </p>
        </div>

        <BadgeCheck
          size={20}
          className="text-emerald-600"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        <InfoCard
          icon={<User size={14} />}
          label="Name"
          value={fullName}
        />

        <InfoCard
          icon={<Briefcase size={14} />}
          label="Designation"
          value={reporter.designation}
        />

        <InfoCard
          icon={<Phone size={14} />}
          label="Phone"
          value={reporter.phone}
        />

        <InfoCard
          icon={<Droplets size={14} />}
          label="Blood Group"
          value={reporter.bloodGroup}
        />

        <InfoCard
          icon={<MapPin size={14} />}
          label="District"
          value={reporter.district}
        />

        <InfoCard
          icon={<MapPin size={14} />}
          label="State"
          value={reporter.state}
        />

        <InfoCard
          icon={<CreditCard size={14} />}
          label="Reporter ID"
          value={reporter.reporterId}
        />

        <InfoCard
          icon={<CalendarDays size={14} />}
          label="Valid Till"
          value={reporter.expiryDate}
        />
      </div>

           {/* Footer Note */}
      <div className="mt-3 rounded-lg bg-gradient-to-r from-red-700 to-red-900 px-3 py-2 text-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-white">
          Property of AGS NEWS • Return if Found
        </p>
      </div>
    </section>
  );
}