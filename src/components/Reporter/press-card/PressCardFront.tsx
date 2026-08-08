"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import { PressCardData } from "./types";

interface Props {
  reporter: PressCardData;
}

export default function PressCardFront({
  reporter,
}: Props) {
  return (
    <div className="relative h-[540px] w-[860px] overflow-hidden rounded-[28px] bg-white shadow-2xl">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-red-50" />

      {/* Decorative Circle */}

      <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-red-600 opacity-10" />

      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-red-700 opacity-10" />

      {/* Header */}

      <div className="relative flex h-28 items-center justify-between bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-10">

        <div className="flex items-center gap-5">

          <Image
            src={reporter.companyLogo}
            alt="logo"
            width={70}
            height={70}
            className="rounded-full bg-white p-1"
          />

          <div>

            <h1 className="text-3xl font-extrabold tracking-wide text-white">
              {reporter.companyName}
            </h1>

            <p className="text-white/90">
              OFFICIAL PRESS IDENTITY CARD
            </p>

          </div>

        </div>

        <ShieldCheck
          className="text-yellow-300"
          size={52}
        />

      </div>

      {/* Gold Line */}

      <div className="h-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300" />

      {/* Body */}

      <div className="relative flex px-10 py-8">

        {/* Photo */}

        <div className="w-1/3">

          <div className="mx-auto h-56 w-52 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl">

            <Image
              src={reporter.photo}
              alt={reporter.firstName}
              width={300}
              height={400}
              className="h-full w-full object-cover"
            />

          </div>

          <div className="mt-6 text-center">

            <div
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold ${
                reporter.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <BadgeCheck size={18} />

              {reporter.active
                ? "ACTIVE"
                : "INACTIVE"}

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="flex-1 pl-10">

          <h2 className="text-4xl font-extrabold text-slate-900">

            {reporter.firstName}{" "}
            {reporter.middleName}{" "}
            {reporter.lastName}

          </h2>

          <p className="mt-2 text-xl font-semibold text-red-600">
            {reporter.designation}
          </p>

          <div className="mt-8 space-y-4 text-[16px]">

            <div className="flex">

              <span className="w-40 font-bold text-slate-700">
                Reporter ID
              </span>

              <span>{reporter.reporterId}</span>

            </div>

            <div className="flex">

              <span className="w-40 font-bold text-slate-700">
                Card Number
              </span>

              <span>{reporter.cardNumber}</span>

            </div>

            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-red-600"
              />

              {reporter.phone}

            </div>

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-red-600"
              />

              {reporter.email}

            </div>

            <div className="flex items-center gap-3">

              <MapPin
                size={18}
                className="text-red-600"
              />

              {reporter.address}

            </div>

          </div>

          {/* Dates */}

          <div className="mt-8 grid grid-cols-2 gap-5">

            <div className="rounded-2xl bg-slate-100 p-4">

              <div className="mb-2 flex items-center gap-2 font-semibold">

                <Calendar size={18} />

                Issue Date

              </div>

              <p>

                {new Date(
                  reporter.issueDate
                ).toLocaleDateString()}

              </p>

            </div>

            <div className="rounded-2xl bg-slate-100 p-4">

              <div className="mb-2 flex items-center gap-2 font-semibold">

                <Calendar size={18} />

                Expiry Date

              </div>

              <p>

                {new Date(
                  reporter.expiryDate
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-slate-900 px-10 py-5">

        <div>

          <p className="text-sm text-white">

            This card is property of {reporter.companyName}

          </p>

          <p className="text-xs text-slate-400">

            Unauthorized use is punishable by law.

          </p>

        </div>

        <div className="rounded-xl bg-white p-3">

          <QRCode
            value={reporter.qrCode}
            size={90}
          />

        </div>

      </div>

    </div>
  );
}