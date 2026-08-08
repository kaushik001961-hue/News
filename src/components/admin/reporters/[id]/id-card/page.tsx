import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ReporterIdCardV2 from "@/components/reporter-admin/id-card/v2/ReporterIdCardV2";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReporterIdCardPage({
  params,
}: Props) {
  const { id } = await params;

  const reporter = await prisma.reporter.findUnique({
    where: {
      id,
    },
    include: {
      PressCard: true,
      ReporterDocument: true,
    },
  });

  if (!reporter) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-10">

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>

            <div className="mb-2 inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
              AGS NEWS
            </div>

            <h1 className="text-4xl font-black text-slate-900">
              Official Reporter Press Card
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Preview, print and download the official AGS NEWS
              Reporter Press Identity Card. This card includes
              QR verification, security watermark, hologram,
              digital signature and professional PVC-card layout.
            </p>

          </div>

        </div>

        {/* Press Card */}

        <ReporterIdCardV2 reporter={reporter as any} />

      </div>

    </main>
  );
}