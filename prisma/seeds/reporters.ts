import {
  PrismaClient,
  ReporterStatus,
} from "@prisma/client";

export default async function seedReporters(
  prisma: PrismaClient
) {
  console.log("👤 Seeding Reporters...");

  // Find the seeded reporter login user
  const reporterUser = await prisma.user.findUnique({
    where: {
      email: "reporter@news.com",
    },
  });

  if (!reporterUser) {
    throw new Error(
      "❌ reporter@news.com was not found. Run seedUsers before seedReporters."
    );
  }

  // Check whether this user already has a Reporter profile
  const existingReporter = await prisma.reporter.findUnique({
    where: {
      userId: reporterUser.id,
    },
  });

  if (existingReporter) {
    console.log(
      `✅ Reporter already exists: ${existingReporter.reporterId ?? existingReporter.applicationNo}`
    );

    return;
  }

  const reporter = await prisma.reporter.create({
    data: {
      userId: reporterUser.id,

      reporterId: "AGS-REP-2026-0001",
      applicationNo: "AGS-APP-2026-0001",

      firstName: "Demo",
      middleName: "News",
      lastName: "Reporter",

      email: "reporter@news.com",
      phone: "9999999999",
      whatsapp: "9999999999",

      address: "Demo Address",
      district: "Panchmahal",
      state: "Gujarat",
      pincode: "389001",

      qualification: "Bachelor's Degree",
      passingYear: 2024,

      designation: "Reporter",
      beat: "General News",
      coverageArea: "Panchmahal",

      hasCamera: false,
      hasLaptop: true,
      hasVehicle: false,
      drivingLicense: false,
      journalismDegree: true,

      currentOrganization: "AGS News",
      experience: 2,

      languages: "Gujarati, Hindi, English",
      languagesKnown: "Gujarati, Hindi, English",

      preferredLocation: "Panchmahal",

      availability: "FULL_TIME",

      nationality: "Indian",

      status: ReporterStatus.APPROVED,

      active: true,
      verified: true,

      termsAccepted: true,
      termsAcceptedAt: new Date(),

      remarks: "Demo reporter created by database seed.",
    },
  });

  console.log(
    `✅ Reporter seeded: ${reporter.reporterId}`
  );
}