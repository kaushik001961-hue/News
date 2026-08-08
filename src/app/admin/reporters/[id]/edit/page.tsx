import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ReporterForm from "@/components/reporter-admin/form/ReporterForm";
import { updateReporter } from "@/actions/reporterActions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditReporterPage({ params }: Props) {
  const { id } = await params;

  const reporter = await prisma.reporter.findUnique({
    where: {
      id,
    },
  });

  if (!reporter) {
    notFound();
  }

  // Store reporter ID in a const so TypeScript narrows it as non-null inside server actions
  const reporterId = reporter.id;

  async function handleSubmit(data: any) {
    "use server";

    await updateReporter(reporterId, {
      ...data,
    });

    redirect(`/admin/reporters/${reporterId}`);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Edit Reporter</h1>

        <p className="mt-2 text-slate-600">
          Update reporter information and save changes.
        </p>
      </div>

      <ReporterForm
        initialData={{
          id: reporter.id,

          // Personal
          firstName: reporter.firstName ?? "",
          middleName: reporter.middleName ?? "",
          lastName: reporter.lastName ?? "",

          gender: reporter.gender ?? "",
          dob: reporter.dob
            ? reporter.dob.toISOString().split("T")[0]
            : "",

          bloodGroup: reporter.bloodGroup ?? "",
          maritalStatus: reporter.maritalStatus ?? "",
          nationality: reporter.nationality ?? "Indian",

          // Contact
          email: reporter.email ?? "",
          phone: reporter.phone ?? "",
          alternatePhone: reporter.alternatePhone ?? "",
          whatsapp: reporter.whatsapp ?? "",

          // Address
          address: reporter.address ?? "",
          village: reporter.village ?? "",
          taluka: reporter.taluka ?? "",
          district: reporter.district ?? "",
          state: reporter.state ?? "",
          pincode: reporter.pincode ?? "",

          // Education
          qualification: reporter.qualification ?? "",
          journalismDegree: reporter.journalismDegree ?? false,
          college: reporter.college ?? "",
          university: reporter.university ?? "",
          passingYear: reporter.passingYear?.toString() ?? "",
          languages: reporter.languages ?? "",

          // Journalism
          designation: reporter.designation ?? "",
          experience: reporter.experience?.toString() ?? "",
          currentOrganization: reporter.currentOrganization ?? "",
          previousOrganization: reporter.previousOrganization ?? "",
          beat: reporter.beat ?? "",
          coverageArea: reporter.coverageArea ?? "",

          // Equipment
          hasCamera: reporter.hasCamera ?? false,
          hasLaptop: reporter.hasLaptop ?? false,
          hasVehicle: reporter.hasVehicle ?? false,
          drivingLicense: reporter.drivingLicense ?? false,

          // Social
          facebook: reporter.facebook ?? "",
          instagram: reporter.instagram ?? "",
          twitter: reporter.twitter ?? "",
          linkedin: reporter.linkedin ?? "",
          youtube: reporter.youtube ?? "",
          website: reporter.website ?? "",

          // Documents
          photo: reporter.photo ?? "",
          aadhaar: (reporter as any).aadhaar ?? (reporter as any).aadhaarCard ?? "",
          pan: (reporter as any).pan ?? (reporter as any).panCard ?? "",
          resume: reporter.resume ?? "",
          pressCard: reporter.pressCard ?? "",

          // Emergency
          emergencyName: reporter.emergencyName ?? "",
          emergencyRelation: reporter.emergencyRelation ?? "",
          emergencyPhone: reporter.emergencyPhone ?? "",

          remarks: reporter.remarks ?? "",
        }}
        onSubmit={handleSubmit}
      />
    </section>
  );
}