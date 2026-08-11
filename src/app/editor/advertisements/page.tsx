import Link from "next/link";
import { prisma } from "@/lib/prisma";

import {
  Plus,
  Pencil,
  Eye,
  BarChart3,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getCTR(
  clicks: number,
  impressions: number
) {
  if (!impressions) return "0.00";

  return (
    (clicks / impressions) *
    100
  ).toFixed(2);
}

function getPositionLabel(
  position: string
) {
  return position
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function getDeviceLabel(
  device: string
) {
  return (
    device.charAt(0) +
    device.slice(1).toLowerCase()
  );
}

function isCurrentlyRunning(ad: {
  active: boolean;
  startDate: Date | null;
  endDate: Date | null;
}) {
  if (!ad.active) return false;

  const now = new Date();

  if (
    ad.startDate &&
    ad.startDate > now
  ) {
    return false;
  }

  if (
    ad.endDate &&
    ad.endDate < now
  ) {
    return false;
  }

  return true;
}

export default async function AdvertisementsPage() {
  const advertisements =
    await prisma.advertisement.findMany({
      orderBy: [
        {
          priority: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

  return (
    <div className="space-y-6 p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Advertisements
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage portal advertisements,
            campaigns, placements and
            performance.
          </p>
        </div>

        <Link
          href="/editor/advertisements/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={18} />
          New Advertisement
        </Link>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Advertisements
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {advertisements.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Active Now
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {
              advertisements.filter(
                (ad) =>
                  isCurrentlyRunning(ad)
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Impressions
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {advertisements
              .reduce(
                (sum, ad) =>
                  sum + ad.impressions,
                0
              )
              .toLocaleString("en-IN")}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Clicks
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {advertisements
              .reduce(
                (sum, ad) =>
                  sum + ad.clicks,
                0
              )
              .toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* =====================================================
          ADVERTISEMENT TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Advertisement
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Position
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Device
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Schedule
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Impressions
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Clicks
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  CTR
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {advertisements.length === 0 ? (

                <tr>

                  <td
                    colSpan={9}
                    className="px-5 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <BarChart3
                        size={40}
                        className="text-slate-300"
                      />

                      <h3 className="mt-3 font-semibold text-slate-800">
                        No advertisements yet
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Create your first
                        advertisement campaign.
                      </p>

                      <Link
                        href="/editor/advertisements/create"
                        className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                      >
                        Create Advertisement
                      </Link>

                    </div>

                  </td>

                </tr>

              ) : (

                advertisements.map((ad) => {

                  const running =
                    isCurrentlyRunning(ad);

                  return (

                    <tr
                      key={ad.id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Advertisement */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="h-14 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">

                            {ad.image ? (

                              <img
                                src={ad.image}
                                alt={ad.title}
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                                HTML
                              </div>

                            )}

                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {ad.title}
                            </p>

                            <p className="text-xs text-slate-500">
                              /{ad.slug}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Position */}

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                          {getPositionLabel(
                            ad.position
                          )}
                        </span>

                      </td>

                      {/* Device */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-700">
                          {getDeviceLabel(
                            ad.device
                          )}
                        </span>

                      </td>

                      {/* Schedule */}

                      <td className="px-5 py-4">

                        <div className="text-sm text-slate-700">
                          {formatDate(
                            ad.startDate
                          )}
                        </div>

                        <div className="text-xs text-slate-400">
                          to{" "}
                          {formatDate(
                            ad.endDate
                          )}
                        </div>

                      </td>

                      {/* Impressions */}

                      <td className="px-5 py-4 text-right">

                        <span className="font-medium text-slate-700">
                          {ad.impressions.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </td>

                      {/* Clicks */}

                      <td className="px-5 py-4 text-right">

                        <span className="font-medium text-slate-700">
                          {ad.clicks.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </td>

                      {/* CTR */}

                      <td className="px-5 py-4 text-right">

                        <span className="font-semibold text-blue-600">
                          {getCTR(
                            ad.clicks,
                            ad.impressions
                          )}
                          %
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4 text-center">

                        {running ? (

                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">

                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            Active

                          </span>

                        ) : ad.active ? (

                          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Scheduled / Expired
                          </span>

                        ) : (

                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            Inactive
                          </span>

                        )}

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-end gap-2">

                          <Link
                            href={`/editor/advertisements/${ad.id}`}
                            title="View"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          >
                            <Eye size={16} />
                          </Link>

                          <Link
                            href={`/editor/advertisements/${ad.id}/edit`}
                            title="Edit"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                          </Link>

                          {ad.targetUrl && (
                            <a
                              href={ad.targetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Open target"
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}

                        </div>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}