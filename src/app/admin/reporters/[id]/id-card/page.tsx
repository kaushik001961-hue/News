import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ReporterIdCardV5 from "@/components/Reporter/v5/ReporterIdCardV5";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReporterIdCardPage({ params }: Props) {
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

  const reporterId = reporter.reporterId ?? "";

  const reporterData = {
    reporterId: reporterId,

    firstName: reporter.firstName,
    middleName: reporter.middleName ?? "",
    lastName: reporter.lastName,

    designation: reporter.designation || "Reporter",

    phone: reporter.phone,
    email: reporter.email,

    district: reporter.district ?? "",
    state: reporter.state ?? "",

    bloodGroup: reporter.bloodGroup ?? "",
    dob: reporter.dob
      ? reporter.dob.toLocaleDateString("en-GB")
      : "",

    beat: reporter.beat ?? "",
    coverageArea: reporter.coverageArea ?? "",

    qualification: reporter.qualification ?? "",
    experience: reporter.experience ?? "",

    emergencyName: reporter.emergencyName ?? "",
    emergencyPhone: reporter.emergencyPhone ?? "",

    photo: reporter.photo ?? "",

    barcode: reporterId,

    qrCode:
      reporter.PressCard?.qrCode ??
      `https://agsnews.in/verify/${reporterId}`,

    issueDate: reporter.PressCard?.issueDate
      ? reporter.PressCard.issueDate.toLocaleDateString("en-GB")
      : "",

    expiryDate: reporter.PressCard?.expiryDate
      ? reporter.PressCard.expiryDate.toLocaleDateString("en-GB")
      : "",

    authority: "Editor-in-Chief",
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reporter Identity Card</h1>

          <p className="mt-2 text-slate-500">
            Print and download the official AGS NEWS Reporter ID Card.
          </p>
        </div>

        <ReporterIdCardV5 reporter={reporterData as any} />
      </div>
    </main>
  );
}