import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  ExternalLink,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatDate(date: Date | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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

export default async function AdvertisementDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const advertisement =
    await prisma.advertisement.findUnique({
      where: {
        id,
      },
    });

  if (!advertisement) {
    notFound();
  }

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

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <Link
            href="/editor/advertisements"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to Advertisements
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            {advertisement.title}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Advertisement details and performance.
          </p>

        </div>

        <Link
          href={`/editor/advertisements/${id}/edit`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit Advertisement
        </Link>

      </div>

      {/* Preview */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Advertisement Preview
          </h2>

          <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

            {advertisement.image ? (
              <img
                src={advertisement.image}
                alt={advertisement.title}
                className="max-h-[420px] w-full object-contain"
              />
            ) : advertisement.htmlCode ? (
              <div
                className="p-6"
                dangerouslySetInnerHTML={{
                  __html:
                    advertisement.htmlCode,
                }}
              />
            ) : (
              <div className="flex h-64 items-center justify-center text-slate-400">
                No preview available
              </div>
            )}

          </div>

        </div>

        {/* Performance */}

        <div className="space-y-6">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Impressions
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {advertisement.impressions.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              Clicks
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {advertisement.clicks.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              CTR
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {ctr}%
            </p>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Advertisement Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Slug
            </p>

            <p className="mt-1 text-sm text-slate-700">
              /{advertisement.slug}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Position
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {getPositionLabel(
                advertisement.position
              )}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Device
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {advertisement.device}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Priority
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {advertisement.priority}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Start Date
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {formatDate(
                advertisement.startDate
              )}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              End Date
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {formatDate(
                advertisement.endDate
              )}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">
              Status
            </p>

            <p className="mt-1 text-sm font-semibold">
              {advertisement.active
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {advertisement.targetUrl && (
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">
                Target URL
              </p>

              <a
                href={advertisement.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                Open Target
                <ExternalLink size={14} />
              </a>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}