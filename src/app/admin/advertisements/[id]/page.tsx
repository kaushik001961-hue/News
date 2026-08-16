import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  ExternalLink,
  Megaphone,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function getStatus(
  active: boolean,
  startDate: Date | null,
  endDate: Date | null
) {
  const now = new Date();

  if (!active) {
    return {
      label: "Inactive",
      className:
        "bg-slate-100 text-slate-700",
    };
  }

  if (
    startDate &&
    startDate > now
  ) {
    return {
      label: "Scheduled",
      className:
        "bg-yellow-100 text-yellow-700",
    };
  }

  if (
    endDate &&
    endDate < now
  ) {
    return {
      label: "Expired",
      className:
        "bg-red-100 text-red-700",
    };
  }

  return {
    label: "Active",
    className:
      "bg-green-100 text-green-700",
  };
}

function formatDate(
  date: Date | null
) {
  if (!date) {
    return "No limit";
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
}

export default async function AdvertisementDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const advertisement =
    await prisma.advertisement.findUnique({
      where: {
        id,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

  if (!advertisement) {
    notFound();
  }

  const status = getStatus(
    advertisement.active,
    advertisement.startDate,
    advertisement.endDate
  );

  const ctr =
    advertisement.impressions > 0
      ? (
          (advertisement.clicks /
            advertisement.impressions) *
          100
        ).toFixed(2)
      : "0.00";

  return (
    <div className="space-y-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <Link
            href="/admin/advertisements"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />

            Back to Advertisements
          </Link>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Megaphone
                size={22}
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                {advertisement.title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Advertisement details
              </p>

            </div>

          </div>

        </div>

        <Link
          href={`/admin/advertisements/${advertisement.id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Edit size={18} />

          Edit Advertisement
        </Link>

      </div>

      {/* =================================================
          STATUS
      ================================================= */}

      <div className="grid gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Status
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${status.className}`}
          >
            {status.label}
          </span>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Impressions
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {advertisement.impressions.toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Clicks
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {advertisement.clicks.toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            CTR
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {ctr}%
          </p>

        </div>

      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* ===============================================
            PREVIEW
        =============================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="text-lg font-semibold text-slate-900">
            Advertisement Preview
          </h2>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

            {advertisement.htmlCode ? (
              <div
                className="w-full overflow-auto p-4"
                dangerouslySetInnerHTML={{
                  __html:
                    advertisement.htmlCode,
                }}
              />
            ) : advertisement.image ? (
              <div className="p-4">

                <img
                  src={
                    advertisement.image
                  }
                  alt={
                    advertisement.title
                  }
                  className="mx-auto max-h-[400px] w-full object-contain"
                />

              </div>
            ) : (
              <div className="flex min-h-48 items-center justify-center text-slate-400">
                No advertisement preview available.
              </div>
            )}

          </div>

        </div>

        {/* ===============================================
            INFORMATION
        =============================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Advertisement Information
          </h2>

          <div className="mt-5 space-y-5">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Title
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {advertisement.title}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Slug
              </p>

              <p className="mt-1 break-all text-sm text-slate-700">
                {advertisement.slug}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Position
              </p>

              <span className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {advertisement.position.replaceAll(
                  "_",
                  " "
                )}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Device
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {advertisement.device}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Priority
              </p>

              <p className="mt-1 font-medium text-slate-900">
                {advertisement.priority}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Start Date
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {formatDate(
                  advertisement.startDate
                )}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                End Date
              </p>

              <p className="mt-1 text-sm text-slate-700">
                {formatDate(
                  advertisement.endDate
                )}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          CREATOR + TARGET
      ================================================= */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* Creator */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Created By
          </h2>

          {advertisement.createdBy ? (
            <div className="mt-4">

              <p className="font-semibold text-slate-900">
                {advertisement.createdBy.name ||
                  "Unknown"}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {advertisement.createdBy.email}
              </p>

            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Legacy advertisement — creator not recorded.
            </p>
          )}

        </div>

        {/* Target */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Target URL
          </h2>

          {advertisement.targetUrl ? (
            <a
              href={
                advertisement.targetUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 break-all text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {advertisement.targetUrl}

              <ExternalLink
                size={15}
              />
            </a>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              No target URL configured.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}