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
  // 4. Press card
  // --------------------------------------------------
  const pressCard = reporter.PressCard;

  // --------------------------------------------------
  // 5. Build card data
  // --------------------------------------------------
  const reporterData: ReporterCardData = {
    reporterId: reporterIdVal,

    cardNumber:
      pressCard?.cardNumber ??
      `AGS-${reporterIdVal}`,

    firstName: String(
      reporter.firstName ?? ""
    ),

    middleName: String(
      reporter.middleName ?? ""
    ),

    lastName: String(
      reporter.lastName ?? ""
    ),

    designation: String(
      pressCard?.designation ??
        reporter.designation ??
        "Reporter"
    ),

    email: String(
      reporter.email ?? ""
    ),

    phone: String(
      reporter.phone ?? ""
    ),

    address: String(
      reporter.address ?? ""
    ),

    city: String(
      reporter.district ??
        reporter.taluka ??
        reporter.village ??
        ""
    ),

    state: String(
      reporter.state ?? ""
    ),

    bloodGroup: String(
      reporter.bloodGroup ?? ""
    ),

    // ----------------------------------------------
    // PressCard dates
    // ----------------------------------------------
   issueDate: pressCard?.issueDate
  ? pressCard.issueDate.toISOString()
  : new Date().toISOString(),

expiryDate: pressCard?.expiryDate
  ? pressCard.expiryDate.toISOString()
  : new Date(
      new Date().setFullYear(
        new Date().getFullYear() + 1
      )
    ).toISOString(),

    // ----------------------------------------------
    // Photo
    // ----------------------------------------------
    photo: String(
      pressCard?.photoOverride ??
        reporter.photo ??
        "/images/default-avatar.png"
    ),

    // ----------------------------------------------
    // QR Code
    // ----------------------------------------------
    qrCode:
      pressCard?.qrCode ??
      `${process.env.NEXT_PUBLIC_APP_URL}/verify/AGS-${reporterIdVal}`,

    // ----------------------------------------------
    // Active status
    // ----------------------------------------------
    active:
      pressCard?.active ??
      reporter.status === "APPROVED",

    // ----------------------------------------------
    // Company
    // ----------------------------------------------
    companyName: "AGS NEWS",

    companyLogo: "/logo.png",
  };

  // --------------------------------------------------
  // 6. Render
  // --------------------------------------------------
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto flex max-w-6xl justify-center">
        <ReporterIdCardV5
          data={reporterData}
        />
      </div>
    </main>
  );
}