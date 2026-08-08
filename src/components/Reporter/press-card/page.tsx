import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import ReporterIdCardV5 from "@/components/Reporter/v5/ReporterIdCardV5";
import { ReporterCardData } from "@/components/Reporter/v5/types";

export default async function PressCardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const reporter = await prisma.reporter.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!reporter) {
    return notFound();
  }

  const reporterData: ReporterCardData = {
    id: reporter.id,
    reporterId: reporter.reporterId,
    cardNumber: reporter.cardNumber ?? `AGS-${reporter.reporterId}`,
    firstName: reporter.firstName,
    middleName: reporter.middleName ?? "",
    lastName: reporter.lastName,
    designation: reporter.designation ?? "Reporter",
    email: reporter.email,
    phone: reporter.phone,
    address: reporter.address,
    city: reporter.city,
    state: reporter.state,
    bloodGroup: reporter.bloodGroup ?? "",
    issueDate: reporter.issueDate ?? new Date(),
    expiryDate:
      reporter.expiryDate ??
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    photo: reporter.photo || "/images/default-avatar.png",
    qrCode: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${reporter.cardNumber}`,
    active: reporter.status === "APPROVED",
    companyName: "AGS NEWS",
    companyLogo: "/logo.png",
  };

  return (
    <main className="min-h-screen bg-slate-100 p-10 flex justify-center items-center">
      <ReporterIdCardV5 reporter={reporterData} />
    </main>
  );
}