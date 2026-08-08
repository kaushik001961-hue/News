"use client";

import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

interface Reporter {
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
}

interface PressCard {
  cardNumber: string;
  issueDate: string;
  expiryDate: string;
  active: boolean;
  qrCode?: string | null;
  reporter: Reporter;
}

interface Props {
  data: PressCard;
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
    <div
      id="press-card"
      className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-wide">
              AGS NEWS
            </h1>

            <p className="text-red-100 text-sm">
              OFFICIAL PRESS IDENTITY CARD
            </p>
          </div>

          <ShieldCheck className="h-10 w-10" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        <div className="flex gap-5">

          <div className="relative h-32 w-28 overflow-hidden rounded-xl border bg-gray-100">

            <Image
              src={reporter.photo || "/placeholder.jpg"}
              alt={fullName}
              fill
              sizes="112px"
              className="object-cover"
            />

          </div>

          <div className="flex-1">

            <h2 className="text-xl font-bold">
              {fullName}
            </h2>

            <p className="text-red-600 font-semibold">
              {reporter.designation || "Reporter"}
            </p>

            <div className="mt-4 space-y-1 text-sm">

              <p>
                <strong>ID :</strong>{" "}
                {reporter.reporterId}
              </p>

              <p>
                <strong>Card :</strong>{" "}
                {data.cardNumber}
              </p>

              {reporter.bloodGroup && (
                <p>
                  <strong>Blood :</strong>{" "}
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

            <p>
              {new Date(data.issueDate).toLocaleDateString()}
            </p>

          </div>

          <div>

            <div className="flex items-center gap-2 font-semibold">
              <CalendarDays size={16} />
              Expiry Date
            </div>

            <p>
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

          <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-white">

            {data.qrCode ? (
              <Image
                src={data.qrCode}
                alt="QR"
                width={88}
                height={88}
              />
            ) : (
              <BadgeCheck
                size={60}
                className="text-gray-300"
              />
            )}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="bg-slate-900 px-6 py-4 text-center text-xs text-white">

        This Press Card is the property of AGS NEWS.
      Misuse is punishable under law
       

      </div>
    </div>
  );
}