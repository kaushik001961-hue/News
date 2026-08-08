"use client";

import {
  CalendarDays,
  Clock3,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

import { ReporterCardData } from "../ReporterIdCardV3";

interface CardValidityProps {
  reporter: ReporterCardData;
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 shadow-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>

        <p className="truncate text-[11px] font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function CardValidity({
  reporter,
}: CardValidityProps) {
  return (
    <section className="rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50 to-white p-3 shadow-lg">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BadgeCheck
            size={18}
            className="text-emerald-600"
          />

          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-700">
            Card Validity
          </span>
        </div>

        <span className="rounded-full bg-emerald-600 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-white">
          VALID
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        <InfoItem
          icon={<CreditCard size={16} />}
          label="Reporter ID"
          value={reporter.reporterId}
        />

        <InfoItem
          icon={<CalendarDays size={16} />}
          label="Issue Date"
          value={reporter.issueDate}
        />

        <InfoItem
          icon={<Clock3 size={16} />}
          label="Expiry Date"
          value={reporter.expiryDate}
        />

        <InfoItem
          icon={<BadgeCheck size={16} />}
          label="Status"
          value="AUTHORIZED"
        />
      </div>

      {/* Bottom Strip */}
      <div className="mt-3 rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-red-800 px-3 py-2 text-center">
        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white">
          Valid Only With Official AGS NEWS Authorization
        </p>
      </div>
    </section>
  );
}