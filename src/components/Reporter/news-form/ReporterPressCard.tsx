"use client";

import Image from "next/image";
import { BadgeCheck, CalendarDays, Phone, Mail, MapPin } from "lucide-react";

interface Props {
  data: {
    id: string;
    cardNumber: string;
    issueDate: string;
    expiryDate: string;
    active: boolean;
    qrCode: string | null;
    reporter: {
      reporterId: string;
      firstName: string;
      middleName?: string | null;
      lastName: string;
      designation?: string | null;
      district?: string | null;
      state?: string | null;
      bloodGroup?: string | null;
      phone: string;
      email: string;
      photo?: string | null;
    };
  };
}

export default function ReporterPressCard({ data }: Props) {
  const reporter = data.reporter;

  const fullName = [
    reporter.firstName,
    reporter.middleName,
    reporter.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">

      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-6 py-5 text-white">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide">
              AGS NEWS
            </h1>

            <p className="text-sm text-red-100">
              Official Press Identity Card
            </p>
          </div>

          <BadgeCheck className="h-10 w-10" />

        </div>

      </div>

      {/* Body */}
      <div className="p-6">

        <div className="flex gap-5">

          <div className="relative h-32 w-28 overflow-hidden rounded-xl border bg-slate-100">

            <Image
              src={reporter.photo || "/placeholder.jpg"}
              alt={fullName}
              fill
              sizes="112px"
              className="object-cover"
            />

          </div>

          <div className="flex-1">

            <h2 className="text-xl font-bold text-slate-900">
              {fullName}
            </h2>

            <p className="mt-1 text-red-600 font-semibold">
              {reporter.designation || "Reporter"}
            </p>

            <div className="mt-3 space-y-1 text-sm">

              <p>
                <span className="font-semibold">
                  Reporter ID:
                </span>{" "}
                {reporter.reporterId}
              </p>

              <p>
                <span className="font-semibold">
                  Card No:
                </span>{" "}
                {data.cardNumber}
              </p>

              {reporter.bloodGroup && (
                <p>
                  <span className="font-semibold">
                    Blood Group:
                  </span>{" "}
                  {reporter.bloodGroup}
                </p>
              )}

            </div>

          </div>

        </div>

        <div className="my-6 border-t" />

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-3">
            <Phone size={16} />
            {reporter.phone}
          </div>

          <div className="flex items-center gap-3">
            <Mail size={16} />
            {reporter.email}
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={16} />
            {[reporter.district, reporter.state]
              .filter(Boolean)
              .join(", ")}
          </div>

        </div>

        <div className="my-6 border-t" />

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>

            <div className="flex items-center gap-2 font-semibold">
              <CalendarDays size={16} />
              Issue Date
            </div>

            <p className="mt-1">
              {new Date(data.issueDate).toLocaleDateString()}
            </p>

          </div>

          <div>

            <div className="flex items-center gap-2 font-semibold">
              <CalendarDays size={16} />
              Expiry Date
            </div>

            <p className="mt-1">
              {new Date(data.expiryDate).toLocaleDateString()}
            </p>

          </div>

        </div>

        <div className="mt-6 flex items-center justify-between">

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              data.active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {data.active ? "ACTIVE" : "EXPIRED"}
          </span>

          <div className="h-24 w-24 rounded-lg border bg-white flex items-center justify-center">

            {data.qrCode ? (
              <Image
                src={data.qrCode}
                alt="QR Code"
                width={88}
                height={88}
              />
            ) : (
              <span className="text-xs text-slate-400 text-center px-2">
                QR Code
              </span>
            )}

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="bg-slate-900 px-6 py-4 text-center text-xs text-white">

        This card remains the property of AGS NEWS and must be
        produced on demand.

      </div>

    </div>
  );
}