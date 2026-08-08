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

  const reporterIdVal = String(reporter.reporterId ?? "");

  const reporterData: ReporterCardData = {
    id: reporter.id,
    reporterId: reporterIdVal,
    cardNumber: `AGS-${reporterIdVal}`,
    firstName: String(reporter.firstName ?? ""),
    middleName: String(reporter.middleName ?? ""),
    lastName: String(reporter.lastName ?? ""),
    designation: String(reporter.designation ?? "Reporter"),
    email: String(reporter.email ?? ""),
    phone: String(reporter.phone ?? ""),
    address: String(reporter.address ?? ""),
    city: String(reporter.city ?? ""),
    state: String(reporter.state ?? ""),
    bloodGroup: String(reporter.bloodGroup ?? ""),
    issueDate: reporter.issueDate ? new Date(reporter.issueDate) : new Date(),
    expiryDate: reporter.expiryDate
      ? new Date(reporter.expiryDate)
      : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    photo: String(reporter.photo || "/images/default-avatar.png"),
    qrCode: `${process.env.NEXT_PUBLIC_APP_URL}/verify/AGS-${reporterIdVal}`,
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