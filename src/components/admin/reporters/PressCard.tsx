"use client";

import Image from "next/image";
import QRCode from "react-qr-code";

interface Props {
  reporter: any;
}

export default function PressCard({
  reporter,
}: Props) {
  return (
    <div className="w-[420px] overflow-hidden rounded-3xl border bg-white shadow-2xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-red-700 to-red-900 p-6 text-center text-white">

        <Image
          src="/logo.png"
          alt="AGS News"
          width={70}
          height={70}
          className="mx-auto mb-3"
        />

        <h2 className="text-2xl font-bold">
          AGS NEWS
        </h2>

        <p className="text-sm opacity-90">
          PRESS IDENTITY CARD
        </p>

      </div>

      {/* Photo */}

      <div className="flex justify-center py-6">

        <Image
          src={reporter.photo || "/images/default-user.png"}
          alt={reporter.firstName}
          width={130}
          height={130}
          className="rounded-full border-4 border-red-600 object-cover"
        />

      </div>

      {/* Information */}

      <div className="space-y-4 px-8 pb-8">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            {reporter.firstName} {reporter.lastName}
          </h2>

          <p className="text-red-700 font-semibold">
            {reporter.designation}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-y-3 text-sm">

          <span className="font-semibold">
            Reporter ID
          </span>

          <span>
            {reporter.reporterId}
          </span>

          <span className="font-semibold">
            Beat
          </span>

          <span>
            {reporter.beat}
          </span>

          <span className="font-semibold">
            District
          </span>

          <span>
            {reporter.district}
          </span>

          <span className="font-semibold">
            Mobile
          </span>

          <span>
            {reporter.phone}
          </span>

        </div>

        <div className="flex justify-center pt-6">

          <QRCode
            value={`https://agsnews.com/verify/${reporter.reporterId}`}
            size={120}
          />

        </div>

      </div>

    </div>
  );
}