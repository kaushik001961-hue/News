"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

import ReporterActions from "./ReporterActions";
import ReporterStatusBadge from "./ReporterStatusBadge";

import type { Reporter } from "./types";

interface ReporterTableRowProps {
  reporter: Reporter;

  onApprove: () => void;
  onReject: () => void;
  onSuspend: () => void;
  onDelete: () => void;
}

export default function ReporterTableRow({
  reporter,
  onApprove,
  onReject,
  onSuspend,
  onDelete,
}: ReporterTableRowProps) {
  const imageSrc =
    reporter.photo &&
    reporter.photo.trim() !== ""
      ? reporter.photo.startsWith(
          "http://"
        ) ||
        reporter.photo.startsWith(
          "https://"
        ) ||
        reporter.photo.startsWith("/")
        ? reporter.photo
        : `/${reporter.photo}`
      : null;

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* =====================================================
          REPORTER
      ===================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          {/* PHOTO */}

          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-200">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${reporter.firstName} ${reporter.lastName}`}
                fill
                sizes="56px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-600 text-lg font-semibold text-white">
                {reporter.firstName
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* DETAILS */}

          <div className="min-w-0">
            <Link
              href={`/admin/reporters/${reporter.id}`}
              className="font-semibold text-slate-900 transition hover:text-emerald-600"
            >
              {reporter.firstName}{" "}
              {reporter.lastName}
            </Link>

            <p className="text-sm text-slate-500">
              {reporter.reporterId ??
                reporter.applicationNo}
            </p>

            {reporter.designation && (
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Briefcase size={12} />

                <span>
                  {reporter.designation}
                </span>
              </div>
            )}
          </div>
        </div>
      </td>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <td className="px-6 py-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Mail
              size={14}
              className="shrink-0"
            />

            <span className="break-all">
              {reporter.email}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Phone
              size={14}
              className="shrink-0"
            />

            <span>
              {reporter.phone}
            </span>
          </div>
        </div>
      </td>

      {/* =====================================================
          LOCATION
      ===================================================== */}

      <td className="px-6 py-5">
        <div className="flex items-start gap-2">
          <MapPin
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="font-medium text-slate-800">
              {reporter.district ?? "-"}
            </p>

            <p className="text-sm text-slate-500">
              {reporter.state ?? "-"}
            </p>

            {reporter.beat && (
              <p className="mt-1 text-xs text-emerald-600">
                {reporter.beat}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      <td className="px-6 py-5">
        <span className="font-medium text-slate-800">
          {reporter.experience ?? 0} Years
        </span>
      </td>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <td className="px-6 py-5">
        <ReporterStatusBadge
          status={reporter.status}
        />
      </td>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <td className="px-6 py-5 text-right">
        <ReporterActions
          reporterId={reporter.id}
          status={reporter.status}
          onApprove={onApprove}
          onReject={onReject}
          onSuspend={onSuspend}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}