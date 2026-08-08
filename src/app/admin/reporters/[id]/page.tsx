import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReporterProfile from "@/components/reporter-admin/ReporterProfile";

export default async function ReporterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const reporter = await prisma.reporter.findUnique({
    where: { id },
    include: {
      PressCard: true,

      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  console.log("========== REPORTER DETAILS ==========");
  console.log("Reporter ID from route:", id);
  console.log("Activities:", reporter?.activities);
  console.log("Activity Count:", reporter?.activities.length ?? 0);
  console.log("Reporter Found:", reporter ? "YES" : "NO");

  if (!reporter) {
    notFound();
  }

  const reporterData = {
    ...reporter,

    dob: reporter.dob?.toISOString() ?? null,
    createdAt: reporter.createdAt?.toISOString() ?? null,
    updatedAt: reporter.updatedAt?.toISOString() ?? null,

    approvedAt: reporter.approvedAt?.toISOString() ?? null,
    rejectedAt: reporter.rejectedAt?.toISOString() ?? null,
    blockedAt: (reporter as any).blockedAt
      ? new Date((reporter as any).blockedAt).toISOString()
      : null,

    activities: reporter.activities.map((activity) => ({
      ...activity,
      createdAt: activity.createdAt.toISOString(),
    })),
  };

  return <ReporterProfile reporter={reporterData as any} />;
}