import Image from "next/image";
import { notFound } from "next/navigation";

import {
  ShieldCheck,
  ShieldX,
  Calendar,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    cardNumber: string;
  }>;
}

export default async function VerifyPage({
  params,
}: Props) {
  const { cardNumber } = await params;

  const reporter = await prisma.reporter.findFirst({
    where: {
      PressCard: {
        cardNumber,
      },
    },
    include: {
      PressCard: true,
    },
  });

  if (!reporter) {
    notFound();
  }

  const approved =
    reporter.status === "APPROVED";

  const expired =
    reporter.PressCard?.expiryDate
      ? new Date(reporter.PressCard.expiryDate) <
        new Date()
      : false;

  const valid = approved && !expired;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">

      {/* Hero */}

      <section className="border-b bg-gradient-to-r from-[#021B3D] via-[#0B4EA2] to-[#012B61] py-12 text-white">

        <div className="mx-auto max-w-5xl px-6">

          <div className="flex flex-col items-center text-center">

            <Image
              src="/logo.png"
              alt="AGS NEWS"
              width={90}
              height={90}
              className="rounded-full bg-white p-2 shadow-xl"
            />

            <h1 className="mt-6 text-4xl font-black tracking-[0.25em]">
              AGS NEWS
            </h1>

            <p className="mt-3 text-lg text-blue-100">
              Official Press Card Verification Portal
            </p>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">

                {/* Verification Banner */}

        <div
          className={`mb-10 rounded-3xl p-8 shadow-xl ${
            valid
              ? "border border-emerald-300 bg-emerald-50"
              : "border border-red-300 bg-red-50"
          }`}
        >

          <div className="flex flex-col items-center gap-5 md:flex-row">

            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full ${
                valid
                  ? "bg-emerald-600"
                  : "bg-red-600"
              }`}
            >
              {valid ? (
                <ShieldCheck
                  size={56}
                  className="text-white"
                />
              ) : (
                <ShieldX
                  size={56}
                  className="text-white"
                />
              )}
            </div>

            <div>

              <h2
                className={`text-3xl font-black ${
                  valid
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                {valid
                  ? "Verified Press Card"
                  : "Invalid / Expired Press Card"}
              </h2>

              <p className="mt-3 text-slate-700">
                {valid
                  ? "This credential has been officially issued by AGS NEWS and is currently valid."
                  : "This credential is not valid. It may have expired, been blocked, or revoked."}
              </p>

            </div>

          </div>

        </div>

        {/* Reporter Card */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">

          <div className="grid md:grid-cols-[300px_1fr]">

            {/* Left Panel */}

            <div className="bg-gradient-to-br from-[#021B3D] via-[#0B4EA2] to-[#012B61] p-8 text-white">

              <div className="mx-auto relative h-52 w-44 overflow-hidden rounded-3xl border-4 border-white shadow-xl">

                <Image
                  src={
                    reporter.photo ||
                    "/images/avatar-placeholder.png"
                  }
                  alt={reporter.firstName}
                  fill
                  className="object-cover"
                />

              </div>

              <h2 className="mt-6 text-center text-2xl font-black uppercase">

                {reporter.firstName}{" "}
                {reporter.lastName}

              </h2>

              <p className="mt-2 text-center text-blue-100">

                {reporter.designation ||
                  "Reporter"}

              </p>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">

                <div className="space-y-4 text-sm">

                  <div className="flex items-center gap-3">

                    <BadgeCheck
                      size={18}
                    />

                    <span>
                      {reporter.reporterId}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Phone size={18} />

                    <span>
                      {reporter.phone ||
                        "-"}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <Mail size={18} />

                    <span className="break-all">
                      {reporter.email ||
                        "-"}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <MapPin size={18} />

                    <span>

                      {reporter.district}
                      {reporter.state
                        ? `, ${reporter.state}`
                        : ""}

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Right Panel */}

            <div className="p-10">

              <h3 className="text-2xl font-black text-slate-900">

                Press Card Details

              </h3>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                                {/* Card Number */}

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <p className="text-sm font-semibold text-slate-500">
                    Press Card Number
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {reporter.PressCard?.cardNumber || "-"}
                  </p>

                </div>

                {/* Reporter ID */}

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <p className="text-sm font-semibold text-slate-500">
                    Reporter ID
                  </p>

                  <p className="mt-2 text-lg font-black text-slate-900">
                    {reporter.reporterId}
                  </p>

                </div>

                {/* Issue Date */}

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <div className="flex items-center gap-2">

                    <Calendar
                      size={18}
                      className="text-blue-600"
                    />

                    <p className="text-sm font-semibold text-slate-500">
                      Issue Date
                    </p>

                  </div>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {reporter.approvedAt
                      ? new Date(
                          reporter.approvedAt
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </p>

                </div>

                {/* Expiry Date */}

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <div className="flex items-center gap-2">

                    <Calendar
                      size={18}
                      className="text-red-600"
                    />

                    <p className="text-sm font-semibold text-slate-500">
                      Expiry Date
                    </p>

                  </div>

                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {reporter.PressCard?.expiryDate
                      ? new Date(
                          reporter.PressCard.expiryDate
                        ).toLocaleDateString("en-GB")
                      : "-"}
                  </p>

                </div>

                {/* Status */}

                <div className="rounded-2xl border bg-slate-50 p-5 md:col-span-2">

                  <p className="text-sm font-semibold text-slate-500">
                    Current Status
                  </p>

                  <div className="mt-3">

                    <span
                      className={`inline-flex rounded-full px-5 py-2 text-sm font-bold ${
                        valid
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {valid
                        ? "ACTIVE & VERIFIED"
                        : reporter.status}
                    </span>

                  </div>

                </div>

              </div>

              {/* Security Notice */}

              <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 p-6">

                <h4 className="text-lg font-bold text-blue-900">
                  Security Notice
                </h4>

                <p className="mt-3 leading-7 text-slate-700">
                  This page confirms whether the presented AGS NEWS Press Card
                  is authentic. If this credential is reported as invalid,
                  expired, revoked, or blocked, please contact AGS NEWS before
                  accepting it as an official media identification.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t bg-slate-900 py-8 text-center text-sm text-slate-300">

        <p className="font-semibold">
          © {new Date().getFullYear()} AGS NEWS
        </p>

        <p className="mt-2 text-slate-400">
          Official Press Card Verification Portal
        </p>

      </footer>

    </main>
  );
}

                