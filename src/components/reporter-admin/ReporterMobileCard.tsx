"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CalendarDays,
  Eye,
} from "lucide-react";

import ReporterStatusBadge from "./ReporterStatusBadge";
import ReporterActions from "./ReporterActions";
import type { Reporter } from "./types";

interface Props {
  reporter: Reporter;
  onApprove: () => void;
  onReject: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function ReporterMobileCard({
  reporter,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}: Props) {
  const imageSrc =
    reporter.photo && reporter.photo.trim() !== ""
      ? reporter.photo.startsWith("http://") ||
        reporter.photo.startsWith("https://") ||
        reporter.photo.startsWith("/")
        ? reporter.photo
        : `/${reporter.photo}`
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-200">

            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${reporter.firstName} ${reporter.lastName}`}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-600 text-xl font-bold text-white">
                {reporter.firstName.charAt(0).toUpperCase()}
              </div>
            )}

          </div>

          <div>

            <Link
              href={`/admin/reporters/${reporter.id}`}
              className="font-semibold hover:text-emerald-600"
            >
              {reporter.firstName} {reporter.lastName}
            </Link>

            <p className="text-sm text-slate-500">
              {reporter.reporterId ?? reporter.applicationNo}
            </p>

            <div className="mt-2">
              <ReporterStatusBadge status={reporter.status} />
            </div>

          </div>

        </div>

        <ReporterActions
          reporterId={reporter.id}
          status={reporter.status}
          onApprove={onApprove}
          onReject={onReject}
          onSuspend={onSuspend}
          onDelete={onDelete}
        />

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm">
          <Mail size={15} />
          {reporter.email}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone size={15} />
          {reporter.phone}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin size={15} />
          {reporter.district ?? "-"}, {reporter.state ?? "-"}
        </div>

        {reporter.designation && (
          <div className="flex items-center gap-2 text-sm">
            <Briefcase size={15} />
            {reporter.designation}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays size={15} />
          {reporter.experience ?? 0} Years
        </div>

      </div>

      <div className="mt-6">

        <Link
          href={`/admin/reporters/${reporter.id}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2 text-white"
        >
          <Eye size={16} />
          View Profile
        </Link>

      </div>

    </div>
  );
}