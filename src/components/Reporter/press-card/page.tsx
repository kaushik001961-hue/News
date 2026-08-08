import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import ReporterIdCardV5 from "@/components/Reporter/v5/ReporterIdCardV5";
import type { ReporterCardData } from "@/components/Reporter/v5/types";

export default async function PressCardPage() {
  // --------------------------------------------------
  // 1. Authentication
  // --------------------------------------------------
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  // --------------------------------------------------
  // 2. Get reporter + PressCard
  // --------------------------------------------------
  const reporter = await prisma.reporter.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      PressCard: true,
    },
  });

  if (!reporter) {
    return notFound();
  }

  // --------------------------------------------------
  // 3. Reporter ID
  // --------------------------------------------------
  const reporterIdVal = String(
    reporter.reporterId ?? ""
  );

  // --------------------------------------------------
  // 4. Press Card
  // --------------------------------------------------
  const pressCard = reporter.PressCard;

  // --------------------------------------------------
  // 5. Build card data
  // --------------------------------------------------
  const reporterData: ReporterCardData = {
    reporterId: reporterIdVal,

    firstName: String(
      reporter.firstName ?? ""
    ),

    middleName:
      reporter.middleName ?? undefined,

    lastName: String(
      reporter.lastName ?? ""
    ),

    designation:
      pressCard?.designation ??
      reporter.designation ??
      "Reporter",

    phone: String(
      reporter.phone ?? ""
    ),

    email: String(
      reporter.email ?? ""
    ),

    district: String(
      reporter.district ?? ""
    ),

    state: String(
      reporter.state ?? ""
    ),

    bloodGroup: reporter.bloodGroup
      ? String(reporter.bloodGroup)
      : undefined,

    dob: reporter.dob
      ? reporter.dob.toISOString()
      : undefined,

    beat:
      reporter.beat ?? undefined,

    coverageArea:
      reporter.coverageArea ?? undefined,

    qualification:
      reporter.qualification ?? undefined,

    experience:
      reporter.experience ?? null,

    emergencyName:
      reporter.emergencyName ?? undefined,

    emergencyPhone:
      reporter.emergencyPhone ?? undefined,

    hasBike: Boolean((reporter as any).hasBike ?? false),
    hasCar: Boolean((reporter as any).hasCar ?? false),

    photo:
      pressCard?.photoOverride ??
      reporter.photo ??
      "/images/default-avatar.png",

    qrCode:
      pressCard?.qrCode ??
      `${process.env.NEXT_PUBLIC_APP_URL}/verify/AGS-${reporterIdVal}`,

    issueDate:
      pressCard?.issueDate
        ? pressCard.issueDate.toISOString()
        : new Date().toISOString(),

    expiryDate:
      pressCard?.expiryDate
        ? pressCard.expiryDate.toISOString()
        : new Date(
            new Date().setFullYear(
              new Date().getFullYear() + 1
            )
          ).toISOString(),

    authority:
      pressCard?.issuedBy ??
      "AGS NEWS",
  };

  // --------------------------------------------------
  // 6. Render
  // --------------------------------------------------
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto flex max-w-6xl justify-center">
        <ReporterIdCardV5
          reporter={reporterData}
        />
      </div>
    </main>
  );
}